# 🎓 Learning Management System (LMS)

A full-featured **Learning Management System** built using the **MERN stack**. This platform enables instructors to create and manage courses, while students can purchase, watch, and track their course progress. The app features secure authentication, role-based access, payment integration, and cloud media storage.

---

## 🔍 Features

- 🧑‍🏫 **Role-Based Access Control (RBAC)** with JWT: Instructor and Student roles
- 🔐 **Secure Authentication** using JWT and bcrypt
- 📚 **Course Management**: Instructors can create and update courses
- 💳 **Payment Integration**: Students can buy courses via **PayPal**
- 🎥 **Custom Video Player** for course playback
- 📈 **Progress Tracking**: Automatically tracks course progress and resets upon completion
- ☁️ **Cloudinary Integration**: For storing videos and thumbnails
- 📊 **Instructor Dashboard**: View a list of students who bought the course
- 🔎 **Advanced Course Search** and filtering system

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Payments**: PayPal REST API
- **Media Storage**: Cloudinary

- ## 🚀 Getting Started

- **Clone the repository:** git clone https://github.com/prajwalbayari/LMS.git
- **Navigate into the project directory:** cd LMS
- **Navigate to client folder:** cd client
- **Install dependencies:** npm install
- **Start the frontend (React) development server:** npm start
- **Navigate to server folder(In a different terminal):** cd ../server
- **Install dependencies:** npm install
- **Open a new terminal and start the backend (Node.js) server:** node index.js
