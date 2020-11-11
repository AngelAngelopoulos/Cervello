const admin = require('firebase-admin')

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://cervello-2f175.firebaseio.com/'
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', {});
});

//Listar vacantes
router.get('/vacants', (req, res) => {
    db.ref('vacants').once('value', (snapshot) => {
       data = snapshot.val();
        res.json({vacants: data});
       //res.render('index', {contacts: data})
    });
})

//Crear vacante
router.post('/vacants/new', (req, res) => {
    const newVacant = {
        hours: req.body.hours,
        vacant_name: req.body.vacant_name,
        salary: req.body.salary,
        company : req.body.company,
        description: req.body.description,
        level: req.body.level,
        points: req.body.points,
        num_of_applicants: req.body.num_of_applicants
    };
    db.ref('vacants').push(newVacant);
    res.redirect('/');
});

//Mostrar Vacante
router.get('/vacants/:id', (req, res) => {
    db.ref('vacants/' + req.params.id).once('value', (snapshot) => {
        data = snapshot.val();
        res.json(data);
    });
});

//Eliminar Vacante 
router.get('/vacants/delete/:id', (req, res) => {
    db.ref('vacants/' + req.params.id).remove();
    res.redirect('/vacants');
});

//Listar Vacantes
router.get('/applicants', (req, res) => {
    db.ref('applicants').once('value', (snapshot) => {
        data = snapshot.val();
        res.json(data);
    });
});

router.post('/applicants/new', (req, res) => {
    const newVacant = {
        hs_grade: req.body.hs_grade,
        ss_garde: req.body.exam_sk_garde,
        vacant_name: req.body.vacant_name,
        first_name: req.body.salary,
        last_name : req.body.company,
        email : req.body.email,
        age : req.body.description,
        level: req.body.level,
        points: req.body.points
    };
    db.ref('vacants').push(newVacant);
    res.redirect('/');
});

router.get('/users/register', (req, res) => {
    res.render('register', {})
});

router.get('/users/login', (req, res) => {
    res.render('login', {})
});

router.post('/users/new', (req, res) => {
    res.json(req.body);
})



router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;