const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to mongodb...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match : /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "Mobile", "Network"],
    lowercase: true, // mongoose convert automatically this value to lowercase
    // uppercase : true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // validator: function(v, callback){
      //   setTimeout(() => {
      //     const result =  v && v.length > 0;
      //     callback(result)
      //   }, 4000);

      //News way to validate some data in a asynchronous way
      validator: v => Promise.resolve(v && v.length > 0),
      message: "A course should have at least one tag"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v), //call when we read the value of the property
    set: v => Math.round(v) //call when we set the value of the property
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["Frontend"],
    category: "Web",
    isPublished: true,
    price: 15.8
  });
  try {
    // Automatically validation
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.message)
    // an other wa to display all the error properties
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourse() {
  const pageNumber = 2;
  const pageSize = 10;
  // in real api =>>> /api/courses?pageNumber=2&pageSize=10
  const courses = await Course.find({ _id: "5e23140e60eddb4630700a3b" })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  //Counting the document
  // .countDocuments();
  console.log(courses[0].price);
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

async function updateCourse(id) {
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
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mohammed",
        isPublished: false
      }
    },
    { new: true }
  ); // By this it will return the new document
  // that we are updating;
  console.log(course);
}

async function removeCourse(id) {
  // Delete only one or the first with a given property
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
  // Delete only one or the first with a given property
  // const result = await Course.deleteMany({/*Property}*/);
  // find the document with a id and return the document which
  //has been deleted
  // const course = await Course.findByIdAndRemove(id);
  // console.log(course) // null if the document does not exist
}

getCourse();
