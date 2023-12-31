import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit(); // Initialize Git

// Function to create a single commit with a fake timestamp
const makeCommit = (date, callback) => {
  const data = { date }; // Store commit date in data.json
  jsonfile.writeFile(path, data, () => {
    git.add([path])
      .commit(`Commit for ${date}`, { "--date": date })
      .then(callback);
  });
};

// Recursive function to create `n` commits
const makeCommits = (n) => {
  if (n === 0) {
    // Push changes after all commits are created
    return git.push();
  }

  // Generate random week and day within the last year
  const x = random.int(0, 54); // Weeks
  const y = random.int(0, 6); // Days
  const date = moment()
    .subtract(1, "y")
    .add(1, "d") // Start from Jan 1 of the previous year
    .add(x, "w")
    .add(y, "d")
    .format();

  console.log(`Creating commit for: ${date}`);
  makeCommit(date, () => makeCommits(n - 1));
};

// Start generating 100 commits
makeCommits(100);
