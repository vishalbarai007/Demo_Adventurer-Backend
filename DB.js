
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB;
console.log(url);

// const connectionParams={
//     useNewUrlParser: true,
//     // useCreateIndex: false,
//     useUnifiedTopology: true 
// }
mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
