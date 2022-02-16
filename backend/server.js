// jest to zaplacze dla Node.js które daje ułatwienia
const express = require('express');

// nie pozwala asynchronicznie wprowadzać zmian przez przeglądarki
const cors = require('cors');

// służy do łączenia MogoDB z Node.js
const mongoose = require('mongoose');


require('dotenv').config();

// tutaj tworzymy express serwer z portem 5000
const app = express();
const port = process.env.PORT || 5000;

// middleware który łączy nas z MongoDB i parsuje dane na json
app.use(cors());
app.use(express.json());

// łączymy się z MongoDB 'connect'
const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { 
        // flagi aby dodawać nowe url oraz indexy w MongoDB
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

// 'connection' jeśli connection jest otwarte 'open' wtedy połączyliśmy się z sukcesem i jesteśmy połączeni do BazyDanych
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("SUCCESS MongoDB database connection")
});

// wymagamamy plików, requires files
const exercisesRouter = require('./routs/exercises');
const usersRouter = require('./routs/users')

// używamy konkretnych plików. Jeśli ktoś wpisze to w przegląrkę to dostaniemy dane
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// nasłuchujemy co się dzieje w serwerze
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});