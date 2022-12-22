const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all posts
router.get('/', (req, res) => {
  Post.findAll().then(data => {
    res.json(data)
  }).catch(err => {
    res.status(500).json({ msg: "An error has occurred", err })
  })
})

// get post by id
router.get('/:id', async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id);
    res.status(200).json(data)
} catch (err) {
    console.log(err)
    res.status(500).json({ err: err })
}})

//create new post
router.post('/', async (req,res) => {
  try {
      const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          UserId: req.session.UserId,
      });
      res.status(200).json(newPost)
  } catch (err) {
      res.status(400).json(err);
  } 
})

//update post by id
router.put('/:id', (req,res)=>{
  Post.update({
    title: req.body.title,
    content: req.body.content,
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((updatedEvent) => {
    if (updatedEvent[0] === 0) {
      return res.status(404).json({ msg: "no event found" });
    }
    res.json(updatedEvent)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
})

//delete post by id
router.delete('/:id', async (req, res) => {
  try {
    const event = await Post.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!event) {
      return res.status(400).json({message: "No post"})
    }
    res.status(200).json(event)
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
