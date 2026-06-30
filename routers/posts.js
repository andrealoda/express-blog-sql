const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/postControllers');

// CONTROLLERS
router.get('/', (req, res, next) => {
  console.log('GET request to the homepage'); next();
}, postControllers.index);
router.get('/:id', postControllers.show);
router.post('/', postControllers.store);
router.put('/:id', postControllers.update);
router.patch('/:id', postControllers.patch);
router.delete('/:id', postControllers.destroy);

module.exports = router;