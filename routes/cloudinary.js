const multer = require('multer')
var authenticate = require('../authenticateMiddleware')
const upload = multer()
const express = require('express')
let router = express.Router()

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

router.post(
  '/:userid',
  authenticate.authenticateToken,
  upload.single('image'),
  uploadFilesStream,
)

function uploadFilesStream(req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          public_id: `${req.params.userid}/${removeFileExtension(
            req.file.originalname
          )}`,
        },
        (error, result) => {
          if (result) {
            resolve(result)
          } else {
            console.log(error)
            reject(error)
          }
        },
      )
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }

  async function upload(req) {
    let result = await streamUpload(req)
    result.secure_url
      ? res.status(201).send(result.secure_url)
      : res.status(400).send('Error Uploading image')
  }

  upload(req)
}

function removeFileExtension(fileName) {
  const index = fileName.indexOf('.')
  return fileName.substring(0, index)
}

module.exports = router

// Unused alternate code

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })

// function uploadFiles(req, res) {
//   cloudinary.uploader
//     .upload(req.file.path, {
//       public_id: `${req.params.userid}/${req.file.filename}`,
//     })
//     .then((response) => {
//       res.send('Successfully uploaded files to', response.secure_url)
//     })
//     .catch((error) => {
//       console.log(error)
//       res.status(500).send('Error uploading file')
//     })
// }
