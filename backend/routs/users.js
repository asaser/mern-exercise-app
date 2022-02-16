// potrzebujemy metody z express o nazwie Router bo tworzymy tutaj połączenia
const router = require('express').Router();
let User = require('../models/user.models.js');

// pierwszy route który daje informacje jeśli https:..../users/ na końcu wystąpi '/' wtedy to będzie GET
router.route('/').get((req, res) => {
    // find() jest to metoda od mongoosa, która bierze wszystko od użytkownika i ona zwraca promise
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

// request POST wystapi jeśli dodamy /add
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;