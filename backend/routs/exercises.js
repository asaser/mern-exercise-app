// potrzebujemy metody z express o nazwie Router bo tworzymy tutaj połączenia
const router = require('express').Router();
let Exercise = require('../models/exercise.models.js');

// ---------- GET - Read ---------- //
// pierwszy route który daje informacje jeśli https:..../users/ na końcu wystąpi '/' wtedy to będzie GET
router.route('/').get((req, res) => {
    // find() jest to metoda od mongoosa, która bierze wszystko od użytkownika i ona zwraca promise
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
});


// ---------- POST - Create ---------- //

// request POST wystapi jeśli dodamy /add
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch( err => res.status(400).json('Error: ' + err));
});


// ---------- DELETE - Delete, Remove ---------- //

// /:id to jest objectID stworzone automatycznie przez mongoDB
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise delete'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// musimy updatować to co zrobiliśmy i dlatego zapisujemy nowe Exercise
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err ));
});

module.exports = router;