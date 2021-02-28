const { readVakaExport, writeVakaImport } = require("./vaka-utils");

// Run as `node add-random-pins.js export-from-vaka.csv`

const createRandomPin = () =>
  ("0000" + parseInt(Math.random() * 10000).toString()).slice(-4);
const addPin = (x) => ({ ...x, pin: createRandomPin() });

writeVakaImport(
  process.argv[3], // output filename
  readVakaExport(process.argv[2]) // input filename
    .filter((x) => x.identityId) // only entries with identities
    .filter((x) => x.accessGroups.includes("AccessGroup")) // only entries in the "AccessGroup" access group.
    .map(addPin)
);
