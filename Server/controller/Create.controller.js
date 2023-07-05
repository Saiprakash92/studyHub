import TeacherData from "../model/TeacherUser.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const dataDuplicate = await TeacherData.findOne({ email: req.body.email })
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
        const addUserAfterCheck = await TeacherData.create(user)
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

//login 



export const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }

        const user = await TeacherData.findOne({ email: email });
        const isPasswordCorrect =  await bcrypt.compare(password, user.password);

        if (user && isPasswordCorrect) {
            const token = jwt.sign({ id: user._id }, 'keyforNodereactProject')
             await res.status(200).json({
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


};

//verifyToken
export const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log(cookies);
    const token = cookies.split("=")[1];
    if (!token) {
        res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), 'keyforNodereactProject', (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid TOken" });
        }
        console.log(user.id);
        req.id = user.id;
    });
    next()
};

//getUser
export const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await TeacherData.findById(userId, "-password");
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(404).json({ messsage: "User Not FOund" });
    }
    return res.status(200).json({ user });
};

//refreshToken
export const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), 'keyforNodereactProject', (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({ id: user.id }, 'keyforNodereactProject')

        console.log("Regenerated Token\n", token);

        res.cookie(String(user.id), token, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = user.id;
        next();
    });
};


//find
export const findAllTeachers = async (req, res) => {
    TeacherData.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                message: "UnSucessfully ",
                status: false
            })
        }
        else {
            res.status(200).json({
                message: "SuccessFully created",
                status: true,
                data: data
            })
        }
    })
}
//edit Profile
export const UpdateTeacherProfiledata = async (req, res) => {
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
        const userdata = await TeacherData.findByIdAndUpdate(req.body.id, user, option)
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


//delete teacher 
export const DeleteTacherdata = (req, res) => {
    TeacherData.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(422).json({
                message: "data deleted for teacher",
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

