const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');

// MIDDLEWARES
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, ToughtsController.createTought);
router.post('/add', checkAuth, ToughtsController.createToughtSave);


router.get('/', ToughtsController.showToughts);

router.get('/dashboard', checkAuth,ToughtsController.dashboard);

router.post('/remove', checkAuth,ToughtsController.removeTought);

router.get('/edit/:id', checkAuth, ToughtsController.editToughts)
router.post('/edit', checkAuth,ToughtsController.updateTought);

module.exports = router;