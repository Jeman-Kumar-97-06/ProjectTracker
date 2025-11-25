require('dotenv').config()
const cors      = require('cors');
const express   = require('express');
const mongoose  = require('mongoose');
const app       = express();
const path      = require('path');

const uRts      = require('./routes/users');

app.use(express.json());
app.use(cors());

app.use('/api/users',uRts);

//What to do in production:
if (process.env.NODE_ENV=='production'){
    const clientPath = path.join(__dirname,'../frontend/dist');
    app.use(express.static(clientPath));
    app.get('/',(req,res)=>{
        res.sendFile(path.join(clientPath,'index.html'));
    })
}

//Connect to mongoose database server and listen at a PORT:
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT || 4000,()=>{console.log("Connected to db and listening at ",process.env.PORT)})
}).catch(error=>{console.log(error)})