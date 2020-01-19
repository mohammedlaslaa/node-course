// Trade off between query performance vs consistency


// Using References (Normalization) ---> Consistency : by this approach if we decide to modify the author, all of those courses will be modified, but everytime when we querying the course, we need to do an extra query to load the related author

let author = {
    name : 'Mohammed'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormalization) ---> Performance, because we load the single author by only one query, however, with this approach, if you need to change the author, a multiple courses should be modified , the risk is to have certain documents not up to date

let course = {
    author:{
        name: 'Mohammed'
    }
}

// Hybrid

let author = {
    name: 'Mohammed'
    // 50 other properties
}

let course = {
    author : {
        id: 'ref',
        name: 'Mohammed'
    }
}