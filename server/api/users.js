const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
})

router.get('/:id',(req, res, next)=>{
  User.findOne({where:{
    id:userId
  }}).then(user => res.json(user))
  .catch(next);
})

router.post('/', (req, res, next)=>{
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next);
})

router.put('/:userId',(req,res,next)=>{
  User.findOne({where:{id:req.params.userId}})
  .then(user => user.update({password:req.body.password}))
  .then(result => res.status(201).json(result))
  .catch(next);    
})

router.delete("/:userId", (req, res, next) => {
   User.findById(req.params.userId)
  .then( user => user.destroy({}) )
  .then( result => res.sendStatus(204))
  .catch(next);
})