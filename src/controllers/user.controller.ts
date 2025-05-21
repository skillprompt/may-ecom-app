import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";

function validateUserInput(body: any) {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return "Name is required";
  }
  if (typeof body.email !== "string" || !body.email.trim()) {
    return "Email is required";
  }
  return null;
}

export const getAllUsers = (req: Request, res: Response) => {
  res.json(UserModel.getAll());
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = UserModel.getById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const error = validateUserInput(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const user = UserModel.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const user = UserModel.getById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const error = validateUserInput({ ...user, ...req.body });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const updated = UserModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const deleted = UserModel.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "User not found" });

    return;
  }
  res.status(204).send();
};
