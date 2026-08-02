const Bulletin = require('../models/Bulletin');

// GET /api/bulletins?type=&category=
exports.listBulletins = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = {};
    if (type && type !== 'All') filter.type = type;
    if (category && category !== 'All') filter.category = category;

    const bulletins = await Bulletin.find(filter).sort({ createdAt: -1 });
    res.json(bulletins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list bulletins', error: err.message });
  }
};

// GET /api/bulletins/:id
exports.getBulletinById = async (req, res) => {
  try {
    const bulletin = await Bulletin.findById(req.params.id);
    if (!bulletin) return res.status(404).json({ message: 'Not found' });
    res.json(bulletin);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};

// POST /api/bulletins  (auth-gated: doctor/admin only)
exports.createBulletin = async (req, res) => {
  try {
    const { type, title, excerpt, category, imageUrl, videoUrl, tips, readTime } = req.body;

    if (!type || !title || !excerpt || !category || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const bulletin = await Bulletin.create({
      type, title, excerpt, category, imageUrl, videoUrl, tips, readTime,
    });

    res.status(201).json(bulletin);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create bulletin', error: err.message });
  }
};

// DELETE /api/bulletins/:id  (auth-gated)
exports.deleteBulletin = async (req, res) => {
  try {
    const bulletin = await Bulletin.findByIdAndDelete(req.params.id);
    if (!bulletin) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};