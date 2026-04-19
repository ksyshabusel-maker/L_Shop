import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.controller";
import cartRoutes from "./modules/cart/cart.controller";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

app.listen(3000, () => {
  console.log("я родилеся: 3000");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("ERROR:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
});