// User type definition
export interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];
let nextId = 1;

export const UserModel = {
  getAll(): User[] {
    return users;
  },
  getById(id: number): User | undefined {
    return users.find((u) => u.id === id);
  },
  create(user: Omit<User, "id">): User {
    const newUser = { ...user, id: nextId++ };
    users.push(newUser);
    return newUser;
  },
  update(id: number, user: Partial<Omit<User, "id">>): User | undefined {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    users[idx] = { ...users[idx], ...user };
    return users[idx];
  },
  delete(id: number): boolean {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  },
};
