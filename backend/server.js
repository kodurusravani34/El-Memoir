const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const LocalStorage = require('./localStorage');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const localStorage = new LocalStorage();

// Track if MongoDB is available
let isMongoConnected = false;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/el-memoir';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('Database:', MONGODB_URI.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas');
    isMongoConnected = true;
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Using local file storage as fallback');
    console.log('📁 Posts will be saved to posts.json file');
    isMongoConnected = false;
  });

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'mobile', 'devops', 'personal'],
    lowercase: true
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

// Routes

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    let posts = [];
    
    if (isMongoConnected && mongoose.connection.readyState === 1) {
      // Use MongoDB
      const mongoPosts = await Post.find().sort({ createdAt: -1 });
      posts = mongoPosts.map(post => ({
        _id: post._id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        date: post.createdAt.toISOString().split('T')[0],
        readTime: post.readTime
      }));
    } else {
      // Use local storage
      const localPosts = localStorage.getAllPosts();
      posts = localPosts.map(post => ({
        _id: post._id,
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content,
        category: post.category,
        date: new Date(post.createdAt).toISOString().split('T')[0],
        readTime: post.readTime || '5 min read'
      }));
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const formattedPost = {
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      date: post.createdAt.toISOString().split('T')[0],
      readTime: post.readTime
    };
    
    res.json(formattedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, category, excerpt = '', readTime = '5 min read' } = req.body;
    
    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({ 
        error: 'Required fields: title, content, category' 
      });
    }
    
    let savedPost;
    
    if (isMongoConnected && mongoose.connection.readyState === 1) {
      // Use MongoDB
      const newPost = new Post({
        title,
        excerpt,
        content,
        category: category.toLowerCase(),
        readTime
      });
      
      savedPost = await newPost.save();
      
      const formattedPost = {
        _id: savedPost._id,
        title: savedPost.title,
        excerpt: savedPost.excerpt,
        content: savedPost.content,
        category: savedPost.category,
        date: savedPost.createdAt.toISOString().split('T')[0],
        readTime: savedPost.readTime
      };
      
      res.status(201).json(formattedPost);
    } else {
      // Use local storage
      const postData = {
        title,
        excerpt,
        content,
        category: category.toLowerCase(),
        readTime
      };
      
      savedPost = localStorage.savePost(postData);
      
      const formattedPost = {
        _id: savedPost._id,
        title: savedPost.title,
        excerpt: savedPost.excerpt,
        content: savedPost.content,
        category: savedPost.category,
        date: new Date(savedPost.createdAt).toISOString().split('T')[0],
        readTime: savedPost.readTime
      };
      
      res.status(201).json(formattedPost);
    }
    
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, content, category, excerpt, readTime } = req.body;
    
    const updateData = {
      updatedAt: Date.now()
    };
    
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category.toLowerCase();
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (readTime) updateData.readTime = readTime;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const formattedPost = {
      _id: updatedPost._id,
      title: updatedPost.title,
      excerpt: updatedPost.excerpt,
      content: updatedPost.content,
      category: updatedPost.category,
      date: updatedPost.createdAt.toISOString().split('T')[0],
      readTime: updatedPost.readTime
    };
    
    res.json(formattedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts by category
app.get('/api/posts/category/:category', async (req, res) => {
  try {
    const posts = await Post.find({ 
      category: req.params.category.toLowerCase() 
    }).sort({ createdAt: -1 });
    
    const formattedPosts = posts.map(post => ({
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      date: post.createdAt.toISOString().split('T')[0],
      readTime: post.readTime
    }));
    
    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search posts
app.get('/api/posts/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    const formattedPosts = posts.map(post => ({
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      date: post.createdAt.toISOString().split('T')[0],
      readTime: post.readTime
    }));
    
    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'El-Memoir API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Health check: http://localhost:${PORT}/api/health`);
});