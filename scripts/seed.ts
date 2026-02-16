import { query } from "../lib/db";

async function seed() {
  console.log("Seeding database...");

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS products (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        VARCHAR(120)   NOT NULL,
        description TEXT,
        category    VARCHAR(80)    NOT NULL,
        price       DECIMAL(10, 2) NOT NULL,
        stock       INT                                            DEFAULT 0,
        image_url   VARCHAR(255),
        create_at   TIMESTAMP                                      DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP                                      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await query(createTableSql);
    console.log('Table "products" created or verified.');

    await query("TRUNCATE TABLE products");
    console.log('Table "products" truncated.');

    const insertSql = `
      INSERT INTO products (name, description, category, price, stock, image_url)
      VALUES 
       ('Ethiopian Yirgacheffe', 'Light Roast, 12oz', 'coffee', 18.50, 46, 'ethiopian.jpeg'),
       ('Ceramic Travel Mug', '16oz, Matte Black', 'merchandise', 22.00, 8, 'ceramic.jpeg'),
       ('Espresso House Blend', 'Dark Roast, 1kg', 'coffee', 32.00, 32, 'expresso.jpeg'),
       ('Chocolate Cookie', 'Creamy and fluffy', 'dessert', 2.00, 120, 'cookie.jpeg'),
       ('Colombian Supremo', 'Medium Roast, 12oz', 'coffee', 16.00, 0, 'colombian.jpeg'),
       ('Latte', 'Hot latte with creamy milk', 'coffee', 85.00, 25, 'latte.jpeg'),
       ('Cappuccino', 'Espresso with milk foam', 'coffee', 79.00, 5, 'cappuccino.jpeg'),
       ('Americano', 'Classic black coffee', 'coffee', 59.00, 0, 'americano.jpeg'),
       ('Mocha', 'Chocolate flavored coffee', 'coffee', 92.00, 12, 'mocha.jpeg'),
       ('Cheesecake', 'Creamy cheesecake slice', 'dessert', 110.00, 8, 'cheesecake.jpeg');
    `;

    await query(insertSql);
    console.log("Data inserted successfully.");

    const createCustomersTableSql = `
    CREATE TABLE IF NOT EXISTS customers (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        first_name   VARCHAR(100) NOT NULL,
        last_name    VARCHAR(100) NOT NULL,
        email        VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(50),
        notes        TEXT,
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;

    await query(createCustomersTableSql);
    console.log('Table "customers" created or verified.');

    await query("TRUNCATE TABLE customers");
    console.log('Table "customers" truncated.');

    const insertCustomersSql = `
    INSERT INTO customers (first_name, last_name, email, phone_number, notes)
    VALUES 
        ('Jane', 'Cooper', 'jane.cooper@example.com', '+1 (555) 012-3456', 'Cliente frecuente. Visita mucho desde León, Guanajuato.'),
        ('Cody', 'Fisher', 'cody.fisher@example.com', '+1 (555) 058-2941', 'Prefiere café de tueste oscuro.'),
        ('Esther', 'Howard', 'esther.howard@example.com', '+1 (555) 091-2401', NULL),
        ('Jenny', 'Doe', 'jenny.doe@example.com', '+1 (555) 123-9988', 'Favorite drink: Caramel Macchiato'),
        ('Cameron', 'Williamson', 'cameron.w@example.com', '+1 (555) 678-1234', NULL);
    `;

    await query(insertCustomersSql);
    console.log("Customers data inserted successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
}

seed();
