[![Bond Bike Rental](https://i.postimg.cc/BZBWnv0D/Untitled-design.png)](https://postimg.cc/jC238tCd)
<h1 align="center">
  Bond Bike Rental 🚀
</h1>
<p align="center">
  Bondon Datta
</p>

## ⚡Server Live Link

    https://bond-bike-rental-backend.vercel.app
    
## 🛠️ Technology Used

- **Backend Development:**
  - Node.js
  - Express.js
  - Mongoose
  - TypeScript

---

## ♨️ ER Diagram
  ### ⚡Models
  [![Bond-bike-rental.png](https://i.postimg.cc/L6JZKDh0/Bond-bike-rental.png)](https://postimg.cc/BXGv2xTx)
  ---
  ### ⚡Models with routes and inputs
  [![Bond-bike-rental-6.png](https://i.postimg.cc/j5RJprJz/Bond-bike-rental-6.png)](https://postimg.cc/zLPBh67B)
  ---

## 💻 Prerequisites For installation

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later) or yarn
- MongoDB (locally installed or access to a MongoDB Atlas cluster)
---
## ⚡Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bandhandut19/bond-bike-rental-backend.git
   cd your-repo-name
2. **Install dependencies:**
   ```bash
   npm install
3. **Set up environment variables:**
   
    Create a .env file in the root directory of your project and add the following environment variables.
      ```plaintext
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    NODE_ENV= production / development
    JWT_ACCESS_SECRET=your_secret_key
    JWT_REFRESH_SECRET=your_secret_key
    JWT_ACCESS_EXPIRES_IN=your_secret_key
    JWT_REFRESH_EXPIRES_IN=your_secret_key
    STORE_ID = "YOUR_AMARPAY_STORE_ID"
    SIGNATURE_KEY ="YOUR_AMARPAY_SIGNATURE_KEY"
    PAYMENT_URL = "YOUR_AMARPAY_PAYMENT_URL"
    PAYMENT_VERIFY_URL = "YOUR_AMARPAY_PAYMENT_VERIFY_URL"


    ADMIN_NAME="YourName"
    ADMIN_EMAIL= "YourEmail"
    ADMIN_ADDRESS= "YourAddress"
    ADMIN_PHONE= "YourPhone"
    ADMIN_ROLE= "admin"
    ADMIN_PASSWORD= "YourPassword"
    
---
## 🖥️Running the Application
  1. **Compile TypeScript to JavaScript:**
      ```bash
      npx tsc
  2. **Start the MongoDB server:**

     Ensure your MongoDB server is running. If you're using a local MongoDB server, you can start it with:
      ```bash
      mongod
  3. **Run the application:**
      1. After running the application it will automaticaly add an admin in your database.
      2. After 1st run you can comment out seedAdmin() function in server.ts file.
      ```bash
      npm start
  4. **Access the application:**
      Open your browser and navigate to http://localhost:5000.

---
## 🤝Contributing
To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-branch-name
3. Make your changes and commit them: git commit -m 'Add some feature'
4. Push to the original branch: git push origin feature-branch-name
5. Create the pull request.


     
       
