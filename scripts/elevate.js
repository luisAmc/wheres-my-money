/**
 * This script requests elevated access, then attempts to run another node script.
 */

const sudo = require('sudo-prompt');

const [, , scriptName] = process.argv;

console.log(
  '\nThis script requires elevated access. We will now prompt you for your password...\n'
);

sudo.exec(`node ${scriptName}`, { name: 'Nytro' }, (error, stdout, stderr) => {
  if (error) throw error;
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});
