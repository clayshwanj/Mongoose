require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// A Person Schema
// const personSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: Number,
//   favoriteFoods: [String],
// });

// const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = () => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("Person saved:", data);
  });
};

createAndSavePerson();

//Create Many Records with Model.create()
const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("People created:", people);
  });
};

const peopleArray = [
  { name: "Kate", age: 20, favoriteFoods: ["Pasta", "Chicken"] },
  { name: "Alicia", age: 25, favoriteFoods: ["Fish", "Fries"] },
  { name: "Brian", age: 30, favoriteFoods: ["Pizza", "Lasagna"] },
  { name: "Jessie", age: 45, favoriteFoods: ["Rice", "Veggies"] },
];

createManyPeople(peopleArray);

// Use Model.find() to Search Your Database
const findPeopleByName = (name) => {
  Person.find({ name }, (err, people) => {
    if (err) return console.error(err);
    console.log("People found:", people);
  });
};

findPeopleByName();

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log("Person found:", person);
  });
};

findOneByFood("Pizza");

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log("Person found:", person);
  });
};

findPersonById("66d20ce8cb7eb911eba53b16");

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log("Person updated:", updatedPerson);
    });
  });
};

findEditThenSave("66d20d9acb7eb911eba53b18");

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log("Person updated:", updatedPerson);
    }
  );
};

findAndUpdate("Alicia");

//Delete One Document Using model.findByIdAndRemove
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log("Person removed:", removedPerson);
  });
};

removeById("66d20df5cb7eb911eba53b19");

//Delete Many Documents with Model.remove()

const removeManyPeople = (name) => {
  Person.remove({ name }, (err, result) => {
    if (err) return console.error(err);
    console.log("People removed:", result);
  });
};

removeManyPeople("Jessie");

//Chain Search Query Helpers to Narrow Search Results
const queryChain = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, people) => {
      if (err) return console.error(err);
      console.log("People found:", people);
    });
};

queryChain();
