# El-Memoir Blog Backend

Backend API for the El-Memoir personal blog built with Node.js, Express, and MongoDB.

## Features

- RESTful API for blog posts
- MongoDB integration with Mongoose
- CRUD operations for posts
- Category-based filtering
- Search functionality
- CORS enabled for frontend integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update MongoDB connection string if needed
   - For local MongoDB: `mongodb://localhost:27017/el-memoir`
   - For MongoDB Atlas: Get connection string from your cluster

4. Start the server:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/category/:category` - Get posts by category
- `GET /api/posts/search/:query` - Search posts

### Health Check

- `GET /api/health` - API health status

## Creating a New Post

Send a POST request to `/api/posts` with the following JSON body:

```json
{
  "title": "Your Post Title",
  "excerpt": "Brief description of the post",
  "content": "Full content of the post in HTML or Markdown",
  "category": "frontend", // frontend, backend, mobile, devops, personal
  "readTime": "5 min read"
}
```

## Categories

Available categories:
- `frontend` - Frontend development
- `backend` - Backend development
- `mobile` - Mobile app development
- `devops` - DevOps and deployment
- `personal` - Personal posts and thoughts

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. The API will connect to `mongodb://localhost:27017/el-memoir`

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env` file

## Testing the API

You can test the API using:

1. **Postman** - Import the endpoints and test
2. **curl** commands:
   ```bash
   # Get all posts
   curl http://localhost:3000/api/posts
   
   # Create a new post
   curl -X POST http://localhost:3000/api/posts \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Post",
       "excerpt": "This is a test post",
       "content": "Full content here",
       "category": "personal",
       "readTime": "2 min read"
     }'
   ```

3. **Browser** - Visit `http://localhost:3000/api/health` to check if server is running

## Integration with Frontend

The frontend is already configured to connect to this backend API. When the backend is running, the blog will automatically load posts from MongoDB instead of using sample data.

## Deployment

### Local Deployment
- Ensure MongoDB is running
- Start the server with `npm start`

### Cloud Deployment (Heroku, Railway, etc.)
- Set environment variables in your hosting platform
- Use MongoDB Atlas for the database
- Deploy the backend folder

## File Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
└── README.md         # This file
```