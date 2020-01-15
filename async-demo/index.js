// Callback hell
// console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });
// console.log('After');

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUsername: 'mosh' });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['commit']);
//   }, 2000);
// }

// Refactoring callback
// console.log("Before");
// getUser(1, "Mohammed", getRepos);
// console.log("After");

// function getRepos(user){
//     getRepositories(user.gitHubUsername, getcommits);
// }


// function getcommits(repos) {
//   console.log(repos);
// }

// // function displayCommits(commits) {
// //   console.log(commits);
// // }

// function getUser(id, username, callback) {
//   setTimeout(() => {
//     console.log("Reading a user from a db....");
//     callback({ id: id, gitHubUsername: username });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//     console.log('username', username)
//   setTimeout(() => {
//     console.log("Redaing to the repositories...", username);
//     callback( ["repo1", "repo2", "repo3"]);
//   }, 2000);
// }

// // function moi(arg){
// //     console.log(arg)
// // }

// // getRepositories('cou', moi)

// Refactoring callback to promise

// console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message));

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mohammed' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(repo);
    }, 2000);
  });
}