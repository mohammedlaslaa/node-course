let obji = {
  id: 1,
  name: "Mohammed",
  isGold: true,
  email: "mohamed.laslaa@gmail.com"
};

// getCustomer(obji, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

const mymovies = ["Movie1", "Movie2", "Movie3"]

async function senMail() {
  try {
    const customer = await getCustomer(obji)
    console.log("Customer : ", customer);
    if (customer.isGold) {
      const movies = await getTopMovies(mymovies);
      console.log(movies);
      const sendmail = await sendEmail(customer.email, movies);
      console.log(sendmail);
    }
  } catch (err) {
    console.log('Error :', err.message);
  }
}

senMail();

function getCustomer(obj) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(obj);
    }, 4000)
  })

}

function getTopMovies(movies) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(movies);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(`Email sent to ${email}`);
    }, 4000);
  })
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
