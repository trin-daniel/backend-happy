CREATE TABLE IF NOT EXISTS orphanages(
id VARCHAR(36) PRIMARY KEY NOT NULL, 
name VARCHAR(100) NOT NULL,  
latitude DECIMAL(10,8) NOT NULL, 
longitude DECIMAL(11,8) NOT NULL, 
about TEXT NOT NULL, 
instructions TEXT NOT NULL, 
opening_hours BIGINT NOT NULL, 
closing_time BIGINT NOT NULL, 
open_on_weekends TINYINT NOT NULL
);