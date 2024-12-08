import { Router } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputValidation } from "./modules/middleware";
import { createProduct, deleteProduct, getProductById, getProducts } from "./handlers/product";

const router = Router();

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.put(
  "/product/:id",
  body("name").isString().isLength({ min: 5 }),
  handleInputValidation,
  (req, res) => {}
);
router.post(
  "/product",
  body("name").isString().isLength({ min: 5 }),
  handleInputValidation,
  createProduct
);
router.delete("/product/:id", deleteProduct);

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  oneOf([
    check("status").equals("IN_PROGRESS"),
    check("status").equals("SHIPPED"),
    check("status").equals("DEPRECATED"),
  ]),
  body("version").optional(),
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
);
router.delete("/update/:id", () => {});

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
