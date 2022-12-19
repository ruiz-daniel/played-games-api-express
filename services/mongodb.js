const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const { MongoClient } = require("mongodb");
const connectionString = `mongodb+srv://drgweiss:2B0108KmF@drgcluster.bdc0wxe.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let dbConnection

const connectToServer = function (callback) {
  client.connect(function (err, db) {
    if (err || !db) {
      return callback(err)
    }

    dbConnection = db.db('sample_airbnb')
    console.log('Successfully connected to MongoDB.')

    return callback()
  })
}

const getDb = function () {
  return dbConnection
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = { connectDB, connectToServer, getDb }
