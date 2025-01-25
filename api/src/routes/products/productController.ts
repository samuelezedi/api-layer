import { Request, Response } from "express";
import db from "../../db/index.js";
import { productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      // @ts-ignore
      .where(eq(productsTable.id, req.params.id));

    if (!product) {
      res.status(400).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    
    const [product] = await db
      .update(productsTable)
      .set(req.cleanBody)
      // @ts-ignore
      .where(eq(productsTable.id, req.params.id))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const [deletedItem] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();
    if (deletedItem) {
      res.status(205).send({ message: "Product deleted" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
