import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../models/category.model";

function validateCategoryInput(body: any) {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return "Name is required";
  }
  return null;
}

export const getAllCategories = (req: Request, res: Response) => {
  res.json(CategoryModel.getAll());
};

export const getCategoryById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const category = CategoryModel.getById(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.json(category);
};

export const createCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateCategoryInput(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const category = CategoryModel.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const category = CategoryModel.getById(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  const error = validateCategoryInput({ ...category, ...req.body });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const updated = CategoryModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const deleted = CategoryModel.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.status(204).send();
};
