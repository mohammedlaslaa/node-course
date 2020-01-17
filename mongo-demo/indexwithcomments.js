const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to mongodb...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
    // Operator comparison in mongodb ara available in mongoose
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)
  const courses = await Course
  .find({ author: "Mosh", isPublished: true })
  // example operator comparison find all courses with price of 10 Dollars
  // .find({price : 10})
  // Now for find the prices which are greater than 10 $ and
  // less than or equal to 20
  // .find({price : { $gt : 10, $lte: 20}})
  // if we need all the course which are equal to 10 or 15 or 20
  // .find({price: {in : [10,15,20]}})
  // Logical operator for find all the course which are 
  // published and the author is Mosh ---> or and
  // .find()
  // .or([ {author : 'Mosh}, {isPublished: true} ])
  // .and([ {author : 'Mosh}, {isPublished: true} ])

  // REGEXP

  //example the authors that starts by Mosh
  // .find({author:/^Mosh/})

  // ends with Hamedani
  //.find({author : /Hamedani$/i}) the i is for the case
  // insensitive

  // contains Mosh (at the beginning, middle or the end)
//.find({author : /.*Mosh.*/i})

  .limit(10)
  .sort({name : 1})
  .select({name: 1, tags:1});
  console.log(courses);
}

getCourse();