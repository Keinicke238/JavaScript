console.log('manager.js loaded');
console.log('Arguments recieved:', process.argv);

//importing crypto for encryption
const crypto = require('crypto');

//get command (add or list)
const command = process.argv[2];

const masterPassword = process.argv[3];
const website = process.argv[4];
const username = process.argv[5];
const password = process.argv[6];

//takes master password and returns krypteringsnøgle
function getKeyFromPassword(masterPassword){
    //Salt is random every time, even with same password
    const salt = crypto.randomBytes(16);

    //omdanner master password til 32-byte nogle, 100.000 iterations against brute-force
    const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');

    console.log("salt: ", salt.toString('hex'));
    console.log("Key: ", key.toString('hex'));

    return {key, salt};
}

//decrypting function, takes key, salt and encrypted data
function getKeyFromExistingSalt(masterPassword, saltHex){
    const salt = Buffer.from(saltHex, 'hex');
    const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');
    return key;
}

if (command === 'add') {
    if (!masterPassword || !website || !username || !password) {
        console.log('Missing arguments for "add" command.');
        process.exit(1);
    }
    console.log('generating key');
    //kald hjælpefunktion
    const {key, salt} = getKeyFromPassword(masterPassword);

    console.log('Key made, this is for a test');


} else if (command === 'list') {
    if (!masterPassword) {
        console.log('Missing master password for "list" command.');
        process.exit(1);
    }
    console.log('Master Password:', masterPassword);

    //read vault
    //loop entries, get key from salt funtion
    //decrypt

} else {

  console.log('Unknown command. Please use "add" or "list".');
}
