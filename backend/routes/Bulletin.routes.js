const express = require('express');
const router = express.Router();
const {
  listBulletins,
  getBulletinById,
  createBulletin,
  deleteBulletin,
} = require('../controllers/Bulletincontroller');

const { protect } = require('../middleware/auth');

router.get('/', listBulletins);
router.get('/:id', getBulletinById);
router.post('/', protect, createBulletin);
router.delete('/:id', protect, deleteBulletin);

// Adjust this import to match your existing auth middleware's export name
// const { protect } = require('../middleware/auth');

router.get('/', listBulletins);
router.get('/:id', getBulletinById);
router.post('/', /* protect, */ createBulletin);
router.delete('/:id', /* protect, */ deleteBulletin);

module.exports = router;