USE beanywood;

INSERT INTO products (name, description, category, price, stock, image_url)
VALUES ('Ethiopian Yirgacheffe', 'Light Roast, 12oz', 'coffee', 18.50, 46, 'ethiopian.jpeg'),
       ('Ceramic Travel Mug', '16oz, Matte Black', 'merchandise', 22.00, 8, 'ceramic.jpeg'),
       ('Espresso House Blend', 'Dark Roast, 1kg', 'coffee', 32.00, 32, 'expresso.jpeg'),
       ('Chocolate Cookie', 'Creamy and fluffy', 'dessert', 2.00, 120, 'cookie.jpeg'),
       ('Colombian Supremo', 'Medium Roast, 12oz', 'coffee', 16.00, 0, 'colombian.jpeg'),
       ('Latte', 'Hot latte with creamy milk', 'coffee', 85.00, 25, 'latte.jpeg'),
       ('Cappuccino', 'Espresso with milk foam', 'coffee', 79.00, 5, 'cappuccino.jpeg'),
       ('Americano', 'Classic black coffee', 'coffee', 59.00, 0, 'americano.jpeg'),
       ('Mocha', 'Chocolate flavored coffee', 'coffee', 92.00, 12, 'mocha.jpeg'),
       ('Cheesecake', 'Creamy cheesecake slice', 'dessert', 110.00, 8, 'cheesecake.jpeg');

INSERT INTO customers (first_name, last_name, email, phone_number, notes)
VALUES ('Jane', 'Cooper', 'jane.cooper@example.com', '+1 (555) 012-3456',
        'Cliente frecuente. Visita mucho desde León, Guanajuato.'),
       ('Cody', 'Fisher', 'cody.fisher@example.com', '+1 (555) 058-2941', 'Prefiere café de tueste oscuro.'),
       ('Esther', 'Howard', 'esther.howard@example.com', '+1 (555) 091-2401', NULL),
       ('Jenny', 'Doe', 'jenny.doe@example.com', '+1 (555) 123-9988', 'Favorite drink: Caramel Macchiato'),
       ('Cameron', 'Williamson', 'cameron.w@example.com', '+1 (555) 678-1234', NULL);

