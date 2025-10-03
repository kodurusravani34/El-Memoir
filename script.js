// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to manage state and side effects in functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
        category: "frontend",
        date: "2025-09-28",
        readTime: "8 min read",
        content: "React Hooks revolutionized how we write React components..."
    },
    {
        id: 2,
        title: "Building RESTful APIs with Node.js",
        excerpt: "A complete guide to creating robust and scalable REST APIs using Node.js, Express, and MongoDB. Learn best practices and security considerations.",
        category: "backend",
        date: "2025-09-25",
        readTime: "12 min read",
        content: "Building a RESTful API is a fundamental skill for backend developers..."
    },
    {
        id: 3,
        title: "My Journey into Web Development",
        excerpt: "Sharing my personal story of how I transitioned from a different field into web development, the challenges I faced, and lessons learned along the way.",
        category: "personal",
        date: "2025-09-22",
        readTime: "6 min read",
        content: "Three years ago, I never imagined I would be writing code..."
    },
    {
        id: 4,
        title: "CSS Grid vs Flexbox: When to Use What",
        excerpt: "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each layout method for optimal results.",
        category: "frontend",
        date: "2025-09-20",
        readTime: "10 min read",
        content: "CSS Grid and Flexbox are both powerful layout systems..."
    },
    {
        id: 5,
        title: "Docker for Beginners",
        excerpt: "Learn the basics of containerization with Docker. This tutorial covers everything from installation to deploying your first containerized application.",
        category: "devops",
        date: "2025-09-18",
        readTime: "15 min read",
        content: "Docker has revolutionized how we deploy and manage applications..."
    },
    {
        id: 6,
        title: "Flutter vs React Native: A Comparison",
        excerpt: "An in-depth comparison of two popular cross-platform mobile development frameworks, helping you choose the right one for your next project.",
        category: "mobile",
        date: "2025-09-15",
        readTime: "11 min read",
        content: "Choosing the right framework for mobile development can be challenging..."
    },
    {
        id: 7,
        title: "Advanced JavaScript Concepts",
        excerpt: "Dive deep into closures, prototypes, async/await, and other advanced JavaScript concepts that every developer should understand.",
        category: "frontend",
        date: "2025-09-12",
        readTime: "14 min read",
        content: "JavaScript is a powerful language with many advanced features..."
    },
    {
        id: 8,
        title: "Database Design Best Practices",
        excerpt: "Essential principles for designing efficient and scalable databases. Learn about normalization, indexing, and performance optimization.",
        category: "backend",
        date: "2025-09-10",
        readTime: "9 min read",
        content: "Good database design is crucial for application performance..."
    },
    {
        id: 9,
        title: "Work-Life Balance in Tech",
        excerpt: "Reflections on maintaining a healthy work-life balance while working in the fast-paced tech industry. Tips and strategies that actually work.",
        category: "personal",
        date: "2025-09-08",
        readTime: "7 min read",
        content: "The tech industry is known for its demanding pace..."
    },
    {
        id: 10,
        title: "Implementing CI/CD with GitHub Actions",
        excerpt: "Step-by-step guide to setting up continuous integration and deployment pipelines using GitHub Actions for your projects.",
        category: "devops",
        date: "2025-09-05",
        readTime: "13 min read",
        content: "Continuous Integration and Deployment are essential practices..."
    }
];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const themeToggle = document.getElementById('theme-toggle');
const categoryButtons = document.querySelectorAll('.category-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupNavigation();
    setupThemeToggle();
    setupCategoryFilters();
    loadPosts();
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
    if (sectionId === 'posts') {
        loadAllPosts();
    } else if (sectionId === 'explore') {
        loadExplorePosts('all');
    } else if (sectionId === 'home') {
        loadFeaturedPosts();
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
    loadAllPosts();
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

function loadAllPosts() {
    const allPostsGrid = document.getElementById('all-posts-grid');
    
    allPostsGrid.innerHTML = '';
    blogPosts.forEach(post => {
        const postElement = createPostCard(post);
        allPostsGrid.appendChild(postElement);
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
    postCard.innerHTML = `
        <span class="post-category">${capitalizeFirst(post.category)}</span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-meta">
            <span class="post-date">
                <i class="fas fa-calendar-alt"></i>
                ${formatDate(post.date)}
            </span>
            <span class="read-time">
                <i class="fas fa-clock"></i>
                ${post.readTime}
            </span>
        </div>
    `;
    
    // Add click event to show post details (you can expand this to show full post)
    postCard.addEventListener('click', function() {
        showPostDetail(post);
    });
    
    return postCard;
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showPostDetail(post) {
    // Simple modal/alert for now - you can enhance this to show a proper modal
    alert(`Post: ${post.title}\n\nCategory: ${capitalizeFirst(post.category)}\nDate: ${formatDate(post.date)}\nRead Time: ${post.readTime}\n\nExcerpt: ${post.excerpt}\n\nClick OK to continue reading...`);
}

// Search functionality (bonus feature)
function searchPosts(query) {
    const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
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