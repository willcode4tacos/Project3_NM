const router = require("express").Router();
const UserController = require("../../controllers/usercontroller");
const passport = require('../../passport')
const User = require('../../models/user')
const CurrentUser = {};
const nodeMailer = require('nodemailer');

router.post('/nodemailer/sendemail', function (req, res) {
    console.log("heyfdsfsgfsdfdsffdsgfsgfsgh");
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'willcode4tacos@gmail.com',
            pass: 'CodePhila7676'
        }
    });
    let mailOptions = {
        from: '"Helping Hand" <willcode4tacos@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello!', // Subject line
        html: 'Welcome to Helping Hand', // plain text body
        // html: '<b>NodeJS Email</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    });


// Matches with "/api/User"
// router.route("/")
//   .get(UserController.findAll)
//   console.log('test');
  //.post(UserController.create);

// Matches with "/api/User/:id"
// router
//   .route("/:id")
//   .get(UserController.findById)
//   .put(UserController.update)
//   .delete(UserController.remove);

  router.post('/user/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/user/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        CurrentUser = req.user;
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/user/', (req, res, next) => {
    console.log('===== user!777777!======')
    console.log(req.user)
    Console.log("CURRENT USER CURRENT USER CURRENT USER")
    console.log(CurrentUser)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})



router.post('/user/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;
