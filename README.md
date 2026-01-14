# 🎬 Movies App

Movies App is a **React-based movie browsing application** that allows users to authenticate, explore trending, popular, and original movies, search for movies, and view detailed information for each movie.  
This project demonstrates core React concepts such as routing, authentication, API integration, lifecycle methods, loaders, failure views, and responsive design.

---

## 🚀 Live Demo

🔗 **Deployed URL**:🔗 https://moviesappprem.ccbp.tech 

🔗 **GitHub Repository**: https://github.com/Elkari-PremSagar/Movies-App-Netflix-Amazon-Prime-Clone.git

---


## 🚀 Project Overview

In this project, we build a **Movies App** by applying the concepts learned in the React course.  
The application fetches movie data from APIs, manages authentication using JWT tokens, and provides a Netflix-like user experience.

This is an **individual assessment project** and all work is implemented independently.

---

## 🎯 Features

### 🔐 Authentication (Login Route)
- Displays error message for invalid credentials
- Navigates to Home Route on successful login
- Protects Home, Popular, Search, Account, and Movie Details routes
- Redirects authenticated users away from Login Route

### 🏠 Home Route
- Fetches **Trending Now** and **Originals** movies
- Displays a random featured movie from Originals
- Shows movie sliders using React Slick
- Displays loader while fetching data
- Shows failure view with Retry option
- Navigates to Movie Details on movie click

### ⭐ Popular Route
- Fetches popular movies
- Displays loader and failure views
- Navigates to Movie Details on movie click

### 🎥 Movie Item Details Route
- Displays detailed movie information
- Converts runtime from minutes to hours & minutes
- Shows censor rating (A / U-A)
- Displays similar movies
- Retry option on failure

### 🔍 Search Route
- Searches movies using search input
- Displays results dynamically
- Shows “No Movies” view for empty results
- Supports retry on API failure

### 👤 Account Route
- Displays logged-in username
- Shows masked password
- Logout functionality

### 🚫 Not Found Route
- Displays Not Found page for invalid routes

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Class Components)
- **Routing:** React Router DOM
- **Authentication:** JWT Token (Cookies)
- **Carousel:** React Slick
- **Icons:** react-icons
- **Date Formatting:** date-fns
- **Styling:** CSS (Media Queries)

---

## 📂 Routes

| Path | Description |
|-----|------------|
| `/login` | Login Route |
| `/` | Home Route |
| `/popular` | Popular Movies |
| `/movies/:id` | Movie Item Details |
| `/search` | Search Movies |
| `/account` | Account Route |
| `/not-found` | Not Found |

---

## 🔑 Login Credentials (For Testing)

Use **any one** of the following credentials:

  - **username:** rahul  
    **password:** rahul@2021  

- **username:** kapil  
  **password:** moon$008  

- **username:** aakash  
  **password:** sky@007  

- **username:** harshad  
  **password:** joy@85 
  
