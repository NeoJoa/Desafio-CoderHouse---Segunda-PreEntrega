import { Router } from "express";
import ProductManager from "../dao/dbManager/ProductsManager.js";

const pm = new ProductManager();
const router = Router();

router.get("/chat", async (req, res) => {
  res.render("chat", {});
});

router.get("/products?", async (req, res) => {
  const { query, limit, page, sort } = req.query;
  const response = await pm.getProducts(query, limit, page, sort);
  const payload = response.payload;
  console.log("payload =", payload);
  res.render("products", { payload });
});

router.get("/carts/:cid", async (req, res) => {
  res.render("cart", {});
});

export default router;
