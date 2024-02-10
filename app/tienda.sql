DROP DATABASE IF EXISTS tienda;
CREATE DATABASE tienda;
USE tienda;

CREATE TABLE categorias (
    id smallint unsigned PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(30) NOT NULL,
    descripcion varchar(255)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE productos (
    id smallint unsigned PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    marca varchar(50),
    weigth varchar(10),
    amount smallint unsigned NOT NULL,
    id_categoria smallint unsigned,
    imagen varchar(200),
    CONSTRAINT producto_fk FOREIGN KEY (id_categoria) REFERENCES categorias (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE productos (
    id smallint unsigned PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    marca varchar(50),
    weigth varchar(10),
    amount smallint unsigned NOT NULL,
    units smallint unsigned NOT NULL,
    sale_price numeric(5,2) unsigned NOT NULL,
    caducity_date date,
    categoria smallint unsigned,
    imagen varchar(200),
    CONSTRAINT producto_fk FOREIGN KEY (id_categoria) REFERENCES categorias (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE unidades (
    units_id smallint unsigned PRIMARY KEY AUTO_INCREMENT,
    package_id smallint unsigned,
    prod_id smallint unsigned NOT NULL,
    sale_price numeric(5,2) unsigned NOT NULL,
    caducity_date date,
    CONSTRAINT units_fk1 FOREIGN KEY (packages_id) REFERENCES paquetes (packages_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT units_fk2 FOREIGN KEY (prod_id) REFERENCES productos (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE paquetes (
    package_id smallint unsigned PRIMARY KEY AUTO_INCREMENT,
    prod_id smallint unsigned NOT NULL,
    units smallint unsigned NOT NULL,
    CONSTRAINT package_fk FOREIGN KEY (prod_id) REFERENCES productos (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE sales (
    id integer PRIMARY KEY AUTO_INCREMENT,
    prod_id smallint,
    amount smallint,
    sale_price numeric(5,2) unsigned NOT NULL,
    sale_date date
)

CREATE TABLE purchases (
    id integer PRIMARY KEY AUTO_INCREMENT,
    prod_id smallint,
    amount smallint,
    purchase_price numeric(6,2) unsigned NOT NULL,
    purchase_date date
)

CREATE TABLE bakery {
    id,
    name,
    brand,
    amount,
    prod_date,
    caducity_date,
    price,
    weigth,
    image
}
-- inserts

INSERT INTO categorias (id, nombre, descripcion) VALUES 
(1, 'Lácteos', 'Productos que contienen leche'),
(2, 'Embutidos', 'contienen carnes'),
(3, 'Bebidas', 'refrescos, gaseosas, agua mineral'),
(4, 'Aseo', 'shampoo, jabón, PH, ...'),
(5, 'Golosinas', 'caramelos, chocolates, galletas, ...');

INSERT INTO productos (id, nombre, marca, peso, cantidad, precio, id_categoria, imagen) VALUES 
(1, 'Tarro de leche', 'Gloria', '450 ml', 80, 4.20, 1, 'assets/img1.jpg'),
(2, 'Tarro de leche', 'Pura Vida', '450 ml', 50, 4.50, 1, 'assets/img1.jpg'),
(3, 'Tarro de leche condensada', 'Nestlé', '450 ml', 80, 4.20, 1, 'assets/img1.jpg'),
(4, 'Sublime chocolate', 'Nestlé', '100 gr', 20, 1.50, 5, 'assets/img1.jpg'),
(5, 'Triángulo Donofrio', 'Nestlé', '150 gr', 30, 2.00, 5, 'assets/img1.jpg'),
(6, 'Shampoo H&S', 'Head & Shoulders', '500 ml', 70, 1.00, 4, 'assets/img1.jpg'),
(7, 'Papel higiénico', 'Ideal', '150 gr', 100, 1.20, 4, 'assets/img1.jpg'),
(8, 'Hot dog', 'La Granjita', '450 gr', 30, 2.50, 2, 'assets/img1.jpg'),
(9, 'Jamón', 'La Granjita', '400 gr', 30, 2.00, 2, 'assets/img1.jpg'),
(10, 'Gaseosa negra', 'Coca Cola', '1 L', 10, 7.50, 3, 'assets/img1.jpg');

