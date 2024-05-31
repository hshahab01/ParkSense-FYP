SELECT TOP (1000) [Email]
      ,[Password]
      ,[UserRole]
  FROM [ParkSense].[dbo].[Credentials]
  insert into Credentials values ('abc@gmail.com','abc','Admin')


  -- LOGIN
  go
CREATE PROCEDURE loginUser
  @email varchar(255),
  @userRole varchar(15)
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @sql nvarchar(max);
	SET @sql = N'SELECT c.password, u.* FROM Credentials c INNER JOIN ' + QUOTENAME(@userRole) + N' u ON c.email = u.email WHERE c.email = @p_email AND c.userRole = @p_userRole;';

  IF EXISTS (SELECT 1 FROM Credentials WHERE email = @email AND userRole = @userRole)
  BEGIN
    EXEC sp_executesql @sql, N'@p_email varchar(255), @p_userRole varchar(15)', @p_email = @email, @p_userRole = @userRole;
  END
  ELSE
  BEGIN
    SELECT 0;
  END
END
drop proc loginUser


select * from Credentials
select * from Admin
select * from CarOwner
select * from LotOwner
UPDATE Credentials
SET UserRole = 'LOTOWNER'
WHERE UserRole = 'LOT OWNER';

exec loginUser 'adil@.com', 'Admin'