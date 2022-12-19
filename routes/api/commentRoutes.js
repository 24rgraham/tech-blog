const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get comment by post id
router.get('/:PostId', async (req, res) => {
  try {
    const data = await Comment.findAll({
      where: {
      PostId: req.params.PostId
      },
      include: [User],
  });
    res.status(200).json(data)
} catch (err) {
    console.log(err)
    res.status(500).json({ err: err })
}})

//create new comment
router.post('/', async (req,res) => {
  try {
      const newComment = await Comment.create({
          content: req.body.content,
          UserId: req.session.UserId,
          PostId: req.body.PostId,
      });
      res.status(200).json(newComment)
  } catch (err) {
      res.status(400).json(err);
  } 
})

  module.exports = router;