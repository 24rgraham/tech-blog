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

//delete post by id

module.exports = router;
