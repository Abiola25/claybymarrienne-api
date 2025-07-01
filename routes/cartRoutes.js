const router = require('express').Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:itemId', removeFromCart);
module.exports = router;