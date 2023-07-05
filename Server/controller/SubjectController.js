import multer from "multer"
import Subject from "../model/Subject.js"
import TeacherData from "../model/TeacherUser.js"
import files from "../model/FileUpload.js"


export const createSubject = async (req, res) => {

    try {
        const dataDuplicate = await Subject.findOne({ SubjectName: req.body.SubjectName })
        if (dataDuplicate) {
            res.status(422).json({
                status: false,
                message: "Subject already exists"
            })
        }
        const addUserAfterCheck = await Subject.create(req.body)
        return res.status(201).json({
            data: addUserAfterCheck,
            status: true,
            message: "Sucessfully created"
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: error
        })
    }



}
//find all subjects
export const findAllSubjects = (req, res) => {
    Subject.find({ TeacherId: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                message: "Subjects",
                status: false,

            })
        }
        else {
            res.status(200).json({
                message: "succesfully collected data",
                status: true,
                data: data

            })
        }
    })
}
//find By id
export const findAllSubjectsbyid = (req, res) => {
    Subject.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(422).json({
                message: "subject not found",
                status: false,

            })
        }
        else {
            res.status(200).json({
                message: "succesfully collected data",
                status: true,
                data: data

            })
        }
    })
}

//delete Subject
export const DeleteSubject = (req, res) => {
    Subject.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(422).json({
                message: "data not find",
                status: false
            })
        }
        res.status(200).json({
            message: "Data Deleted",
            status: true,
            data: data
        })
    })
}


//Relational data pass
// export const MergeidSubjectTeacher = async (req, res) => {
//     let TeacherId = await TeacherData.findOne({ _id: req.params.id })
//     try {
//         console.log(TeacherId)
//         let SubjectData = {
//             SubjectName: req.body.SubjectName,
//             Description: req.body.Description,
//             TeachearName: req.body.TeachearName,
//             TeacherId: TeacherId._id,
//         }
//         let newSubjData = await Subject.create(SubjectData)
//         res.status(200).json({
//             message: "Successfully merged",
//             data: newSubjData,
//             status: true
//         });
//     }
//     catch (error) {
//         console.log(error)
//         res.status(422).json({
//             message: error,
//             status: false
//         });
//     }

// }

export const MergeidSubjectTeacher = async (req, res) => {
    try {
        let teacherData = await TeacherData.findOne({ _id: req.params.id });
        const dataDuplicate = await Subject.findOne({ SubjectName: req.body.SubjectName })

        if (dataDuplicate) {
            return res.status(422).json({
                status: false,
                message: "Subject already exists"
            })
        }
        let userData = {
            SubjectName: req.body.SubjectName,
            Description: req.body.Description,
            TeachearName: req.body.TeachearName,
            TeacherId: teacherData._id,
        }
        let newData = await Subject.create(userData)
        return res.status(200).json({
            message: "Success merged",
            data: newData,
            status: true
        });
    } catch (error) {
        return res.status(422).json({
            message: error,
            status: false
        });
    }
}


//find all files
export const findAllfiles = (req, res) => {
    files.find({ subjectid: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                message: "Subjects",
                status: false,

            })
        }
        else {
            res.status(200).json({
                message: "succesfully collected data",
                status: true,
                data: data

            })
        }
    })
}