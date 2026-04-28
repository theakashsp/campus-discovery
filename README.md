# 🚀 Campus Compare – College Discovery & Decision Platform

A production-ready full-stack web application that helps students **discover, filter, and compare colleges** to make better academic decisions.

---

## 🌐 Live Demo

* Frontend: (Add Vercel URL here)
* Backend API: (Add Render URL here)

---

## 🎯 Objective

Build a **college discovery + decision platform** inspired by Careers360 and Collegedunia.

This project focuses on:

* Real-world usability
* Decision-making features
* Clean UI + full-stack architecture

---

## 🧠 Core Features

### 🔍 College Listing + Search

* View colleges in a responsive grid
* Search by college name
* Real-time filtering

### 🎯 Filters

* Filter by location
* Filter by maximum fees

### ⚖️ Compare Colleges (High Priority Feature)

* Select up to 3 colleges
* View comparison table:

| Feature     | Compared |
| ----------- | -------- |
| Fees        | ₹        |
| Rating      | ⭐        |
| Placement % | %        |
| Location    | City     |

* Highlights best values:

  * Highest rating
  * Highest placement
  * Lowest fees

### 🏫 Clean UI

* Modern responsive design
* Tailwind CSS styling
* Smooth hover animations

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Data

* JSON-based dataset (20+ colleges)

### Deployment

* Vercel
* Render

---

## 📁 Project Structure

```
campus-compare/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── styles/
│   └── utils/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── data/
│   └── index.js
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/your-username/campus-compare.git
cd campus-compare
```

---

### 2. Backend Setup

```
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

### 4. Environment Variables

Create file:

```
frontend/.env.local
```

Add:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔌 API Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | /colleges     | Get all colleges    |
| GET    | /colleges/:id | Get college details |
| GET    | /search       | Filter colleges     |

---

## 🎨 UI Highlights

* Responsive grid layout
* Smooth hover effects
* Clean comparison table
* User-friendly filtering system

---

## 🧪 Future Improvements

* 🔐 Authentication (login + saved colleges)
* 📊 Advanced recommendation system
* 📍 Map-based college search
* 🧠 AI-based college prediction

---

## 🏆 Key Learning Outcomes

* Full-stack development (frontend + backend)
* REST API design
* State management in React
* UI/UX design with Tailwind
* Debugging and deployment

---

## 👨‍💻 Author

**Akash S P**

---

## 📌 Note

This project was built as part of a **high-agency product engineering assignment**, focusing on:

* Ownership
* Problem solving
* Real-world implementation

---

⭐ If you like this project, feel free to star the repo!
