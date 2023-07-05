import Files from "../model/FileUpload.js"

//delte files
export const Deletefile = (req, res) => {
    Files.findByIdAndDelete(req.params.id, (err, data) => {
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
