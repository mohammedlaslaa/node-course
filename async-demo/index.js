console.log("Before");
getUser(1, "Mohammed", getRepos);
console.log("After");

function getRepos(user){
    getRepositories(user.gitHubUsername, getcommits);
}


function getcommits(repos) {
  console.log(repos);
}

// function displayCommits(commits) {
//   console.log(commits);
// }
 
function getUser(id, username, callback) {
  setTimeout(() => {
    console.log("Reading a user from a db....");
    callback({ id: id, gitHubUsername: username });
  }, 2000);
}

function getRepositories(username, callback) {
    console.log('username', username)
  setTimeout(() => {
    console.log("Redaing to the repositories...", username);
    callback( ["repo1", "repo2", "repo3"]);
  }, 2000);
}

// function moi(arg){
//     console.log(arg)
// }

// getRepositories('cou', moi)