const express = require('express');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const deeplink = require('node-deeplink');
const {AdminRouter} = require('./src/api/v2/routes/admin');
const {CompanyRouter} = require('./src/api/v2/routes/company');
const {OfferRouter} = require('./src/api/v2/routes/offer');
const {UserRouter} = require('./src/api/v2/routes/user');
const {AuthRouter} = require('./src/api/v2/routes/auth');
const {AboutUsRouter} = require('./src/api/v2/routes/aboutUs');
const {MessagesRouter} = require('./src/api/v2/routes/message');
const {NotificationRouter} = require('./src/api/v2/routes/notification');
const fs = require('fs');
const accessLogStream = fs.createWriteStream(__dirname + '/logs.log', {flags: 'a'});
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use(morgan('combined',{stream : accessLogStream}));
app.use(helmet());
app.disable('x-powered-by');  
// skip: function (req, res) { return res.statusCode < 400 },
app.use('/admins' , AdminRouter);
app.use('/companies' , CompanyRouter);
app.use('/offers' , OfferRouter);
app.use('/users' , UserRouter);
app.use('/auth' , AuthRouter);
app.use('/about' , AboutUsRouter);
app.use('/message' , MessagesRouter);
app.use('/notifications' , NotificationRouter);
app.use('/uploads/gallery',express.static(__dirname + '/uploads'));
app.get('/' , (req,res) => {
    res.status(200).redirect('https://traveloffersnhotels.com');
});
// deeplink 
app.get('/app',deeplink({
    fallback: 'https://traveloffersnhotels.com',
    //  com.TravelOffersApp
    android_package_name: 'com.TravelOffers',
  }))
// app.get('/testoffer' , (req,res) => {
//     res.sendFile(__dirname+'/testup.html');
// });
app.get('/logstesttest' , (req,res) => {
    res.sendFile(__dirname+'/logs.log');
});
app.use('*' , (req,res) => {
    res.status(404).sendFile(__dirname+'/404.html');
});

exports.app = app ;
exports.mongoose = mongoose ;
