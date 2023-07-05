import mongoose from "mongoose";
const ImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subjectid: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    announcements: {
        type: String,
        optional: 'okay',
        required: true
    },
    Date: { type: String, default: Date() }

})

const Files = mongoose.model('files', ImageSchema)
export default Files;