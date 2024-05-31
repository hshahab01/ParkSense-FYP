CREATE TABLE CarOwner (
    ID INT IDENTITY PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Gender VARCHAR(10),
    DOB DATE NOT NULL,
    PhoneNo VARCHAR(20) NOT NULL,
    Email VARCHAR(255) UNIQUE FOREIGN KEY REFERENCES CREDENTIALS (Email),
    City VARCHAR(50),
    Country VARCHAR(50),
    Coins DECIMAL(10,2)
)

-- REGISTER CarOwner
go
create proc registerCarOwner
@role varchar(20),
@email varchar(255),
@firstName varchar(50),
@lastName varchar(50),
@gender varchar(10),
@dob date,
@phoneNo varchar(20),
@city varchar(50),
@country varchar(50),
@coins decimal(10,2),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into CarOwner (FirstName, LastName, Gender, DOB, PhoneNo, Email, City, Country ,Coins) values (@firstName, @lastName, @gender, @dob, @phoneNo, @email, @city, @country, @coins)
end
go
drop proc registerCarOwner

select * from Credentials
select * from CarOwner