import simpleGit from 'simple-git';
import moment from 'moment';
import random from 'random';
import fs from 'fs';

// Load commit data from a JSON file
const commitData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Initialize git
const git = simpleGit();

(async () => {
  for (let entry of commitData) {
    const commitDate = moment(entry.date).format();
    console.log(`Making commit on: ${commitDate}`);
    fs.writeFileSync('dummyFile.txt', `Commit on ${commitDate}`);
    await git.add('./*');
    await git.commit(`Commit on ${commitDate}`, { '--date': commitDate });
  }
  console.log('All commits have been made!');
})();

