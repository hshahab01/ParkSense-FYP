-- Create the audit table
CREATE TABLE Car_Audit (
    AuditID INT PRIMARY KEY identity,
    Action VARCHAR(10),
    AuditDate DATETIME,
    OwnerID INT,
    RegistrationNumber VARCHAR(10),
    Make VARCHAR(50),
    Model VARCHAR(50),
    RegYear INT,
    Color VARCHAR(20),
    Type VARCHAR(15)
);

-- Create the trigger for the DELETE operation
CREATE TRIGGER trg_Delete_Car
ON Car
FOR DELETE
AS
BEGIN
    INSERT INTO Car_Audit (Action, AuditDate, OwnerID, RegistrationNumber, Make, Model, RegYear, Color, Type)
    SELECT 'DELETE', GETDATE(), d.OwnerID, d.RegistrationNumber, d.Make, d.Model, d.RegYear, d.Color, d.Type
    FROM deleted d; 
END;

-- Create the trigger for the INSERT operation
CREATE TRIGGER trg_Insert_Car
ON Car
FOR INSERT
AS
BEGIN
    INSERT INTO Car_Audit (Action, AuditDate, OwnerID, RegistrationNumber, Make, Model, RegYear, Color, Type)
    SELECT 'INSERT', GETDATE(), i.OwnerID, i.RegistrationNumber, i.Make, i.Model, i.RegYear, i.Color, i.Type
    FROM inserted i;
END;

-- Create the trigger for the UPDATE operation
CREATE TRIGGER trg_Update_Car
ON Car
FOR UPDATE
AS
BEGIN
    INSERT INTO Car_Audit (Action, AuditDate, OwnerID, RegistrationNumber, Make, Model, RegYear, Color, Type)
    SELECT 'UPDATE', GETDATE(), i.OwnerID, i.RegistrationNumber, i.Make, i.Model, i.RegYear, i.Color, i.Type
    FROM inserted i;
END;
----------------------------------------------------------
--Trigger for Updating Lot Avg Rating
CREATE TRIGGER trg_UpdateLotAvgRating
ON ParkingSession
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT * FROM inserted WHERE Rating IS NOT NULL)
    BEGIN
        -- Update AvgRating in the Lot table
        UPDATE Lot
        SET AvgRating = (
            SELECT AVG(CAST(ps.Rating AS FLOAT))
            FROM ParkingSession ps
            WHERE ps.LotID = Lot.LotID
            AND ps.Rating IS NOT NULL
        )
        WHERE Lot.LotID IN (SELECT DISTINCT LotID FROM inserted WHERE Rating IS NOT NULL);
    END
END;

