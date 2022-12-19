const router = require("express").Router();
const { Post, User, Comment } = require("../models");

//show all posts - for homepage
router.get("/", async (req, res) => {
  // Shows all posts
  try {
    const postData = await Post.findAll({
      include: [User,Comment],
    });

    // serialize
    const posts = postData.map((event) => event.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Show single post and comments
router.get("/posts/:id", async (req, res) => {
  // Shows one post
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [User, Comment],
    });

    if (postData) {
      // serialize
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        sessId: req.sessionID,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // login
  if (req.session.loggedIn) {
    return res.redirect(`/`);
  }
  res.render("login", {
    loggedIn: false,
    userId: null,
  });
});

router.get("/signup", (req, res) => {
  // signup
  if (req.session.loggedIn) {
    return res.redirect(`/`);
  }
  res.render("signup", {
    loggedIn: false,
    userId: null,
  });
});

router.get("/logout", (req, res) => {
  // logout
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else if (req.session.loggedIn) {
    req.session.destroy();
    res.redirect("/");
  } else {
    res.status(404).end();
  }
});

// add post
router.get("/new-post", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/`);
  }
  User.findByPk(req.session.UserId).then((foundUser) => {
    if (!foundUser) {
      return res.redirect("/404");
    }
    const hbsUser = foundUser.toJSON();
    res.render("newPost", {
      hbsUser: hbsUser,
      loggedIn: req.session.loggedIn,
      UserId: req.session.UserId,
    });
  });
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
