const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground', {useNewUrlParser: true})
.then(()=> console.log('Connected to the database...'))
.catch(err => console.error('Could not connect to mongodb...', err)) 

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags : [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});