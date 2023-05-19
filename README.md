# OTP-based Login API
----------------------------------------------------------------------------------------------
This is an API for OTP-based login authentication. Users can log in to the system using their email address and a one-time password (OTP) that is sent to their email address. The API generates a new JWT token for successful logins, which can be used to authenticate subsequent requests.
# Installation
1. git clone https://github.com/Xeeshanmohammad/otp-login-api
2. Set a .env file to run the application
3. Node Version : v18.16.0
4. npm install
5. export DATABASE_URL= "mongodb://127.0.0.1:27017/otp"
6. npm start


# Dependencies
Express (web framework)
Body-parser (body parsing middleware)
Cors (CORS middleware)
Jsonwebtoken (JWT authentication)
Mongoose (database ORM)
Nodemailer (Free email service provider)


----------------------------------------------------------------------------------------------