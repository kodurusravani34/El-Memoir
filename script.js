// Blog posts will be loaded from MongoDB
let blogPosts = [];

// API Base URL - Update this when you deploy your backend
const API_BASE_URL = 'http://localhost:3000/api';

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const themeToggle = document.getElementById('theme-toggle');
const categoryButtons = document.querySelectorAll('.category-btn');
const modal = document.getElementById('post-modal');
const closeModal = document.getElementsByClassName('close')[0];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupNavigation();
    setupThemeToggle();
    setupCategoryFilters();
    setupModal();
    loadPostsFromAPI();
});

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function setupThemeToggle() {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Navigation management
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Load specific content based on section
    if (sectionId === 'explore') {
        loadExplorePosts('all');
    } else if (sectionId === 'home') {
        loadFeaturedPosts();
    }
}

// Setup modal functionality
function setupModal() {
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// API Functions for MongoDB integration
async function loadPostsFromAPI() {
    try {
        showLoading(document.getElementById('featured-posts-grid'));
        const response = await fetch(`${API_BASE_URL}/posts`);
        
        if (!response.ok) {
            // Fallback to sample data if API is not available
            console.log('API not available, using sample data');
            loadSamplePosts();
            return;
        }
        
        blogPosts = await response.json();
        loadPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        // Fallback to sample data
        loadSamplePosts();
    }
}

function loadSamplePosts() {
    // Sample posts for testing when MongoDB is not connected
    blogPosts = [
        {
            _id: "1",
            title: "Welcome to My Blog",
            category: "personal",
            date: "2025-10-03",
            content: "Welcome to my personal blog! This is where I'll be sharing my journey in technology, development insights, and personal thoughts. I'm Sravani, and I'm excited to connect with fellow developers and tech enthusiasts through this platform."
        },
        {
            _id: "2",
            title: "Getting Started with React Hooks",
            category: "frontend",
            date: "2025-09-28",
            content: "React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore useState, useEffect, and custom hooks with practical examples and best practices."
        }
    ];
    loadPosts();
}

async function createPost(postData) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        
        if (response.ok) {
            const newPost = await response.json();
            blogPosts.unshift(newPost);
            loadPosts();
            return newPost;
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            blogPosts = blogPosts.filter(post => post._id !== postId);
            loadPosts();
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Category filter management
function setupCategoryFilters() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered posts
            loadExplorePosts(category);
        });
    });
}

// Post loading functions
function loadPosts() {
    loadFeaturedPosts();
    loadExplorePosts('all');
}

function loadFeaturedPosts() {
    const featuredPostsGrid = document.getElementById('featured-posts-grid');
    const featuredPosts = blogPosts.slice(0, 3); // Get latest 3 posts
    
    featuredPostsGrid.innerHTML = '';
    featuredPosts.forEach(post => {
        const postElement = createPostCard(post);
        featuredPostsGrid.appendChild(postElement);
    });
}

function loadExplorePosts(category) {
    const explorePostsGrid = document.getElementById('explore-posts-grid');
    
    let filteredPosts = blogPosts;
    if (category !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === category);
    }
    
    explorePostsGrid.innerHTML = '';
    
    if (filteredPosts.length === 0) {
        explorePostsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>No posts found in the "${category}" category yet.</p>
            </div>
        `;
        return;
    }
    
    filteredPosts.forEach(post => {
        const postElement = createPostCard(post);
        explorePostsGrid.appendChild(postElement);
    });
}

// Create post card element
function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    
    // Create a content preview (first 150 characters)
    const contentPreview = post.content ? 
        (post.content.length > 150 ? 
            post.content.substring(0, 150) + '...' : 
            post.content) : '';
    
    postCard.innerHTML = `
        <div class="post-header">
            <span class="post-category">${capitalizeFirst(post.category)}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-preview">${contentPreview}</p>
        <div class="post-meta">
            <span class="post-date">
                <i class="fas fa-calendar-alt"></i>
                ${formatDate(post.date)}
            </span>
            <span class="post-action">
                <i class="fas fa-arrow-right"></i>
                Read more
            </span>
        </div>
    `;
    
    // Add click event to show full post in modal
    postCard.addEventListener('click', function() {
        showFullPost(post);
    });
    
    return postCard;
}

// Show full post in modal
function showFullPost(post) {
    const modalContent = document.getElementById('modal-post-content');
    modalContent.innerHTML = `
        <div class="modal-post-title">${post.title}</div>
        <div class="modal-post-meta">
            <span class="post-category">${capitalizeFirst(post.category)}</span>
            <span class="post-date">
                <i class="fas fa-calendar-alt"></i>
                ${formatDate(post.date)}
            </span>
        </div>
        <div class="modal-post-content-text">
            ${post.content || 'Full content coming soon...'}
        </div>
    `;
    
    modal.style.display = "block";
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Search functionality (bonus feature)
function searchPosts(query) {
    const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase())
    );
    return searchResults;
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + hash) {
            link.classList.add('active');
        }
    });
});

// Add loading state management
function showLoading(container) {
    container.innerHTML = '<div class="loading">Loading posts...</div>';
}

// Add error handling
function showError(container, message) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Oops! Something went wrong</h3>
            <p>${message}</p>
        </div>
    `;
}

// Performance optimization: Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}