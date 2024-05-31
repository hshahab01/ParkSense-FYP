class carOwner {
    constructor(
      role,
      firstName,
      lastName,
      gender,
      DOB,
      phoneNo,
      email,
      city,
      country,
      coins
    ) {
      (this.role = role),
        (this.firstName = firstName),
        (this.lastName = lastName),
        (this.gender = gender),
        (this.DOB = DOB),
        (this.phoneNo = phoneNo),
        (this.email = email),
        (this.city = city),
        (this.country = country),
        (this.coins = coins)
    }
  }
module.exports = carOwner;