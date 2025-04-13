-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password NOT NULL,
    is_banned INT DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT current_timestamp
);

-- leaderboard
DROP TABLE IF EXISTS leaderboard;
CREATE TABLE leaderboard(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    score INT NOT NULL,
    cheated INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- temp
INSERT INTO users (username, password)
VALUES('danbokete', 'password');

INSERT INTO leaderboard
    (user_id, score, cheated)
    VALUES (1, 321, 0);