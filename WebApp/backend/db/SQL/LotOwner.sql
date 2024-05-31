insert into Credentials values ('adil@gmail.com','abc123','admin')
select * from Credentials
select * from LotOwner

CREATE TABLE LotOwner (
    ID INT IDENTITY PRIMARY KEY,
    Email VARCHAR(255) UNIQUE FOREIGN KEY REFERENCES CREDENTIALS (Email),
    PhoneNo VARCHAR(20) NOT NULL,
    Name VARCHAR(MAX) NOT NULL
);
drop table LotOwner
drop database ParkSense


-- REGISTER Lot Owner
go
create proc registerLotOwner
@role varchar(20),
@email varchar(255),
@phoneNo varchar(20),
@name varchar(MAX),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into LotOwner (Email,PhoneNo,Name) values (@email, @phoneNo, @name)
end
go
drop proc registerLotOwner
