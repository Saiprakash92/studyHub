import express from "express";
import jwt from 'jsonwebtoken'
import { createUser, DeleteTacherdata, findAllTeachers, getUser, LoginUser,  refreshToken,  UpdateTeacherProfiledata, verifyToken } from "../controller/Create.controller.js";
import { Deletefile } from "../controller/FilesController.js";
import { createUserStudent, DeleteStudentdata, findbyidofStudent, findProfiledataStudent, LoginUserStudent, MergeidStudnenttoTeacher, UpdateStudentProfile } from "../controller/StudentControllerCreate.js";
import { createSubject, DeleteSubject, findAllfiles, findAllSubjects, findAllSubjectsbyid, MergeidSubjectTeacher } from "../controller/SubjectController.js";
const router = express.Router()

//TeacherLogin
router.post('/api/register', createUser)
router.post('/api/login', LoginUser)
router.get('/api/user', verifyToken,getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);

//Student Login
router.post('/api/studentlogin', LoginUserStudent)
router.get('/api/findspecifilestudent/:id', findProfiledataStudent)// not used//
router.get('/student/:id',findbyidofStudent)

// edit student 
router.post('/api/editStd/', UpdateStudentProfile)
//find Teacherby id
router.get('/api/findteacher/:id', findAllTeachers)
router.post('/api/registerStudent', createUserStudent)
router.post('/api/createclass', createSubject)
//find Subjectby id

// edit teacher
router.post('/api/editTeacher/',UpdateTeacherProfiledata)
//delete teacher
router.delete('/api/deleteteacher/:id',DeleteTacherdata)

router.get('/api/Findcreateclass/:id', findAllSubjects)


router.get('/api/findidofsubject/:id', findAllSubjectsbyid)
router.delete('/api/deleteSubject/:id', DeleteSubject)


//create class and merge
router.post('/api/merge/:id', MergeidSubjectTeacher)

// router.post('/api/uploadfile',fileUploaddata)

//merge student in teacher
router.post('/api/Stdmerge/:id', MergeidStudnenttoTeacher)
//delete student
router.delete('/api/deletestudent/:id',DeleteStudentdata)

router.get('/files/:id', findAllfiles)

//files delete
router.delete('/files/delete/:id',Deletefile)



function isAuthorized(req, res, next) {
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(" ");
        if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];
            var Token = credentials
            console.log(Token)

            var decoded = jwt.verify(Token, 'keyforNodereactProject');
            // console.log(decoded, 'decoded');
            if (decoded && decoded.id) {
                req.user = decoded;
                console.log(req.user)
                next()
            } else {
                return res.json(401, { err: "Invalid token" });
            }
        } else {
            return res.json(200, { err: "Format is Authorization: Bearer [token]" });
        }
    } else {
        return res.status(401).json({
            status: false,
            message: 'Authorization token is required'
        })
    }
}




export default router;