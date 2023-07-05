import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './Routes/users.route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import Files from './model/FileUpload.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(cors());
app.use(cookieParser())
app.use('/files', express.static('files'))
app.use(bodyParser.json())
app.use('/', UserRoute)
app.use(express.urlencoded({ limit: '50mb', extended: true }))



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Further code execution
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const filestorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './files')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const upload = multer({ storage: filestorage })
app.post('/single/:id', upload.single('files'), (req, res) => {
    // const url = `${req.protocol}://${req.get('host')}`;
    // console.log(url)
    try {
        const newNote = new Files({
            title: req.body.title,
            name: req.file.path,
            path: req.file.destination,
            subjectid: req.params.id,
            path: 'http://localhost:5000/' + req.file.path,
            announcements: req.body.announcements

        })
        newNote.save()
        res.send('single file uploaded' + newNote)
    } catch (error) {
        res.send(error)

    }


})


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 5000 !');
});
