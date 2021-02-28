const fs = require("fs");

/**
 * Read VAKA export file.
 * @param {string} filename
 */
const readVakaExport = (filename) =>
  fs
    .readFileSync(filename, "latin1")
    // Split per entry.
    .split("\n")
    // Drop the header.
    .slice(1)
    // Drop empty rows. (the one at the end mostly)
    .filter((x) => x.trim())
    .map(deserializeRow);

/**
 * Write VAKA import file.
 * @param {string} filename filename to write to.
 * @param {Array<ReturnType<typeof deserializeRow>>} data Data to write.
 */
const writeVakaImport = (filename, data) => {
  const header =
    "Name;IdentityType (0=em 1=code 2=rf 3=mifare);IdentityId;IdentityStatus (0=enabled 1=disabled);PIN;StartTime;StopTime;Accessgroup;Email;Person PhoneNo;Person ShortNo;Person Line (0=local 1=analog 2=extern);OrgGroup;Location;Floor;Apartment;ReferenceId;OrgPhoneNo;OrgShortNo;OrgLine (0=local 1=analog 2=extern);Freetext1;Email;Freenumber;Extended Freetext;DoorControl;RelayControl\n";
  const outFile = fs.openSync(filename, "w");
  fs.writeSync(
    outFile,
    header + data.map(serializeRow).join("\n") + "\n",
    undefined,
    "latin1"
  );
  fs.closeSync(outFile);
};

/**
 *
 * @param {string} row
 */
const deserializeRow = (row) => {
  const [
    name,
    identityType,
    identityId,
    identityStatus,
    pin,
    startTime,
    stopTime,
    accessGroups,
    email,
    phoneNo,
    shortNo,
    personLine,
    orgGroup,
    location,
    floor,
    apartment,
    referenceId,
    orgPhoneNo,
    orgShortNo,
    orgLine,
    freetext1,
    freeEmail,
    freenumber,
    extendedFreetext,
    doorControl,
    relayControl,
  ] = row.split(";");

  return {
    name,
    identityType,
    identityId,
    identityStatus,
    pin,
    startTime,
    stopTime,
    accessGroups: accessGroups.split("|"),
    email,
    phoneNo,
    shortNo,
    personLine,
    orgGroup,
    location,
    floor,
    apartment,
    referenceId,
    orgPhoneNo,
    orgShortNo,
    orgLine,
    freetext1,
    freeEmail,
    freenumber,
    extendedFreetext,
    doorControl,
    relayControl,
  };
};
/**
 *
 * @param {ReturnType<typeof deserializeRow>} param0
 */
const serializeRow = ({
  name,
  identityType = 0, // (0=em 1=code 2=rf 3=mifare)
  identityId = "", // the tag id number
  identityStatus = 0, // (0=enabled 1=disabled)
  pin = "1234",
  startTime = "",
  stopTime = "",
  accessGroups = [],
  email = "",
  phoneNo = "",
  shortNo = "0",
  personLine = "2", // (0=local 1=analog 2=extern),
  orgGroup,
  location = "",
  floor = "",
  apartment = "",
  referenceId = "",
  orgPhoneNo = "",
  orgShortNo = "",
  orgLine = "", // (0=local 1=analog 2=extern),
  freetext1 = "",
  freeEmail = "",
  freenumber = "",
  extendedFreetext = "",
  doorControl = "",
  relayControl = "",
}) =>
  [
    name,
    identityType,
    identityId,
    identityStatus,
    pin,
    startTime,
    stopTime,
    accessGroups.join("|"),
    email,
    phoneNo,
    shortNo,
    personLine,
    orgGroup,
    location,
    floor,
    apartment,
    referenceId,
    orgPhoneNo,
    orgShortNo,
    orgLine,
    freetext1,
    freeEmail,
    freenumber,
    extendedFreetext,
    doorControl,
    relayControl,
  ].join(";");

module.exports = {
  deserializeRow,
  serializeRow,
  readVakaExport,
  writeVakaImport,
};
