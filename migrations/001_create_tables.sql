-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    categoryId INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

-- Order_Products join table
CREATE TABLE IF NOT EXISTS order_products (
    orderId INT NOT NULL,
    productId INT NOT NULL,
    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
);