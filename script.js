require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// A Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model named Person
const createAndSavePerson = async () => {
  const person = new Person({
    name: "Joe Wick",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });

  try {
    const data = await person.save();
    console.log("Person saved:", data);
  } catch (err) {
    console.error(err);
  }
};

createAndSavePerson();

// Create Many Records with Person.create()
const createManyPeople = async (peopleArray) => {
  try {
    const people = await Person.create(peopleArray);
    console.log("People created:", people);
  } catch (err) {
    console.error(err);
  }
};

const peopleArray = [
  { name: "Kate", age: 20, favoriteFoods: ["Pasta", "Chicken"] },
  { name: "Alicia", age: 25, favoriteFoods: ["Fish", "Fries"] },
  { name: "Brian", age: 30, favoriteFoods: ["Pizza", "Lasagna"] },
  { name: "Jessie", age: 45, favoriteFoods: ["Rice", "Veggies"] },
];

createManyPeople(peopleArray);

// Use Model.find() to Search Your Database
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log("People found:", people);
  } catch (err) {
    console.error(err);
  }
};

findPeopleByName("Kate");

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log("Person found:", person);
  } catch (err) {
    console.error(err);
  }
};

findOneByFood("Pizza");

// Use model.findById() to Search Your Database By _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log("Person found:", person);
  } catch (err) {
    console.error(err);
  }
};

findPersonById("66d20ce8cb7eb911eba53b16");

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    console.log("Person updated:", updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

findEditThenSave("66d20d9acb7eb911eba53b18");

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async (personName) => {
  const ageToSet = 20;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true }
    );
    console.log("Person updated:", updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

findAndUpdate("Joe Wick");

// Delete One Document Using model.findByIdAndDelete
const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndDelete(personId);
    console.log("Person removed:", removedPerson);
  } catch (err) {
    console.error(err);
  }
};

removeById("66d20df5cb7eb911eba53b19");

// Delete Many Documents with Model.deleteMany()
const removeManyPeople = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log("People removed:", result);
  } catch (err) {
    console.error(err);
  }
};

removeManyPeople("Jessie");

// Chain Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    console.log("People found:", people);
  } catch (err) {
    console.error(err);
  }
};

queryChain();
