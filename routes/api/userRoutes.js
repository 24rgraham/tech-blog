const router = require('express').Router();
const {User} = require('../../models');
const bcrypt = require("bcrypt");


router.get('/',(req,res)=>{
    User.findAll().then(userData=>{
        res.json(userData)
    }).catch(err=>{
        res.status(500).json({msg:"An error has occurred",err})
    })
  })

// create new user
router.post('/', (req,res)=>{
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(newUser=>{
        req.session.UserId=newUser.id;
        req.session.loggedIn=true;
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

//update user info
router.put('/:id',(req,res)=>{
    User.update(
        {
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then((updatedUser) => {
        if (updatedUser[0] === 0) {
          return res.status(404).json({err});
        }
        res.json(updatedUser);
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
})

// login user
router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:'email or password incorrect!'})
        }else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:'email or password incorrect!'})
        }else{
            req.session.UserId=foundUser.id;
            req.session.loggedIn=true;
            res.json(foundUser);
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err});
    })
})

//logout user
router.get('/logout', (req, res) => {
    // logout
    if (req.session.loggedIn) {
      req.session.destroy();
      res.redirect("/")
    } else {
      res.status(404).end();
    }
});

module.exports = router