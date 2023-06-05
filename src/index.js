
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


const app = require('./app');
const mongoose = require('mongoose');

const connect = async () => {
<<<<<<< HEAD
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });
=======
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
>>>>>>> 1b32db30ebad22545e68ee2378f9d4e4486cd422
    console.log("Connected to MongoDB");
}

const port = process.env.PORT || 4000;
app.listen(port, async () => {

    // mongoose will attempt to reconnect if an error occurs after the initial connection is established
    // if there is a problem with the initial connection then it makes no sense to start our api and our application will crash as it should
    connect();
    console.log(`Listening on port ${port}`);

});
