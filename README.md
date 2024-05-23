Bikurim Bakery Project
Project Overview
The Bikurim Bakery project is a full-stack web application designed to facilitate online product purchases with robust user authentication and data security. ensuring a secure and efficient user experience.
Client-Side
Technologies Used:
•	React: JavaScript library for building user interfaces.
•	PrimeReact: React UI components for stylish and responsive design.
•	Redux Toolkit Query: State management and data fetching.
Key Components:
•	Products: Displays a list of available products.
•	Product: Shows detailed information about a selected product.
•	Bsket/ FullBasket: Manages the user's selected products for purchase.
•	Checkout: Handles the payment process.
•	UserAuth: Manages user login and registration.
Setup Instructions:
1.	Clone the Repository:
git clone https://github.com/username/my-bakery-client.git
cd client
2.	Install Dependencies:
npm install_APP_API_URL=http://localhost:0 
3.	Start the Application:
npm start
Server-Side
Technologies Used:
•	Node.js: JavaScript runtime for server-side programming.
•	Express: Web framework for Node.js.
•	MongoDB: NoSQL database for data storage.
Key Packages:
•	express: For creating the server and handling routes.
•	dotenv: For managing environment variables.
•	cors: To handle cross-origin requests.
•	mongoose: For MongoDB object modeling.
•	bcrypt: For hashing user passwords.
•	jsonwebtoken: For secure user authentication.
•	multer: For handling file uploads.
Key Routes:
•	Authentication:
•	POST /api/auth/register: User registration.
•	POST /api/auth/login: User login.
•	Products:
•	GET /api/products: Fetch all products.
•	POST /api/products: Add a new product.
•	GET /api/products/:id: Fetch a single product by ID.
    And more routs..
Setup Instructions:
1.	Clone the Repository:
git clone https://github.com/username/my-bakery-server.git
cd my-bakery-server-server 
2.	Install Dependencies:
npm install
3.	Create .env File:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secretMONGO_URI=your_mongo_uri JWT_SECRET=your_jwt_secret 
4.	Start the Server:
Npm run dev.js 
Security Measures
•	Password Encryption: Using bcrypt to hash user passwords.
•	JWT Authentication: Using jsonwebtoken for secure user sessions.
•	Environment Variables: Using dotenv to manage sensitive information.

