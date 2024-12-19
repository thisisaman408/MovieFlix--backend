import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

// Add this line to debug
console.log('MongoDB URL:', process.env.MONGODB_URL);

const app = express();

// Set mongoose options
mongoose.set('strictQuery', false);

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://move-flix.vercel.app",
    "https://move-flix-git-main-thisisaman408.vercel.app",
    "https://move-flix-thisisaman408.vercel.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5001;

const server = http.createServer(app);

// Connect to MongoDB with error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Start server after DB connection
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

//test