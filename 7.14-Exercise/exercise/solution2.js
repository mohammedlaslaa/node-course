const mongoose = require('mongoose');

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to the database..."))
  .catch(err => console.error("Could not connect to mongodb...", err));

  const courseSchema = new mongoose.Schema({
      name: String,
      tags : [String],
      author : String,
      isPublished : Boolean,
      date:  { type: Date, default: Date.now() },
      price: Number
  });
  
  const Course = mongoose.model('courses', courseSchema);

  async function getCourses(){
    return await Course
    .find({isPublished: true, tags : {$in: ['frontend', 'backend']}})
    // other solution for displaying tags : .or([{tags : 
    // 'frontend'}, {tags: 'backend'}]) display all 
    // tags equal to frontend or backend 
    .sort('-price')
    .select('name author price')
     
  }

  async function run(){
      const courses = await getCourses();
      console.log(courses)
  }
  
  run()