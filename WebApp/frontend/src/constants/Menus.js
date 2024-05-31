export const genderArr = ["Male", "Female", "Prefer Not Say"];
export const years = Array.from(
  { length: new Date().getFullYear() - 1900 },
  (_, i) => new Date().getFullYear() - i
);
export const minAvatarLimit = 1;
export const maxAvatarLimit = 8;

export const colors = [
  "White",
  "Silver",
  "Grey",
  "Black",
  "Red",
  "Blue",
  "Green",
  "Yellow",
];

export const types = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Motorbike",
  "Convertible",
  "Others",
];

export const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Others"];
// export const fieldNames = [
//   "title",
//   "salary",
//   "experience",
//   "location",
//   "jobDesc",
//   "currency",
//   "employmentType",
//   "qualifications",
// ];
// export const appFieldNames = ["firstName", "lastName", "email", "phoneNo"];
// export const empFieldNames = ["companyName", "email", "phoneNo", "website"];
