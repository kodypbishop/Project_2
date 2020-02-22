DROP DATABASE IF EXISTS roommates_db;
-- Drops the databse if it already exists 
CREATE DATABASE roommates_db; 
-- Creates the DATABASE 

--create table for roommates with a foreign id to link to stars 
CREATE TABLE roommates 
(
    id int NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(250) NOT NULL, 
    last_name VARCHAR(250) NOT NULL, 
    email VARCHAR(250) NOT NULL, 
    gender VARCHAR(20) NOT NULL CHECK (Gender IN ('Male', 'Female', 'Other', 'Prefer Not to Say')),
    stars INT NOT NULL, 
    PRIMARY KEY (id)
);

--create table for reviews with the foreign key to link to roommates 
CREATE TABLE reviews (
    id int NOT NULL AUTO_INCREMENT, 
    stars_id NOT NULL check (stars_id between 0 and 5), 
    roommates_id int NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY (roommates_id) REFERENCES roommates(id)
);