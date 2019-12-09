const { Router } = require('express');

/**
 * Controllers
 */
const SiteController = require('../controllers/SiteController');

/**
 * Router
 */
const router = Router();

/**
 * Site routes
 */
router.get('/', SiteController.index);

module.exports = router;
