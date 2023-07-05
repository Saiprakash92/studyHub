import mongoose from "mongoose";
const { Schema } = mongoose
const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], trim: true },
    ClassCode: { type: String, required: true },
    Role: { type: String, default: 'Student' },
    AddedTeacherId: { type: Schema.Types.ObjectId, ref: 'TeacherData' }
})
const StudentData = mongoose.model('Studentdata', schema)
export default StudentData;