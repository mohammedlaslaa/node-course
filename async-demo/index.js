console.log("Before");
getUser(1, "Mohammed", getRepositories);
console.log("After");

function getRepositories(user){
    getRepositories(user.gitHubUsername, getcommits);
}

function getcommits(parm1) {
  getcommits(parm1, displayCommits);
}

function displayCommits(repo) {
  console.log(repo);
}

function getUser(id, username, callback) {
  setTimeout(() => {
    console.log("Reading a user from a db....");
    callback({ id: id, gitHubUsername: username });
  }, 2000);
}

let table = ["repo1", "repo2", "repo3"];

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Redaing to the repositories...", username);
    callback(table);
  }, 2000);
}
