import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json"; // Path to the JSON file
const git = simpleGit(); // Simple Git instance

// Function to make a single commit
const markCommit = async (x, y) => {
  const date = moment()
    .subtract(1, "y") // Go back 1 year
    .add(x, "w") // Add random weeks
    .add(y, "d") // Add random days
    .format();

  const data = {
    date: date,
  };

  // Write data to file
  await jsonfile.writeFile(path, data);

  // Add and commit with the custom date
  await git.add([path]);
  await git.commit(`Commit on ${date}`, { "--date": date });
};

// Recursive function to make multiple commits
const makeCommits = async (n) => {
  if (n === 0) {
    console.log("All commits done! Pushing to GitHub...");
    await git.push();
    return;
  }

  const x = random.int(0, 54); // Random week
  const y = random.int(0, 6); // Random day

  console.log(`Creating commit #${n}`);
  await markCommit(x, y); // Make a single commit

  // Recursive call for the next commit
  await makeCommits(n - 1);
};

// Start creating 100 commits
makeCommits(100).then(() => console.log("All commits pushed!"));
