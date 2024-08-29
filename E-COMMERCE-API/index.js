import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter  from "./routes/user.js";
import authRouter from "./routes/auth.js"; 
import productRouter from "./routes/product.js"; 
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import stripeRouter from "./routes/stripe.js";
import cors from "cors";

const app = express();
const port = 5000;

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connection Successfull!"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api/user", UserRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/checkout", stripeRouter);

app.listen(process.env.PORT || port, () => {
    console.log(` Backend Server running at port ${port}`);
});