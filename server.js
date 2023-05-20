const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
//Database
const DB = require('./Services/databaseService')

// Router functionality
const authRouter = require('./Controller/controller')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/user',authRouter)


app.get('/',(req,res)=>{
    res.send('<h2>SUPER TASK- OTP-GENERATOR</h2>')
})
const port = process.env.PORT || 8686
const start = async()=>{

    try {
        await DB()
       await app.listen(port,()=>{
            console.log(`Server is listening on PORT : ${port}`)
        })
    } catch (error) {
        console.log('Something went wrong');
    }
}

start()