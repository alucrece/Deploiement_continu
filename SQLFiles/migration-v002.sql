-- Sélection de la base de données
USE ynov_ci;

-- Suppression de la table si elle existe déjà
DROP TABLE IF EXISTS users;

-- Création de la table users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de quelques utilisateurs
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@example.com', 'hashed_password_admin', 'admin'),
('johndoe', 'johndoe@example.com', 'hashed_password_john', 'user'),
('janedoe', 'janedoe@example.com', 'hashed_password_jane', 'user');
