import { Request, Response, NextFunction } from "express";
import { OrderModel } from "../models/order.model";
import { UserModel } from "../models/user.model";
import { ProductModel } from "../models/product.model";

function validateOrderInput(body: any) {
  if (typeof body.userId !== "number") {
    return "userId must be a number";
  }
  if (!Array.isArray(body.productIds) || body.productIds.length === 0) {
    return "productIds must be a non-empty array";
  }
  // Check if user exists
  if (!UserModel.getById(body.userId)) {
    return "User does not exist";
  }
  // Check if all products exist
  for (const pid of body.productIds) {
    if (!ProductModel.getById(pid)) {
      return `Product with id ${pid} does not exist`;
    }
  }
  return null;
}

export const getAllOrders = (req: Request, res: Response) => {
  res.json(OrderModel.getAll());
};

export const getOrderById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const order = OrderModel.getById(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.json(order);
};

export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateOrderInput(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const order = OrderModel.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const order = OrderModel.getById(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  const error = validateOrderInput({ ...order, ...req.body });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const updated = OrderModel.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const deleted = OrderModel.delete(id);
  if (!deleted) {
    res.status(404).json({ message: "Order not found" });
    return;
  }
  res.status(204).send();
};
