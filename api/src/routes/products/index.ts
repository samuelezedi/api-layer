import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productController";
import { validateData } from "../../middleware/validationMiddleware";
import { z } from "zod";
import { createProductSchema, updateProductSchema } from "../../db/productsSchema";
import { verifyToken } from "../../middleware/authMiddleware";

const productRouter = Router();

// const createProductSchema = z.object({
//   name: z.string(),
//   price: z.number({message: "Price should be number"}),
// });


productRouter.get("/", listProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/", verifyToken, validateData(createProductSchema), createProduct);

productRouter.put("/:id", validateData(updateProductSchema), updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
