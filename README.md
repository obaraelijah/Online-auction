# Online Auction Platform

> The main purpose our website is, to give a virtual platform to the sellers who are interested to put their product for online selling via Bidding. And the bidders who are interested to buy and bid for the rare and best products.
![Screenshot from 2023-06-08 12-50-00](https://github.com/obaraelijah/Online-auction/assets/107021904/e40dd87c-f5f7-42d0-9ea4-60e403acfc18)

## Technologies
- Frontend - Bootstrap 5 & React.js 
- Backend - Node js & Express
- NOSQL Database
### PROJECT SETUP
The application includes two modules (client and server). For local developement, run npm install in client and server both directory which will install all dependencies accordingly. Before running this command please make sure your environment variables are setup accordingly.

#### What you need to run this code
1. Node JS
2. NPM  or Yarn 
3. MongoDB 
4. Cloudinary account to store images.
####  How to run this code
1. Make sure MongoDB is running on your system. 
2. Clone this repository.
3. Update .env with your MongoDB URI and Secret Key , Cloudinary api Key.
4. Open command line in the cloned folder,
   - To install dependencies, run   npm install    , for client and server both directories.
   - To run the application , run   npm start   for  server side.
   - And run   npm start   , for client side.
5. Open [localhost:3000](http://localhost:3000/) in the browser.

### Env Variables

Inside .env file

```
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'

CLOUDINARY_NAME= your API name
CLOUDINARY_API_KEY=  your API key
CLOUDINARY_API_SECRET= your API secret key
```
### Install Dependencies (frontend & backend)
```
# Open  client || cd client
npm install
# Open  Server || cd server
npm install
```
### Run
```
# Run Client
npm start

# Run Server
npm start
```
