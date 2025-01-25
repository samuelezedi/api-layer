import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send(`products}`);
}

export function getProductById(req: Request, res: Response) {
  res.send(`A product!${req.params.id}`);
}

export function createProduct(req: Request, res: Response) {
  res.send("New products created.");
}

export function updateProduct(req: Request, res: Response) {
  res.send("products updated.");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("products deleted.");
}
