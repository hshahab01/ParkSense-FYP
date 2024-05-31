-- Tables
CREATE TABLE KioskCredentials (
    KioskID INT IDENTITY PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL
);

CREATE TABLE Kiosk (
    KioskID INT PRIMARY KEY,
    Name VARCHAR(100),
    AddressL1 VARCHAR(50),
    AddressL2 VARCHAR(50),
    PostalCode VARCHAR(10),
    City VARCHAR(50),
    Country VARCHAR(50),
    PhoneNo VARCHAR(20),
    FOREIGN KEY (KioskID) REFERENCES KioskCredentials(KioskID)
);

CREATE TABLE KioskTopups (
    TopupID INT PRIMARY KEY,
    KioskID INT,
    CarOwnerID INT,
    Amount DECIMAL(10, 2) CHECK (Amount > 0),
    TopupDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (KioskID) REFERENCES Kiosk(KioskID),
    FOREIGN KEY (CarOwnerID) REFERENCES CarOwner(ID)
);



--Stored Procedures
CREATE PROCEDURE RegisterKiosk
  @Email VARCHAR(255),
  @Password VARCHAR(100),
  @Name VARCHAR(100),
  @AddressL1 VARCHAR(50),
  @AddressL2 VARCHAR(50),
  @PostalCode VARCHAR(10),
  @City VARCHAR(50),
  @Country VARCHAR(50),
  @PhoneNo VARCHAR(20)
AS
BEGIN
  DECLARE @KioskID INT;

  -- Insert into KioskCredentials
  INSERT INTO KioskCredentials (Email, Password)
  VALUES (@Email, @Password);

  -- Get the generated KioskID
  SELECT @KioskID = SCOPE_IDENTITY();

  -- Insert into Kiosk
  INSERT INTO Kiosk (KioskID, Name, AddressL1, AddressL2, PostalCode, City, Country, PhoneNo)
  VALUES (@KioskID, @Name, @AddressL1, @AddressL2, @PostalCode, @City, @Country, @PhoneNo);
END;
