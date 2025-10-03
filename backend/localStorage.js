const fs = require('fs');
const path = require('path');

class LocalStorage {
  constructor() {
    this.filePath = path.join(__dirname, 'posts.json');
    this.ensureFileExists();
  }

  ensureFileExists() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  getAllPosts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading posts file:', error);
      return [];
    }
  }

  savePost(post) {
    try {
      const posts = this.getAllPosts();
      const newPost = {
        _id: Date.now().toString(),
        ...post,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      posts.unshift(newPost);
      fs.writeFileSync(this.filePath, JSON.stringify(posts, null, 2));
      return newPost;
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }

  deletePost(id) {
    try {
      const posts = this.getAllPosts();
      const filteredPosts = posts.filter(post => post._id !== id);
      fs.writeFileSync(this.filePath, JSON.stringify(filteredPosts, null, 2));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  getPostById(id) {
    const posts = this.getAllPosts();
    return posts.find(post => post._id === id);
  }

  updatePost(id, updateData) {
    try {
      const posts = this.getAllPosts();
      const postIndex = posts.findIndex(post => post._id === id);
      
      if (postIndex === -1) {
        return null;
      }

      posts[postIndex] = {
        ...posts[postIndex],
        ...updateData,
        updatedAt: new Date()
      };

      fs.writeFileSync(this.filePath, JSON.stringify(posts, null, 2));
      return posts[postIndex];
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }
}

module.exports = LocalStorage;