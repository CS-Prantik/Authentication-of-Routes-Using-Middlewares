# Authentication-of-Routes-Using-Middlewares

An Express.js / Node.js project demonstrating how to protect routes using middlewares (authentication / authorization).

## 📁 Project Structure


## ✅ What it does

- Implements route protection using middleware: only authenticated (and possibly authorized) users can access certain endpoints.  
- Provides a simple auth flow (login / token or session-based) and restricts access to protected routes.  
- Separates concerns by keeping auth logic in middleware, models in `Models/`, and routes in `Routes/`, which helps scalability and maintainability.  

> In Express (or any similar framework), middleware acts as a “gatekeeper” — intercepting incoming requests, verifying authentication/authorization, then either allowing access or rejecting the request. :contentReference[oaicite:0]{index=0}

## 🛠️ Setup & Usage

```bash
# Clone the repo
git clone https://github.com/CS-Prantik/Authentication-of-Routes-Using-Middlewares.git
cd Authentication-of-Routes-Using-Middlewares

# Install dependencies
npm install

# Create a `.env` file with necessary configuration (e.g. DB URL, JWT_SECRET, etc.)

# Run the server
node Server.js
