--create database ParkSense

CREATE TABLE Credentials (
    Email VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(MAX) NOT NULL,
    UserRole VARCHAR(20) NOT NULL
);
CREATE TABLE Admin (
    Email VARCHAR(255) UNIQUE FOREIGN KEY REFERENCES CREDENTIALS (Email),
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
)

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
CREATE TABLE Car (
    RegistrationNumber VARCHAR(10) PRIMARY KEY,
    OwnerID INT FOREIGN KEY REFERENCES CarOwner(ID),
    Make VARCHAR(50) NOT NULL,
    Model VARCHAR(50),
    RegYear INT,
	Color VARCHAR(20),
    Type VARCHAR(15)
);

CREATE TABLE LotOwner (
    ID INT IDENTITY PRIMARY KEY,
    Email VARCHAR(255) UNIQUE FOREIGN KEY REFERENCES CREDENTIALS (Email),
    PhoneNo VARCHAR(20) NOT NULL,
    Name VARCHAR(MAX) NOT NULL
);

CREATE TABLE Lot (
    LotID INT IDENTITY PRIMARY KEY,
    LotOwnerID INT NOT NULL FOREIGN KEY REFERENCES LotOwner(ID),
    TotalZones INT,
    PostalCode VARCHAR(10),
    AddressL1 VARCHAR(50) NOT NULL,
    AddressL2 VARCHAR(50),
    City VARCHAR(50) NOT NULL,
    Country VARCHAR(50) NOT NULL,
);
 
 /*CREATE TABLE UserGroup (
    ID INT IDENTITY PRIMARY KEY,
    UserRole VARCHAR(50) NOT NULL,
    Permission INT,
);*/

CREATE TABLE LotZone (
    LotID INT NOT NULL,
    ZoneID INT NOT NULL,
	capacity INT NOT NULL,
	available INT,
    CONSTRAINT PK_LotZone PRIMARY KEY (LotID, ZoneID),
    CONSTRAINT FK_LotZone_Lot FOREIGN KEY (LotID) REFERENCES Lot (LotID)
);

CREATE TABLE HourlyRate (
    LotID INT NOT NULL FOREIGN KEY REFERENCES Lot(LotID),
    Hour00 DECIMAL(10,2) NOT NULL,
    Hour01 DECIMAL(10,2) NOT NULL,
    Hour02 DECIMAL(10,2) NOT NULL,
    Hour03 DECIMAL(10,2) NOT NULL,
    Hour04 DECIMAL(10,2) NOT NULL,
    Hour05 DECIMAL(10,2) NOT NULL,
    Hour06 DECIMAL(10,2) NOT NULL,
    Hour07 DECIMAL(10,2) NOT NULL,
    Hour08 DECIMAL(10,2) NOT NULL,
    Hour09 DECIMAL(10,2) NOT NULL,
    Hour10 DECIMAL(10,2) NOT NULL,
    Hour11 DECIMAL(10,2) NOT NULL,
    Hour12 DECIMAL(10,2) NOT NULL,
    Hour13 DECIMAL(10,2) NOT NULL,
    Hour14 DECIMAL(10,2) NOT NULL,
    Hour15 DECIMAL(10,2) NOT NULL,
    Hour16 DECIMAL(10,2) NOT NULL,
    Hour17 DECIMAL(10,2) NOT NULL,
    Hour18 DECIMAL(10,2) NOT NULL,
    Hour19 DECIMAL(10,2) NOT NULL,
    Hour20 DECIMAL(10,2) NOT NULL,
    Hour21 DECIMAL(10,2) NOT NULL,
    Hour22 DECIMAL(10,2) NOT NULL,
    Hour23 DECIMAL(10,2) NOT NULL
);

CREATE TABLE ParkingSession (
	CarRegNo varchar(10) NOT NULL FOREIGN KEY REFERENCES Car(RegistrationNumber),
	LotID int NOT NULL FOREIGN KEY REFERENCES Lot(LotID),
	InTime datetime NOT NULL,
	OutTime datetime,
	DayIn int NOT NULL,
	DayOut int,
	Charge Decimal (10,2),
);