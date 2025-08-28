const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DBCONNECT)
        console.log("MongDb Atlas Connected Successfully")
    }
    catch (e) {
        console.log("MongoDb Connection Failed", e.message)
    }
}

module.exports=connectDb
