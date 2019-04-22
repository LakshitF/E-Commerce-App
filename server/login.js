const express=require('express');
const router=express.Router();
const User=require('./models/user.js');
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');
const bcrypt=require('bcryptjs');
const crypto = require('crypto');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'
  }
}));

router.post('/forgot',(req,res,next)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
      res.redirect('/login');
    }
    const token=buffer.toString('hex');
    console.log(req.body);
    User.findOne({email:req.body.email})
    .then(user=>{
      if(!user){
        console.log('User does not exist');
        return res.redirect('/login');
      }
      user.resetToken=token;
      user.tokenExpiration=Date.now()+6000000;
      console.log('Mail Sending.');

      transporter.sendMail({
        to: req.body.email,
          from: 'E-Shop@node.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:8000/resetPass/${token}">link</a> to set a new password.</p>
          `
      })
      .then(kuch=>{
        console.log('mail sent');
        console.log(kuch);
      })
      .catch(err=>{console.log(err);});
      res.redirect('/');
    })
    .catch(err=>{console.log(err);});
  });
});


router.post('/newPassword',async(req,res,next)=>{
  const passToken = req.body.token;
  let user=await User.findOne({resetToken:passToken});
  const newPassword=req.body.password;
  const email=req.body.email;

  console.log('passtoken is ',req.body.token);
  let resetUser;

  User.findOne({
    resetToken: passToken,
    email:email
  })
    .then(user => {
      resetUser = user;
      console.log('user with this token found ',user);
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .catch(err => {
      console.log('Invalid token');
      console.log(err);
    });
});

router.post('/login',(req,res,next)=>{
  const pass=req.body.password;
  const email=req.body.email;
  User.findOne({email:email})
    .then(user => {
      if(user==null){
        res.redirect('/login');
      }
      bcrypt.compare(pass,user.password)
      .then(result=>{
        if(result){
          req.session.isLoggedIn = true;
          req.session.user = user;

          console.log('Successfully logged in',req.session.user._id);
          req.session.save(err => {
            console.log(err);
            return res.redirect('/shop');  //render page again
          });
        }
      });
    })
    .catch(err => console.log(err));
});

router.get('/login',(req,res,next)=>{
  res.send({log:req.session.isLoggedIn});
});

router.post('/signout',(req,res,next)=>{
  console.log(req.session.isLoggedIn);
  res.send({log:false});
  req.session=null;
});

router.post('/signup',(req,res,next)=>{        //../ means go up one level
  //always remember, this must be an object, look at your schema
    User.findOne({email:req.body.email})
  .then(userDoc=>{
    if(userDoc){
      return res.redirect('/login');
    }
    return bcrypt.hash(req.body.password,8)
    .then(hash=>{
      const user=new User({username:req.body.username,password:hash,email:req.body.email});
      user.save();
      return;
    })
    .catch(err=>{console.log(err);});
  })
  .catch(err=>{
    console.log(err);
  });
  res.redirect('/login');
});

module.exports=router;
