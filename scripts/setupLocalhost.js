require('dotenv').config();
const hostile = require('hostile');

if (!process.env.DOMAIN_NAME) {
  console.error(
    'There was no `DOMAIN_NAME` environment variable set. Ensure that this variable is set in your `.env` file.'
  );
  process.exit(1);
  return;
}

const domainName = `${process.env.DOMAIN_NAME}.localhost`;

hostile.set('127.0.0.1', domainName, function (err) {
  if (err) {
    console.error(
      `We were unable to modify your hosts file to add "${domainName}"`
    );
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Successfully set up local domain "${domainName}"`);
    process.exit(0);
  }
});
