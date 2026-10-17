# 📝 Blogify - Full-Stack Blogging Application

A modern, full-stack blogging platform built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**, styled with **Bootstrap 5**. The application supports user authentication, blog publishing with image uploads, and an interactive commenting system.

---

## 🚀 Features

- **User Authentication & Authorization**:
  - Secure account registration and login.
  - Password hashing with `bcrypt` (salted rounds).
  - Stateless authentication using JSON Web Tokens (JWT) stored in HTTP cookies.
  - Role-based user model (`USER`, `ADMIN`).
- **Blog Publishing**:
  - Create and publish blog posts with titles, rich content, and cover images.
  - File upload handling using `multer` with local disk storage in `/public/uploads`.
  - Responsive grid layout displaying all published blogs on the home page.
- **Interactive Commenting System**:
  - Authenticated users can leave comments under individual blog posts.
  - Dynamic population of author details (name and avatar) for both blogs and comments.
- **Dynamic Server-Side Rendering**:
  - Built with EJS templating and modular partials (`head`, `nav`, `scripts`).
  - Context-aware navbar dynamically toggling options based on user login state.
  - Styled with Bootstrap 5 for a clean, mobile-friendly interface.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) |
| **Backend Framework** | [Express.js](https://expressjs.com/) (v5) |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (ODM) |
| **Template Engine** | [EJS](https://ejs.co/) (Embedded JavaScript) |
| **Styling** | [Bootstrap 5](https://getbootstrap.com/) |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWT) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| **File Handling** | [multer](https://github.com/expressjs/multer) |
| **Development** | [Nodemon](https://nodemon.io/) |

---

## 📂 Project Structure

```text
Blogging App/
├── middlewares/
│   └── authentication.js       # JWT cookie authentication middleware
├── models/
│   ├── blog.js                 # Blog schema & model
│   ├── comment.js              # Comment schema & model
│   └── user.js                 # User schema, bcrypt pre-save hook, auth methods
├── public/
│   ├── images/
│   │   └── avatar.png          # Default user avatar image
│   └── uploads/                # Uploaded blog cover images
├── routes/
│   ├── blog.js                 # Blog creation, retrieval, and comment routes
│   └── user.js                 # User signup, login, and logout routes
├── services/
│   └── authentication.js       # JWT token generation and validation helpers
├── views/
│   ├── partials/
│   │   ├── head.ejs            # Head meta tags & Bootstrap stylesheet
│   │   ├── nav.ejs             # Navigation bar with dynamic auth state
│   │   └── scripts.ejs         # Bootstrap JS bundle
│   ├── addBlog.ejs             # New blog creation form
│   ├── blog.ejs                # Single blog view & comments section
│   ├── home.ejs                # Home feed displaying all blogs
│   ├── login.ejs               # User sign-in page
│   └── signup.ejs              # User registration page
├── .env                        # Environment variables (git-ignored)
├── .gitignore                  # Git ignore rules
├── app.js                      # Application entry point & configuration
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/blogify
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port number on which the Express server runs | `8000` |
| `MONGO_URL` | MongoDB connection URI | `mongodb://localhost:27017/blogify` |

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Blogging App"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/blogify
   ```

4. **Start MongoDB:**
   Ensure your local MongoDB daemon is running:
   ```bash
   mongod
   ```

5. **Run the application:**
   - **Production mode:**
     ```bash
     npm start
     ```
   - **Development mode (with auto-reload via Nodemon):**
     ```bash
     npm run dev
     ```

6. **Access the application:**
   Open your browser and navigate to:
   ```text
   http://localhost:8000
   ```

---

## 🔌 API & Route Reference

### Home Route
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/` | Renders homepage with a list of all blogs | No |

### User Routes (`/user`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/user/signup` | Renders account registration page | No |
| `POST` | `/user/signup` | Creates a new user account | No |
| `GET` | `/user/login` | Renders user login page | No |
| `POST` | `/user/login` | Validates credentials and sets JWT cookie | No |
| `GET` | `/user/logout` | Clears authentication cookie and redirects to `/` | Yes |

### Blog Routes (`/blog`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/blog/add-new` | Renders form to publish a new blog | Yes |
| `POST` | `/blog/` | Uploads cover image and creates new blog | Yes |
| `GET` | `/blog/:id` | Renders individual blog post and its comments | No |
| `POST` | `/blog/comment/:blogId` | Posts a comment to a specific blog | Yes |

---

## 🗄️ Database Models

### User (`models/user.js`)
- `fullName`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required, Hashed with bcrypt)
- `avatar`: String (Default: `/images/avatar.png`)
- `role`: String (Enum: `['USER', 'ADMIN']`, Default: `'USER'`)
- `timestamps`: Automatic `createdAt` and `updatedAt`

### Blog (`models/blog.js`)
- `title`: String (Required)
- `body`: String (Required)
- `coverImageURL`: String (Path to uploaded image)
- `createdBy`: ObjectId (Ref: `user`)
- `timestamps`: Automatic `createdAt` and `updatedAt`

### Comment (`models/comment.js`)
- `content`: String (Required)
- `blogId`: ObjectId (Ref: `blog`)
- `createdBy`: ObjectId (Ref: `user`)
- `timestamps`: Automatic `createdAt` and `updatedAt`

---

## 🛡️ Security Highlights

- **Bcrypt Hashing**: Passwords are automatically hashed prior to database persistence using a pre-save hook with salt rounds.
- **JWT Cookie Authentication**: JSON Web Tokens are passed and validated via cookies without exposing sensitive session state on the client.
- **Sanitized Uploads**: Image uploads are stored using unique timestamp-prefixed filenames via Multer disk storage.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
