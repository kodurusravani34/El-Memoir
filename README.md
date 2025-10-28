# El-Memoir 📝

A clean, minimalist personal blog with a Quora-inspired design. Built with vanilla HTML, CSS, and JavaScript, featuring a dark/light theme toggle and dynamic content management.

![Blog Preview](https://via.placeholder.com/800x400/000000/FFFFFF?text=El-Memoir+Blog)

## ✨ Features

- **🎨 Quora-inspired UI** - Clean, content-focused design
- **🌓 Dark/Light Theme** - Toggle between black and white themes
- **📱 Fully Responsive** - Works beautifully on all devices
- **⚡ Fast & Lightweight** - Pure vanilla JavaScript, no frameworks
- **🏷️ Category Filtering** - Organize posts by Frontend, Backend, Mobile, DevOps, Personal
- **📖 Modal Reading** - Full-screen post reading experience
- **🔍 Search Functionality** - Find posts by title, content, or category
- **💾 Dynamic Content** - Add posts via admin panel or API
- **🎯 SEO Friendly** - Clean URLs and semantic HTML

## 🚀 Live Demo

Visit the live blog: [https://kodurusravani34.github.io/El-Memoir/](https://kodurusravani34.github.io/El-Memoir/)

## 📂 Project Structure

```
El-memoir/
├── 📄 index.html          # Main blog page
├── 🎨 styles.css          # Styling with theme support
├── ⚡ script.js           # Blog functionality
├── 👩‍💼 admin.html          # Admin panel for adding posts
├── 📋 README.md           # Project documentation
├── 🚫 .gitignore          # Git ignore rules
└── 📁 backend/           # Node.js API (optional)
    ├── 🗄️ server.js         # Express server
    ├── 💾 localStorage.js   # File-based storage fallback
    ├── 📦 package.json     # Dependencies
    └── 📖 README.md        # Backend setup guide
```

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icons
- **CSS Grid & Flexbox** - Responsive layouts

### Backend (Optional)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with local JSON fallback)
- **Mongoose** - MongoDB ODM

## 🏃‍♂️ Quick Start

### Static Version (GitHub Pages)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kodurusravani34/El-Memoir.git
   cd El-Memoir
   ```

2. **Open in browser:**
   ```bash
   # Open index.html in your browser
   # Or use a local server:
   npx http-server
   ```

3. **Add posts manually:**
   - Edit the `blogPosts` array in `script.js`
   - Or use the admin panel locally

### Dynamic Version (With Backend)

1. **Setup backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your MongoDB URI
   npm run dev
   ```

2. **Configure frontend:**
   - Update `API_BASE_URL` in `script.js` if needed
   - Backend runs on `http://localhost:3000` by default

3. **Use admin panel:**
   - Open `admin.html` in browser
   - Add posts dynamically through the interface

## 📝 Adding Posts

### Method 1: Admin Panel (Recommended)
1. Open `admin.html` in your browser
2. Fill out the post form:
   - **Title** - Your post title
   - **Category** - Choose from: Frontend, Backend, Mobile, DevOps, Personal
   - **Content** - Full post content (supports HTML)
3. Click "Create Post"

### Method 2: Manual (Static version)
Edit the `blogPosts` array in `script.js`:

```javascript
const blogPosts = [
    {
        _id: "unique-id",
        title: "Your Post Title",
        category: "frontend", // or backend, mobile, devops, personal
        date: "2025-10-03",
        content: "Your full post content here..."
    },
    // ... more posts
];
```

## 🎨 Customization

### Themes
The blog supports automatic dark/light theme switching:
- **Light Theme** - Black text on white background
- **Dark Theme** - White text on black background
- Users can toggle using the theme button in navigation

### Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --bg-color: #ffffff;
    --text-color: #000000;
    --secondary-bg: #f0f0f0;
    --border-color: #cccccc;
    --accent-color: #000000;
}
```

### Categories
Add new categories by:
1. Adding to the category buttons in `index.html`
2. Updating the enum in `backend/server.js` (if using backend)

## 🚀 Deployment

### GitHub Pages (Static)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: Deploy from branch → main
4. Your blog will be live at: `https://yourusername.github.io/El-Memoir/`

### Backend Deployment
Deploy to platforms like:
- **Railway** - [railway.app](https://railway.app)
- **Render** - [render.com](https://render.com)
- **Vercel** - [vercel.com](https://vercel.com)
- **Heroku** - [heroku.com](https://heroku.com)

## 📱 Responsive Design

The blog is fully responsive with breakpoints:
- **Desktop** - Full layout with sidebar navigation
- **Tablet** - Adapted grid layouts
- **Mobile** - Stacked single-column layout

## 🔧 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👩‍💻 Author

**Sravani**
- GitHub: [@kodurusravani34](https://github.com/kodurusravani34)
- Blog: [El-Memoir](https://kodurusravani34.github.io/El-Memoir/)



⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Sravani
