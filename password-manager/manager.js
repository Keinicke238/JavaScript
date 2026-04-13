console.log('manager.js loaded');
console.log('Arguments recieved:', process.argv);

//get command (add or list)
const command = process.argv[2];

const masterPassword = process.argv[3];
const website = process.argv[4];
const username = process.argv[5];
const password = process.argv[6];

if (command === 'add') {
    console.log('Master Password:', masterPassword);
    console.log('Website:', website);
    console.log('Username:', username);
    console.log('Password:', password);
} else if (command === 'list') {
    console.log('Master Password:', masterPassword);
} else {

  console.log('Unknown command. Please use "add" or "list".');
}
