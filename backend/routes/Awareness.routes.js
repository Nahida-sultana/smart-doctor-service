const express = require('express');
const router = express.Router();
const {
  listAwarenessPosts,
  createAwarenessPost,
  deleteAwarenessPost,
} = require('../controllers/awarenessController');

const { protect } = require('../middleware/auth');

router.get('/', listAwarenessPosts);
router.post('/', protect, createAwarenessPost);
router.delete('/:id', protect, deleteAwarenessPost);

// Adjust this import to match your existing auth middleware's export name
// const { protect } = require('../middleware/auth');

router.get('/', listAwarenessPosts);
router.post('/', /* protect, */ createAwarenessPost);
router.delete('/:id', /* protect, */ deleteAwarenessPost);

module.exports = router;