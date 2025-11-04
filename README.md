
#  💬 Real-Time Chat Application

A fully functional real-time chat application built with modern technologies on both the frontend and backend. Users can chat in real time, see who’s online, manage media uploads, and enjoy a beautiful customizable UI.

---

## 🚀 Features

- Real-time messaging via WebSockets
- JWT-based authentication with secure login/register
- Online/offline user presence tracking
- File and image upload using Multer & Cloudinary
- Light/dark and custom theme support
- Toast notifications for user feedback
- Protected routes and form validation
- State management using Zustand

---

## 🧩 Tech Stack

### 🌐 Frontend
- **React.js** – Component-based UI library
- **JavaScript (ES6+)**
- **Tailwind CSS** – Utility-first CSS
- **DaisyUI** – UI components for Tailwind
- **React Router** – Routing for SPA
- **Zustand** – Lightweight state management
- **Axios** – HTTP client for API requests
- **React Hot Toast** – Toast notifications
- **Lucide React** – Icon set for beautiful interfaces

### 🛠 Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **WebSocket (Socket.IO)** – Real-time communication
- **JWT (jsonwebtoken)** – Authentication mechanism
- **Bcrypt.js** – Password hashing
- **Multer** – File uploads handling
- **Cloudinary** – Image storage and transformation
- **Joi** – Schema validation for inputs

---


## 🧪 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/student-karan/ChatALot.git
cd ChatALot
```

### 2. Setup Environment Variables

**Create a .env file in both /client and /server directories:**

**For Backend (/BackEnd/.env)**

```bash
PORT=your_port_number
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```
### 3. Install dependencies

**Backend**

```bash
cd BackEnd
npm install
npm run dev
```

**Frontend**

```bash
cd FrontEnd
npm install
npm run start
```

## 🤝 Contributions

Contributions are welcome!
Feel free to submit issues or pull requests.

## Acknowledgements

- Special thanks to **Codesistency**.
- Inspired by modern chat applications.






