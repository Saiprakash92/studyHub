import StudentData from "../model/StudentData.js";
import jwt from 'jsonwebtoken';
import TeacherData from "../model/TeacherUser.js";
import bcrypt from 'bcryptjs';

export const createUserStudent = async (req, res) => {
    try {
        const dataDuplicate = await StudentData.findOne({ email: req.body.email })
        if (dataDuplicate) {
            return res.status(422).json({
                message: "user already exists",
                status: false
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            email: req.body.email,

        }
        const addUserAfterCheck = await StudentData.create(user)
        res.status(200).json({
            data: addUserAfterCheck,
            status: true,
            message: "Sucessfully created"
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message
        })
    }
}

export const findProfiledataStudent = (req, res) => {
    StudentData.find({ AddedTeacherId: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                status: false,
                message: "not found"
            })
        }
        else {
            res.status(200).json({
                message: "data found",
                status: true,
                data: data
            });
        }
    })
}

//find by id of student
export const findbyidofStudent = async (req, res) => {
    try {
        const result = await StudentData.findById(req.params.id)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(422).json({
            error: 'not done '
        })
    }
}

//Login
export const LoginUserStudent = async (req, res) => {
    try {
        const { email, ClassCode } = req.body;
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!ClassCode) {
            return res.status(400).json({ message: "classcode is required" });
        }

        const user = await StudentData.findOne({ email: email , ClassCode:ClassCode });

        if (user ) {
            const token = jwt.sign({ id: user._id }, 'keyforNodereactProject')
              res.status(200).json({
                status: true,
                token: token,
                message: "successfull",
                data: user
            })
            if (req.cookies[`${user._id}`]) {
                req.cookies[`${user._id}`] = "";
            }
            await res.cookie(String(user._id), token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 30), // 30 seconds
                httpOnly: true,
                sameSite: "lax",
            });
        }

        else {
            return res.status(422).json({
                message: "Invalid Credentials",
                status: false,
            });
        }
    } catch (error) {
        return res.send(error)
    }

}
//Relational data pass
export const MergeidStudnenttoTeacher = async (req, res) => {
    try {
        let TeacherId = await TeacherData.findById(req.params.id)
        let StdData = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, ClassCode: req.body.ClassCode, AddedTeacherId: TeacherId._id, }
        let newStudentData = await StudentData.create(StdData)
        return res.status(200).json({
            message: "Successfully merged student",
            data: newStudentData,
            status: true
        });
    }
    catch (error) {
        return res.status(422).json({
            message: "not merged ",
            status: false
        });
    }

}
//edit Profile student
// UpdateStudentProfile

export const UpdateStudentProfile = async (req, res) => {
    try {
        const option = { new: true }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            email: req.body.email,

        }
        const userdata = await StudentData.findByIdAndUpdate(req.body.id, user, option)
        if (!userdata) {
            return res.status(500).json({
                message: "failed updating",
                status: false
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: option
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
        })
    }

}

//delete student 
export const DeleteStudentdata = (req, res) => {
    StudentData.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(422).json({
                message: "data deleted for student",
                status: false
            })
        }
        res.status(200).json({
            message: "deleting data failed ",
            status: true,
            data: data
        })
    })
}

