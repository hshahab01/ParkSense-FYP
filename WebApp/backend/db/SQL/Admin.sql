insert into Credentials values ('adil@gmail.com','abc123','admin')
select * from Credentials

-- REGISTER ADMIN
go
create proc registerPSAdmin
@role varchar(20),
@firstName varchar(50),
@lastName varchar(50),
@email varchar(255),
@password varchar(MAX)
as
begin
insert into Credentials (Email,Password,UserRole) values (@email, @password, @role)
insert into Admin (FirstName,LastName,Email) values (@firstName, @lastName, @email)
end
go

exec registerPSAdmin 'admin', 'adil','rizwan','adil@.com','ac120'
drop proc registerPSAdmin
select * from Credentials
select * from Admin
