const AwarenessPost = require('../models/AwarenessPost');

// GET /api/awareness-posts?category=
exports.listAwarenessPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;

    const posts = await AwarenessPost.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list posts', error: err.message });
  }
};

// POST /api/awareness-posts  (auth-gated: doctor/admin only)
exports.createAwarenessPost = async (req, res) => {
  try {
    const { title, description, category, imageUrl } = req.body;

    if (!title || !description || !category || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const post = await AwarenessPost.create({ title, description, category, imageUrl });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post', error: err.message });
  }
};

// DELETE /api/awareness-posts/:id  (auth-gated)
exports.deleteAwarenessPost = async (req, res) => {
  try {
    const post = await AwarenessPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};