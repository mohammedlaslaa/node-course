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


// Updating document
// first approach : query first
// findById()
// Modify properties
// save()

// async function updateCourse(id){
// 
//   const course = await Course.findById(id);
//   if(!course) return console.log('no courses found');

//   course.isPublished = false;
//   course.author = 'Mohammed';

//   // Or
//   // course.set({
//   //   isPublished : true,
//   //   author : 'Another Author'
//   // })
 
//   const result = await course.save();
//   console.log(result)
//   
// }

// second approach : update first
// Updtae directly
// optionally : get the updated document

async function updateCourse(id){
  // const result = await Course.update({_id : id}, {
  // const result = await Course.update({_id : id}, {
  //   $set : {
  //     author : 'Mosh',
  //     isPublished : false
  //   }
  // });
  // console.log(result)
  // you can also update and return the original document with 
  // findByIdAndUpdate()
  const course = await Course.findByIdAndUpdate(id, {
    $set : {
      author : 'Mohammed',
      isPublished : false
    }
  }, {new : true}) // By this it will return the new document
  // that we are updating;
  console.log(course)
}

async function removeCourse(id){
  // Delete only one or the first with a given property
  const result = await Course.deleteOne({_id : id});
  console.log(result)
  // Delete only one or the first with a given property
  // const result = await Course.deleteMany({/*Property}*/);
  // find the document with a id and return the document which 
  //has been deleted
  // const course = await Course.findByIdAndRemove(id);
  // console.log(course) // null if the document does not exist
  
}


removeCourse('5e22fd3eb59d8f2434039c40');