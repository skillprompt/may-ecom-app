// Order type definition
export interface Order {
  id: number;
  userId: number;
  productIds: number[];
  createdAt: string;
}

let orders: Order[] = [];
let nextId = 1;

export const OrderModel = {
  getAll(): Order[] {
    return orders;
  },
  getById(id: number): Order | undefined {
    return orders.find((o) => o.id === id);
  },
  create(order: Omit<Order, "id" | "createdAt">): Order {
    const newOrder = {
      ...order,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    return newOrder;
  },
  update(
    id: number,
    order: Partial<Omit<Order, "id" | "createdAt">>
  ): Order | undefined {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    orders[idx] = { ...orders[idx], ...order };
    return orders[idx];
  },
  delete(id: number): boolean {
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    orders.splice(idx, 1);
    return true;
  },
};
