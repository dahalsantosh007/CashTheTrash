// This is the initial setup for the backend
const express = require('express');
const app = express();

require('dotenv').config()

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');
const open = require('open');
const stripe = require("stripe")("sk_test_E8B4SzydOckQJYjlolPcJNPz");
const randtoken = require('rand-token');
const nodemailer = require('nodemailer');

const NewUser = require('./server/models/UserStorage');
const UserSession = require('./server/models/UserSession');
const NewProduct = require('./server/models/ProductStorage');
const CodeLog = require('./server/models/ForgottenPasswordLog');
const SoldProduct = require('./server/models/SoldProductLog');
const SALT_ROUNDS = 10;

var error = {
    error: {
        code: " "
    },
    result: null
};

var success = {
    error: "null",
    result: " ",
    id: " ",
};

// access_token$sandbox$qxp7kb7z9kmfc4dn$ac489c1c2bc38c8bd8d7776c52b82e14

// access_token$sandbox$fb5wv2gcc89fc9cr$c190d37fdc705d8a414a151e50028c58

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET,
});

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
  );

const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.post('/register',async(req, res) => {
  const user = await NewUser.findOne({email: req.body.email});
  if(user){
    console.log('user exist')
    return res.json({
        message:'User is already registered'
    });
  }

  const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new NewUser({
      userName: req.body.userName,
      password: hashpassword,
      email: req.body.email,
      isDeleted: false
  });

  newUser.save((err, doc)=>{
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(doc)
    }
  });
});

app.post('/logIn', async (req, res) =>{
  var userIn;
  const user = await NewUser.findOne({userName: req.body.userName});

  if (user){
    const alreadyIn = await UserSession.findOne({userName: req.body.userName}).then((item)=>{       
      if(item != null){
        const data = {
          id : item.id,
          userName: item.userName
        }
        res.json(data)
        userIn = true
      }
    });

    if(!userIn){
      const compareResult = await bcrypt.compare(req.body.password, user.password);
      if(compareResult){
        const loggedUser = new UserSession({
          _id: jwt.sign( req.body , "santosh", { expiresIn: 180 }),
          userName: req.body.userName,
          isLoggedOut: false,
        })
  
        loggedUser.save()
        .then((item) =>{
          const data = {
            id : item.id,
            userName: item.userName
          }
          res.json(data)
        }
          )
        .catch(err => {
          res.status(400).send("unable to save to database");
          })
      }else{
        return  res.status(400).send("password doesnot match");  
      }
    }
  }else{
    return  res.status(400).send(" user doesnot exist");
  }
});

app.post('/addProduct',async(req,res)=>{
  const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
  const hashID = await bcrypt.hash(req.body.productId, salt);

  const newProduct = new NewProduct({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productId: hashID,
      isBought: false,
      isRemoved:false,
      quantity:req.body.quantity
  });

  newProduct.save((err, doc)=>{
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(doc)
    }
  });
});

app.post('/buyTheProduct/stripe',function(req,res){
  const token = req.body.token;

  const charge = stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    description: req.body.description,
    source: token,
  },function(err,charge){
    if(err){
      res.send({
        success:false,
        message:'error'
      })
    }else{
      db.collection('products').update({'productName':item},{$inc:{'quantity':-1}},function(err,doc){
        var records = db.collection('products').findOne({'productName':item},function(err,doc){
          if(doc.quantity === 0){
            db.collection('products').update({'productName':item},{$set:{'isBought':true}});
            db.close();
           }
           db.close();
         });
         db.close();
       })

      res.send({
        success:true,
        message:'success'
      })
    }
  });
});

app.post('/buyTheProduct/paypal',function(req,res){
  var information = req.body;
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": `http://localhost:3000/approved?total=${information.price}&item=${information.name}&itemDescription=${information.description}`,
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": information.name,
                "sku": "item",
                "price": information.price,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": information.price
        },
        "description": information.description
    }]
  };

  paypal.payment.create(create_payment_json,function (error, payment) {
      if (error) {
          throw error;
      } else {
          for (let i = 0; i < payment.links.length; i++){
            if (payment.links[i].rel === 'approval_url'){
              open(payment.links[i].href);
            }
          }
      }
    });
});

app.post('/checkUserStatus',function(req,res){
  var info = req.body;

  var findRecord = db.collection('people').findOne({'email':info.email,'userName':info.userName},function(err,doc){
    if(!doc){
      error.error.code = 'not found';
      res.json(error);
    }else{
      success.result= "found";
      res.json(success);
    }
  })
});

app.post('/sendMail', function (req, res, next) {
  var email = req.body;

  //check if the email has been given token or not
  var record = db.collection('codelogs').findOne(
    {
      'email':email.email,
      'isUsed':false
    },function (err,doc){
      if(err){
        console.log(err);
      }
      if(doc){
        error.error.code = 'the code already exist'
        res.send(error);
      }else{
        var token = randtoken.generate(16);
        var output = `${token}`;

        var transporter = nodemailer.createTransport({
            service : 'gmail',
            auth:{
                type:'OAuth2',
                user: 'dahal.santosh007@gmail.com',
                clientId:'906817036366-4turspu4ecq1utokedhmmbduu8eo5vgc.apps.googleusercontent.com',
                clientSecret:'eWT8gHkKaKmqKA0zfEX6QVnL',
                refreshToken:'1/-fD-lFnnqE31XiafJ2UiNiXrYOf5ouU9JcWmwwn1mX4'
            }
          });

        var mailOptions = {
          from: 'dahal.santosh007@gmail.com',
          to: email.email,
          subject: 'test',
          html:output
        }

        transporter.sendMail(mailOptions,function(err,info){
          if (err) {
            // handle error
            console.log(err);
            return res.send('There was an error sending the email');
          }
          success.result = 'success';
          success.id = token;
          res.send(success);
        });
      }
  });
});

app.post('/changePassword',function(req,res){
  var info = req.body;

  var record = db.collection('codelogs').findOne(
    {
      'email':info.email,
      'token':info.token,
      'userName':info.userName,
      'isUsed':false
    },function (err,doc){
      if(err){
        console.log(err);
      }
      if(doc){
        db.collection('codelogs').findOneAndUpdate({'token':info.token},{$set:{"isUsed":true}},{new:true},function(err,doc){
          if(err){
            console.log(err)
          }else {
          }
        });
        bcrypt.hash(info.password, SALT_ROUNDS, function(err, hash) {
          db.collection('people').update({"email":info.email,'userName':info.userName},{$set:{"password":hash}})
        });
        success.result = info.token;
        res.json(success);
      }else{
        error.error.code = 'data doesnot exist';
        res.json(error);
      }
  });
});

app.post('/logTheCode',function(req,res){
  var codeLogInfo = req.body;

  var record = db.collection('codeLogs').findOne({'token':codeLogInfo.token},function(err,doc){
    if(err){
      console.log(err);
    }

    if(doc){
      error.error.code = 'code present';
      res.send(error);
    }else{
      if(!codeLogInfo.token || !codeLogInfo.email){
        error.error.code = 'Empty Field';
        res.send(error);
      }else{
        CodeLog.addCodeLog(codeLogInfo,function(returnData){
          res.json(returnData);
          db.close();
        });
      }
    }
  });
});

app.post('/SoldProductLog',function(req,res){
  var record = req.body;

  var test = db.collection('soldproducts').findOne({'productId':record.productId},function(err,doc){
    if(!doc){
      db.collection('products').update({'productId':record.productId},{$set:{'isBought':true,'isRemoved':true}});

      SoldProduct.addSoldProductLog(record,function(returnData){
        res.json(returnData);
        db.close();
      });

      success.result = 'success';
      res.json(success);
    }
  })
})

app.get('/approved',function(req,res){
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const item = req.query.item;
  const description = req.query.itemDescription;
  const price = req.query.total;
  var soldProductInfo={
    productName:item,
    productPrice:price,
    productDescription:description
  }
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency":"USD",
        "total": req.query.total
      }
    }]
  };

  paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
    if(error){
      throw error;
    }else{
      db.collection('products').update({'productName':item},{$inc:{'quantity':-1}});

      success.result = "success";
      res.json(success);
    }
  });
});

app.get('/checkLoggedUser', function(req,res){
  var record = db.collection('usersessions').findOne({'isLoggedOut': false},function(err,doc){

    if(doc!== null){
      return res.send({
        error:"null",
        data: doc,
      });
    }else{
      return res.send({
        error:"error",
        data: ' ',
      });
    }
    db.close();
  })
})

app.get('/cancel',function(res,req){
  res.send('cancel the purchase');
});

/*
app.post('/profile', ensureToken, function (req, res) {
    jwt.verify(req.token, 'santosh', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            if (data.documents.User_Name === "san") {
                res.json({ great: "success" });
            } else {
                error.error.code = "Unauthorized";
                res.json(error);
            }
        }

    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
*/

app.get('/verify',function (req,res){
  console.log('verify api')
    var token = req.query.token;
    var record = UserSession.find({
      "_id" :token,
      "isDeleted": false
    },function(err,doc){
      if (err){
        return res.send({
          error: "server Error",
          result: null
        });
        db.close();
      }
      if(!doc){
        return res.send({
          error: "Invalid",
          result: null
        });
        db.close();
      }else{
        return res.send({
          error: "no error",
          result: null
        });
        db.close();
      }
    })
})

app.get('/logout',function(req,res){
  var token = req.query.token;
  var record = db.collection('usersessions').findOneAndUpdate({
    "_id" :token,
    "isLoggedOut": false
  },{
    $set:{
      "isLoggedOut":true
    }
  },{new:true},function(err,doc){
    if (err){
      return res.send({
        error: "server Error",
        result: null
      });
      db.close();
    }
      return res.send({
        success: "success",
        message: "successful logout"
      })
      db.close();
  });
});

app.get('/showProduct',async(req,res)=>{
  const records = await NewProduct.find({});
  if (records){
    res.json(records)
    }
  
});

app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})