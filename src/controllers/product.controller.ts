import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../models/product.model";
import { SqlProductModel } from "../sql-models/product.sql-model";
import { MongoProductService } from "../mongo-models/product/product.service";

// Simple validation helper
function validateProductInput(
  body: any,
  {
    validationType = "sql",
  }: {
    validationType: "sql" | "mongo";
  }
) {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return "Name is required";
  }
  if (typeof body.price !== "number" || body.price < 0) {
    return "Price must be a non-negative number";
  }
  if (typeof body.categoryId !== "string" && validationType === "mongo") {
    return "categoryId must be a string";
  }
  if (typeof body.categoryId !== "number" && validationType === "sql") {
    return "categoryId must be a number";
  }
  return null;
}

export const getAllProducts = async (req: Request, res: Response) => {
  // const products = await SqlProductModel.getAll();
  const products = await MongoProductService.getAll();

  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await MongoProductService.getById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.json(product);
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateProductInput(req.body, {
    validationType: "mongo",
  });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const product = await MongoProductService.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const product = await MongoProductService.getById(id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const error = validateProductInput(
    { ...product, ...req.body },
    {
      validationType: "mongo",
    }
  );
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const updated = await MongoProductService.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const deleted = await MongoProductService.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(204).send();
};
