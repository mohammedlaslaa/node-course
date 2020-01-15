let obji = {
  id: 1,
  name: "Mohammed",
  isGold: true,
  email: "email"
};

getCustomer(obji, customer => {
  console.log("Customer: ", customer);
  if (customer.isGold) {
    getTopMovies(movies => {
      console.log("Top movies: ", movies);
      sendEmail(customer.email, movies, () => {
        console.log("Email sent...");
      });
    });
  }
});

async senMail(){
  const customer = await getCustomer(obji)
}

function getCustomer(obj, callback) {
  setTimeout(() => {
    callback(obj);
  }, 4000);
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(["movie1", "movie2"]);
  }, 4000);
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}
// TEST CALLBACK PERSO
// function log1 (callback){
//   console.log("log1")
//   callback()
// }
// function log2 (){
//   console.log("log2")
// }

// log1(()=>{
//   log2()
// })
