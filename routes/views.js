module.exports = function(express) {
  let router = express.Router();

  router.get('/', (req, res) => {
    if (req.session.user_id) {
      res.render('timeline');
    } else {
      res.render('welcome', {helpers: { height: 'height: 100%;'}});
    }
  });

  return router;
};
