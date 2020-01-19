const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: { type: String, required: true },
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  try {
    // const course = await Course.findById(courseId);
    const course = await Course.update(
      { _id: courseId },
      {
        $unset: {
          author: ''
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('Node Course', [
//   new Author({ name: 'Array', bio: 'amarray' }),
//   new Author({ name: 'Test', bio: 'Hey' })
// ]);

// updateAuthor('5e2430327b63d331c07e7a34')

// addAuthor(
//   '5e243453a5d31a4d50d302ff',
//   new Author({ name: 'Amy', bio: 'amarray' })
// );

removeAuthor('5e243453a5d31a4d50d302ff', '5e2435099877464a60cd5f79')