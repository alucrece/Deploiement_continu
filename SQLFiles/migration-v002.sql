use ynov_ci;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) Not Null,
    email VARCHAR(100) UNIQUE NOT NULL,
    birthDate DATETIME NOT NULL,
    city VARCHAR(100) NOT NULL, 
    postalCode VARCHAR(100) Not Null,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (lastName, firstName, email, birthDate, city, postalCode)
VALUES ('lea', 'mele', 'lea.mele@email.com', STR_TO_DATE('10/05/1980', '%d/%m/%Y'), 'Nice','06200');