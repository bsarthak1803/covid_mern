const express = require('express');
const connectDB = require('./config/db');
const fetch = require('node-fetch');
const cors = require('cors');

//connect to mongodb
connectDB();

const app = express();

//init middleware/ body parser
app.use(express.json({ extended : false }));

app.use(cors());
//request to get data from API to localhost:5000/
app.get('/', async (req,res) => {
    try{
    const api_url = "https://api.covid19india.org/raw_data21.json";
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json()
    // console.log(json);
    res.send(json);
    }
    catch(err){
        console.error(err.msg);
    }
});

// //setup the end points/routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
});
