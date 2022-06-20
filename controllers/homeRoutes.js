const router = require("express").Router();
const { Comment, User } = require('../models');

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("homepage", {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/createcomment", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const user = userData.get({ plain: true });

    res.render('createcomment', {
      ...user,
      logged_in: true,
      comments
    });
  } catch
  (err) {
    res.status(500).json(err)
  }
});

router.get('/comment/:category', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        category: req.params.category
      }
    })
console.log(commentData)
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('comment', {
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/comment");
    return;
  }

  res.render("login");
});

module.exports = router;