const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer()

const express = require('express')
var router = express.Router()

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

router.post('/:userid', upload.single('image'), uploadFilesStream)

function uploadFiles(req, res) {
  cloudinary.uploader
    .upload(req.file.path, {
      public_id: `${req.params.userid}/${req.file.filename}`,
    })
    .then((response) => {
      res.send('Successfully uploaded files to', response.secure_url)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Error uploading file')
    })
}

function uploadFilesStream(req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          public_id: `${req.params.userid}/${req.file.originalname}`,
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

module.exports = router
