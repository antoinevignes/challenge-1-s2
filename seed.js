import mongoose from "mongoose";
import productModel from "./models/product.model.js";
import userModel from "./models/user.model.js";
import dotenv from "dotenv";
import product from "./data/product.js";
import { user } from "./data/user.js";

dotenv.config();

async function insertProduct() {
  await mongoose.connect(process.env.MONGO_URL);
  await productModel.deleteMany({});
  await productModel.insertMany(product);
  console.log("Initial product inserted");
}

async function insertUser() {
  await mongoose.connect(process.env.MONGO_URL);
  await userModel.deleteMany({});
  await userModel.insertOne(user);
  console.log("Initial user inserted");
}

async function seed() {
  // await insertProduct();
  await insertUser();
  console.log("All data inserted");
  process.exit(0);
}

seed();
