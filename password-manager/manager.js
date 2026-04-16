console.log('manager.js loaded');
console.log('Arguments recieved:', process.argv);

//importing crypto for encryption
const crypto = require('crypto');
//import file system for vault
const fs = require('fs');

//get command (add or list)
const command = process.argv[2];

const masterPassword = process.argv[3];
const website = process.argv[4];
const username = process.argv[5];
const password = process.argv[6];

//objekt af samlet data til kryptering
const dataToEncrypt = {
    website: website,
    username: username,
    password: password
}

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
    //salt bruges for at lave samme nøgle fra master pass
    const salt = Buffer.from(saltHex, 'hex');
    const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');
    return key;
}

function encryptData(data, key){
    //iv is random for each encryption, even with same key and data
    const iv = crypto.randomBytes(12);

    //create cipher object med AES256GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    //convert data to JSON and to Buffer
    const dataString = JSON.stringify(data);
    const dataBuffer = Buffer.from(dataString, 'utf-8');

    //krypter data
    //concat means at det tager output fra update og final 
    //og laver det til en samlet buffer
    const encrypted = Buffer.concat([
        //cipher update krypterer data og returnerer en buffer
        cipher.update(dataBuffer),
        //cipher final afslutter kryptering og returnerer
        cipher.final()
    ])

    //hent auth tag (verificerer integriteten af data, at den ik er ændret)
    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex'),
        authTag: authTag.toString('hex')
    }
}

function decryptData(encryptedObj, key){
    //convert hex tilbage til buffers
    const iv = Buffer.from(encryptedObj.iv, 'hex');
    const authTag = Buffer.from(encryptedObj.authTag, 'hex');
    const encryptedData = Buffer.from(encryptedObj.encryptedData, 'hex');

    //create decipher object 
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    //set auth tag (verify integrity)
    decipher.setAuthTag(authTag);

    //decrypt data
    const decrypted = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final()
    ]);

    //convert from buffer to string
    const decryptedString = decrypted.toString('utf8');
    //convert fra JSON til objekt
    const data = JSON.parse(decryptedString);

    return data;

}


function readVault(){
    if (!fs.existsSync('vault.json')) {
        return [];
    }

    //read file
    const data = fs.readFileSync('vault.json', 'utf-8');

    //parse JSON til js objekt og returner
    const vault = JSON.parse(data);
    return vault;
}


function writeVault(vault){
    //convert vault objekt til JSON string (2 mellemrum)
    const jsonString = JSON.stringify(vault, null, 2);

    //write to file
    fs.writeFileSync('vault.json', jsonString);

    console.log("vault saved");
}

function generatePassword(length){
    //literally alle tegn password generatoren må bruge
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let password = '';
    
    //Generate random tegn
    for (let i=0; i<length; i++){
        //crypto.randomBytes for safe tilfældighed
        const randomIndex = crypto.randomBytes(1)[0] % charset.length;

        //lig random char til password
        password += charset[randomIndex];
    }

    return password;
}


//_________________________________________________________________________________
if (command === 'generate'){
    //hent length fra argument, standard 16
    const length = parseInt(process.argv[3]) || 16;

    //tjek at length er et tal og mellem 8 og 64
    if (isNaN(length) || length < 8 || length > 64) {
        console.log('Invalid length. Please provide a number between 8 and 64.');
        process.exit(1);
    }

    //generer random password
    const generatedPassword = generatePassword(length);

    console.log('Generated password:', generatedPassword);

} else if (command === 'add') {
    if (!masterPassword || !website || !username || !password) {
        console.log('Missing arguments for "add" command.');
        process.exit(1);
    }

    console.log('generating key');

    //kald hjælpefunktion til at lave nøgle
    const {key, salt} = getKeyFromPassword(masterPassword);

    //prepare data for encryption
    const dataToEncrypt = {
        website: website,
        username: username,
        password: password
    }

    //selve den encrypted information
    const encryptedData = encryptData(dataToEncrypt, key);

    //Gem alt i entry-objekt
    const entry = {
        salt: salt.toString('hex'),
        iv: encryptedData.iv,
        encryptedData: encryptedData.encryptedData,
        authTag: encryptedData.authTag
    }

    console.log('Entry to save:', entry);

    const vault = readVault();

    vault.push(entry);

    writeVault(vault);

    console.log('Entry added to vault.');

} else if (command === 'list') {
    if (!masterPassword) {
        console.log('Missing master password for "list" command.');
        process.exit(1);
    }

    //read vault
    const vault = readVault();
    if (vault.length === 0) {
        console.log('Vault is empty.');
        return;
    }

    //loop entries, try to get key from salt funtion
    for (let i = 0; i < vault.length; i++) {
        const entry = vault[i];

        try{
            const key = getKeyFromExistingSalt(masterPassword, entry.salt);

            //decrypt data
            const decryptedData = decryptData(entry, key);

            //print decrypted data
            console.log(`Entry ${i + 1}:`);
            console.log('Website:', decryptedData.website);
            console.log('Username:', decryptedData.username);
            console.log('Password:', decryptedData.password);
            console.log('-----------------------');

        } catch (error){
            console.log(`Entry ${i + 1}: Could not decrypt`);

        }
    }

} else {

  console.log('Unknown command. Please use "add" or "list".');
}
