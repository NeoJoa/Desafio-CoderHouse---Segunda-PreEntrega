import { Router } from "express";
import ProductManager from "../dao/dbManager/ProductsManager.js";
import CartsManager from "../dao/dbManager/CartsManager.js";

const router = Router();
const pm = new ProductManager();
const cm = new CartsManager();

router.get("/chat", async (req, res) => {
  res.render("chat", {});
});

router.get("/products?", async (req, res) => {
  const { query, limit, page, sort } = req.query;
  const response = await pm.getProducts(query, limit, page, sort);
  console.log(response);
  let {
    payload,
    hasNextPage,
    hasPrevPage,
    nextLink,
    prevLink,
    page: resPage,
  } = response;
  if (hasNextPage)
    nextLink = `http://localhost:8080/products/?${
      query ? "query=" + query + "&" : ""
    }${"limit=" + limit}${"&page=" + (+resPage + 1)}${
      sort ? "&sort=" + sort : ""
    }`;
  if (hasPrevPage)
    prevLink = `http://localhost:8080/products/?${
      query ? "query=" + query + "&" : ""
    }${"limit=" + limit}${"&page=" + (+resPage - 1)}${
      sort ? "&sort=" + sort : ""
    }`;
  res.render("products", {
    payload,
    hasNextPage,
    hasPrevPage,
    nextLink,
    prevLink,
    resPage,
  });
});

router.get("/carts/:cid", async (req, res) => {
  const id = req.params.cid;
  const cart = await cm.getCartById(id);
  console.log(cart);
  !cart.error ? res.render("cart", { cart }) : res.render("404", {});
});

export default router;
