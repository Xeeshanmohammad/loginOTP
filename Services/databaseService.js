const mongoose = require('mongoose')

const connectDb = ()=>{
    // mongoose.set('strictQuery', true);
    return mongoose.connect( "mongodb+srv://Zeeshan:sardar.68221@nodejs-projects.a80ff.mongodb.net/otp?retryWrites=true&w=majority",{
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true

    }).then(()=>console.log('Database is connected '))
    .catch((error)=>console.log(error,'Database is not connected '+error))
}

module.exports = connectDb