import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { z } from "zod";
import { createProductSchema, updateProductSchema } from "../../db/productsSchema.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const productRouter = Router();

// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number({message: "Price should be number"}),
// });


productRouter.get("/", listProducts);

productRouter.get("/:id", getProductById);

// @ts-ignore
productRouter.post("/", verifyToken, validateData(createProductSchema), createProduct);

productRouter.put("/:id", validateData(updateProductSchema), updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
