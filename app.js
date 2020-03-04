const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const heroes = require('./routes/heroes');
const home = require('./routes/home');

const authentication = require('./middleware/authenticator');
const emailSender = require('./middleware/email-sender');

const app = express();

connectDb();

// serves for every route
app.use(cors());
app.use(express.json());
app.use(authentication);
app.use(emailSender);

// custom middlewares
app.use('/api/heroes', heroes);
app.use('/', home);

const port = 3000;

// If collection is not exists it will create automatically and document too (Hero -> heros happen automatically)
async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost/herodb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected!');
    } catch (error) {
        console.log(error.message);
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
