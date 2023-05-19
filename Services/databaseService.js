const mongoose = require('mongoose')

const connectDb = ()=>{
    // mongoose.set('strictQuery', true);
    return mongoose.connect( process.env.MONGO_URI,{
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true

    }).then(()=>console.log('Database is connected '))
    .catch((error)=>console.log(error,'Database is not connected '+error))
}

module.exports = connectDb