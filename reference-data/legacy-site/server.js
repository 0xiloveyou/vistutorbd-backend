const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // only needed if frontend runs on another domain
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // remove if not needed
app.use(express.json());
app.use(express.static('public'));

// ✅ Serve posts folder directly for frontend use
app.use('/posts', express.static(path.join(__dirname, 'public', 'posts')));

// Helper: Path to posts JSON
const getPostFilePath = (target) => {
  return path.join(__dirname, 'public', 'posts', `${target}.json`);
};

// Helper: Generate unique ID
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
};

// POST new blog post
app.post('/api/posts/:target', (req, res) => {
  const target = req.params.target;
  const filePath = getPostFilePath(target);
  const newPost = req.body;

  if (!newPost || Object.keys(newPost).length === 0) {
    return res.status(400).json({ error: 'Post data required' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    let posts = [];
    if (!err && data) {
      try {
        posts = JSON.parse(data);
      } catch (e) {
        console.error("Invalid JSON in file:", filePath);
        return res.status(500).json({ error: 'Invalid JSON format' });
      }
    }

    newPost.id = generateId();
    posts.unshift(newPost);

    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
      if (err) return res.status(500).json({ error: 'Folder creation failed' });

      fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8', (err) => {
        if (err) {
          console.error("Write error:", err);
          return res.status(500).json({ error: 'Save failed' });
        }
        res.json({ success: true, id: newPost.id });
      });
    });
  });
});

// GET all posts for a target
app.get('/api/posts/:target', (req, res) => {
  const filePath = getPostFilePath(req.params.target);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.type('json').send(data);
  });
});

// DELETE a post by ID
app.delete('/api/posts/:target/:id', (req, res) => {
  const filePath = getPostFilePath(req.params.target);
  const postId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });

    let posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON format' });
    }

    const filteredPosts = posts.filter(post => post.id !== postId);

    fs.writeFile(filePath, JSON.stringify(filteredPosts, null, 2), 'utf8', (err) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      res.json({ success: true });
    });
  });
});

// PUT (update) a post by ID
app.put('/api/posts/:target/:id', (req, res) => {
  const filePath = getPostFilePath(req.params.target);
  const postId = req.params.id;
  const updatedData = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });

    let posts;
    try {
      posts = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON format' });
    }

    const index = posts.findIndex(post => post.id === postId);
    if (index === -1) return res.status(404).json({ error: 'Post not found' });

    posts[index] = { ...posts[index], ...updatedData };

    fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8', (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ success: true });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
