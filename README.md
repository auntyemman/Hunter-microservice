# Hunter(Microservice) Real Estate Application

## Overview
Hunter is a real estate web application designed to bridge the gap between landlords/agents and house hunters. The application facilitates communication between landlords/agents and potential tenants or buyers, providing a platform for listing and finding properties for rent or sale. Beyond traditional house rentals, Hunter also encompasses listings for house or land sales, offering a comprehensive solution for both tenants and property owners.

## Features
- **User Authentication:** Secure user authentication using JWT tokens and password hashing.
- **Property Listings:** Allow landlords and agents to list properties for rent or sale.
- **Search Functionality:** Enable users to search for properties based on various criteria such as location, price, size, etc.
- **Communication Channels:** Provide communication channels for direct interaction between landlords/agents and potential tenants or buyers.
- **Email Verification:** Implement email verification for user registration to ensure authenticity.
- **Role-based Access Control:** Differentiate between landlords/agents and house hunters, providing tailored experiences for each user type.

## Tech Stack
- **Backend:** Node.js, Express.js,
- **Mesaage Broker:** RabbitMQ, RPC
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Argon2 for password hashing
- **Validation:** Class-validator for input validation
- **ORM:** Mongoose for MongoDB object modeling
- **Email Service:** Nodemailer for sending email notifications
- **Security:** Helmet for HTTP header security, CORS for cross-origin resource sharing

## Getting Started
1. **Clone the repository:**
git clone https://github.com/auntyemman/hunter-microservice.git

2. **Install dependencies:**
cd hunter
npm install or yarn install

3. **Set up environment variables:**
- Create a `.env` file in the root directory.
- Define the following variables in the `.env` file:
  ```
  PORT=2024
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  FRONTEND_BASE_URL=http://localhost:your_frontend_port
  ```

4. **Start the development server:**
npm run dev or yarn dev

5. **Access the application:**
- Open a web browser and navigate to `http://localhost:2024` to access the application.

## License
This project is licensed under the [MIT License](LICENSE).

## Contributions
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request

## Authors
- [Adedayo Adepoju](https://github.com/auntyemman) - Github
- [Adedayo Adepoju](www.linkedin.com/in/adedayo-adepoju) - LinkedIn