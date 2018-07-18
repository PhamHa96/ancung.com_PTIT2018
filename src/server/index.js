var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var router = express.Router();
var multer = require('multer');

var db = require('./db');

var quananRouter = require('./routes/quanan.route');
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
var typeFoodRouter = require('./routes/typefood.route');
var userController = require('./controller/user.controller');
var sendMail = require('./sendMail');

var errorHandler = require('./middle-ware/error-handler');

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(express.static('apidoc')); //localhost:8081

// upload
var storage = multer.diskStorage(
    {
        destination: '../client-app/src/assets/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

app.use(multer({
    storage
  }).single('file'))

var upload = multer({storage: storage})
app.post('/upload', upload.single("file"), function(req, res){
    console.log(req.file);
    res.send("up thanh cong");
})

//var upload = multer({ dest: '../client-app/src/assets/'}).single('file');
/** API path that will upload the files */
app.post('/upload/:id', (req, res, next) => {
    console.log(req.params.id);
    console.log(req.file);
    
    userController.updateImage(req.params.id, req.file.filename)
    .then(() => {
        console.log('luu thanh cong ');
    })
    .catch(err => {
        console.log('loi ', err.message);
    })

});

//
// app.post('/upload', (req, res, next) => {
//     console.log(req.file);    
//     userController.updateImage(req.file.filename)
//     .then(() => {
//         console.log('luu thanh cong ');
//     })
//     .catch(err => {
//         console.log('loi ', err.message);
//     })

// });
//

app.use('/quanan', quananRouter);
app.use('/users', userRouter);
app.use('/type', typeFoodRouter);
app.use('/contact', sendMail);

app.use('/auth', authRouter);

app.use(errorHandler.errorHandler());

app.listen(8081, function () {
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost:8081");
})