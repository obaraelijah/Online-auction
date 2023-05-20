import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import authenticate from "../middleware/authenticate";
import User from "../model/userSchema";

const router = express.Router();

