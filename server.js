const express = require("express");
const cors = require('cors');

const tracker = require("./routes/tracker")
const user = require("./routes/user")
const PORT = 8000;
const notFound = require('./middleware/notFound')
require('dotenv').config();
const connectDB = require('./db/connect')

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    console.log("welcome");
    return res.status(200).send("<h1>Welcome to the 30 days porn-free challenge tracker</h1>");
});

app.use(express.json());
app.use('/api/v1/', tracker);
app.use('/api/v1/user', user);
app.use(notFound)


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`sever is listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();

