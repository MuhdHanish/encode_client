# Encode Learning App - Front End

Welcome to the Encode Learning App front end repository! This is the client-side of our MERN stack application, designed to provide a seamless learning experience.

## Prerequisites

Before you start, make sure you have the following tools installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## Getting Started

1. Clone the repository:

git clone https://github.com/MuhdHanish/En-Code-Client.git


2. Navigate to the project directory:


3. Install dependencies:

npm install


4. Start the development server:

npm run dev


This will start the application in development mode. Open your browser and visit `http://localhost:5173` to see the app in action.

## Environment Variables

To run the Encode Learning App front end properly, you need to set up the following environment variables. Create a `.env` file in the root of your project and add the following:


VITE_SERVER_URL= "your server url"
VITE_GOOGLE_CLIENT="your google client id"
VITE_BUCKET_NAME="your bucket name"
VITE_REGION_NAME="your bucket region name"
VITE_BUCKET_ACCESS_KEY="your bucket access key"
VITE_BUCKET_SECRET_KEY="your bucket secret key"
VITE_PAYPAL_CLIENT_ID="your paypa client id"
VITE_BUCKET_BASE_URL="your bucket base url"


Make sure to replace the values with your actual configuration.


## Folder Structure

- `/src/` - React components, assets, styles, routes, and services.
- `/public/` - Public files (favicon, HTML template, etc.).
- `.env` - Environment variables configuration.
- `.gitignore` - Git ignore file.
- `package.json` - Node.js dependencies and scripts.
- `.tailwind.config.js` - Tailwind css configration and custom themes.  
- `README.md` - This README file.

## Contributing

We welcome contributions! If you'd like to contribute to this project, please follow our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
