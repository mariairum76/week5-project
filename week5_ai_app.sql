CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM users;

CREATE TABLE code_reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    code TEXT NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM code_reviews;
SELECT * FROM code_reviews ORDER BY id DESC;
