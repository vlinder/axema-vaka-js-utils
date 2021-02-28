const { readVakaExport } = require("../src/vaka-utils");

// Run as `node show-pins.js export-from-vaka.csv`

readVakaExport(process.argv[2]) // input filename
  .filter((x) => x.identityId) // only entries with identities
  .filter((x) => x.accessGroups.includes("AccessGroup")) // only entries in the Boende access group.
  .forEach((x) => console.log(`${x.orgGroup} - pin: ${x.pin}`));
