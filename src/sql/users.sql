create table users(
    id serial primary key,
    name varchar(48),
    surname varchar(32),
    age integer,
    biography varchar,
    location varchar(255),
    gender varchar(8),
    looking_for varchar,
    email varchar(144) unique,
    password varchar(64)
);