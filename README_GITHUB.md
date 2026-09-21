# OTP Checker — Email OTP Authentication

A full-stack email OTP authentication application built with **React**, **Node.js**, **Express.js**, **MongoDB Atlas**, and **Nodemailer**.

The application allows a user to enter an email address, receive a one-time password (OTP) by email, and verify the OTP through a backend API.

## Features

- Email-based OTP authentication
- Random 6-digit OTP generation
- OTP storage in MongoDB Atlas
- OTP delivery using Nodemailer and Gmail SMTP
- OTP verification through REST API endpoints
- React Router navigation for success and failure states
- Six-field OTP input with automatic focus movement
- Environment-based configuration for sensitive credentials
- Separate frontend and backend applications
- CORS-enabled frontend/backend communication

## Tech Stack

### Frontend
- React
- React Bootstrap
- Bootstrap
- React Router DOM
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB Node.js Driver
- Nodemailer
- express-async-handler
- dotenv
- CORS

### Services
- MongoDB Atlas
- Gmail SMTP

## Project Structure

```text
otpchecker/
├── BACKEND/
│   ├── API/
│   │   └── OtpChecker.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── FRONTEND/
    ├── public/
    ├── src/
    │   ├── pages/
    │   │   ├── success.jsx
    │   │   └── failure.jsx
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Application Flow

```text
User enters email
       ↓
React Frontend
       ↓
POST /otpchecker/send-otp
       ↓
Express Backend
       ↓
Generate 6-digit OTP
       ↓
Store email + OTP in MongoDB
       ↓
Nodemailer → Gmail SMTP
       ↓
OTP delivered to user's email
       ↓
User enters OTP
       ↓
POST /otpchecker/verify-otp
       ↓
MongoDB verification
       ↓
Success / Failure
```

## API Documentation

### Send OTP

**POST**

```text
http://localhost:5000/otpchecker/send-otp
```

Request body:

```json
{
  "email": "user@example.com"
}
```

Example response:

```json
{
  "success": true,
  "message": "OTP is generated successfully"
}
```

### Verify OTP

**POST**

```text
http://localhost:5000/otpchecker/verify-otp
```

Request body:

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "message": "OTP is correct"
}
```

Invalid response:

```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

## Prerequisites

Make sure the following are installed or available:

- Node.js
- npm
- MongoDB Atlas account and cluster
- MongoDB database user
- Gmail account
- Google App Password for Nodemailer

## Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd otpchecker
```

### 2. Install backend dependencies

```bash
cd BACKEND
npm install
```

### 3. Install frontend dependencies

Open a second terminal:

```bash
cd FRONTEND
npm install
```

## Environment Variables

Create a `.env` file inside the `BACKEND` folder:

```env
DATABASE_CONNNECTION_URL=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/OTP_CHECKER?appName=Cluster0
PORT=5000
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_google_app_password
```

### Security

Never commit `.env` to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

Never expose:

- MongoDB passwords
- Gmail App Passwords
- API keys
- Private connection strings
- Other sensitive environment variables

## Gmail SMTP Configuration

This project uses Nodemailer with Gmail SMTP.

```text
Host: smtp.gmail.com
Port: 587
Secure: false
```

Use a **Google App Password** for `SMTP_PASS` rather than your normal Gmail password.

## MongoDB Configuration

The application uses:

```text
Database: OTP_CHECKER
Collection: Members
```

A stored OTP record currently looks like:

```json
{
  "_id": "...",
  "email": "user@example.com",
  "otp": "123456"
}
```

## Running the Project

### Start the backend

From the `BACKEND` directory:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

### Start the frontend

From the `FRONTEND` directory:

```bash
npm start
```

Frontend:

```text
http://localhost:3000
```

Keep both servers running during development.

## How It Works

### 1. Email submission

The user enters an email address in the React application.

### 2. OTP generation

The backend generates a 6-digit OTP.

### 3. Database storage

The email and OTP are stored in MongoDB.

### 4. Email delivery

Nodemailer sends the generated OTP through Gmail SMTP.

### 5. OTP verification

The user enters the OTP and the frontend sends it to the verification endpoint.

### 6. Result

The backend checks whether the email and OTP match a stored record.

- Matching OTP → Success page
- Non-matching OTP → Failure page

## Frontend Implementation

The frontend manages:

- Email input state
- Six-digit OTP state
- OTP input focus
- Backspace navigation
- API requests with `fetch`
- Navigation with React Router

The OTP is stored as an array:

```js
["", "", "", "", "", ""]
```

After entry, it is converted into a single string:

```js
otp.join("")
```

Example:

```text
["1", "2", "3", "4", "5", "6"]
            ↓
          "123456"
```

## Backend Architecture

```text
server.js
    ↓
/otpchecker
    ↓
OtpChecker.js
    ├── POST /send-otp
    └── POST /verify-otp
```

`server.js` handles:

- Environment configuration
- Express setup
- MongoDB connection
- Middleware
- OTP router registration
- Server startup

`OtpChecker.js` handles:

- OTP generation
- OTP storage
- Email delivery
- OTP verification

## Current Limitations

This project is currently intended for learning and development.

The current implementation does not yet include:

- OTP expiration
- Verification attempt limits
- Resend cooldown
- Rate limiting
- Automatic deletion of used OTPs
- Production-grade OTP generation
- Persistent authentication sessions or JWT
- Comprehensive request validation

## Recommended Production Improvements

Before using this as a production authentication system, consider adding:

- Cryptographically secure OTP generation using Node.js `crypto`
- OTP expiration, such as a 5-minute validity period
- Automatic invalidation/deletion after successful verification
- Maximum verification attempts
- Resend cooldown and rate limiting
- Email validation and normalization
- HTTPS
- Secure session or JWT authentication
- Hashing OTPs before storing them
- Database indexing and cleanup of expired records
- Monitoring and structured error handling

## Testing Checklist

- [ ] Frontend starts on port 3000
- [ ] Backend starts on port 5000
- [ ] MongoDB Atlas connection succeeds
- [ ] Email credentials load from `.env`
- [ ] Send OTP request reaches the backend
- [ ] OTP is stored in MongoDB
- [ ] OTP email is delivered
- [ ] Correct OTP redirects to the success page
- [ ] Incorrect OTP redirects to the failure page
- [ ] `.env` is excluded from Git

## Troubleshooting

### `ERR_CONNECTION_REFUSED`

Make sure the backend is running:

```bash
npm start
```

Also verify the frontend is calling:

```text
http://localhost:5000
```

### `404 Not Found`

Check the API paths:

```text
/otpchecker/send-otp
/otpchecker/verify-otp
```

### MongoDB authentication failed

Verify:

- MongoDB database username
- MongoDB database password
- MongoDB connection string
- Network Access settings in Atlas

### Nodemailer authentication failed

Verify:

- Gmail address
- Google App Password
- SMTP host
- SMTP port
- `.env` variable names

## Future Enhancements

- OTP countdown timer
- Resend OTP button
- Maximum verification attempts
- OTP expiration
- User registration
- JWT-based authentication
- Protected routes
- Improved error handling
- Loading states
- Responsive UI
- Production deployment
- Automated testing

## Author

**Harsha Vardhan**

A full-stack learning project focused on building an email-based OTP authentication workflow with React, Node.js, Express.js, MongoDB Atlas, and Nodemailer.

## License

This project is intended for educational and development purposes.

Add an appropriate open-source license file before distributing the project publicly.
