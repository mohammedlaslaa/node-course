const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
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
    const pageNumber = 2;
    const pageSize = 10;
    // in real api =>>> /api/courses?pageNumber=2&pageSize=10
  const courses = await Course
  .find({ author: "Mosh", isPublished: true })
  .skip((pageNumber -1) * pageSize)
  .limit(10)
  .sort({name : 1})
  // .select({name: 1, tags:1})
  //Counting the document
  .countDocuments();
  console.log(courses);
}

getCourse();