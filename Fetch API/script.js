// Event listeners for buttons
document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);

// GET text file content
async function getText() {
    //try catch block - error hanle
    try {
        //bruger await på fetch and response text
        const res = await fetch('sample.txt');
        const data = await res.text();
        document.getElementById('output').innerHTML = data;
    } catch (err) {
        console.log('Error:', err);
    }
}

// GET users from JSON file
async function getUsers() {
    try {
        const res = await fetch('users.json');
        const data = await res.json();
        let output = '<h2>Users</h2>';
        data.forEach(function(user) {
            output += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>
            `;
        });
        document.getElementById('output').innerHTML = output;
    } catch (err) {
        console.log('Error:', err);
    }
}

// GET posts from external API
async function getPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        let output = '<h2>Posts</h2>';
        data.forEach(function(post) {
            output += `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;
        });
        document.getElementById('output').innerHTML = output;
    } catch (err) {
        console.log('Error:', err);
    }
}


// POST new post to API
async function addPost(e) {
    e.preventDefault();
    
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title: title, body: body})
        });
        const data = await res.json();
        console.log('Post created:', data);
        // Optional: Show success message
        document.getElementById('output').innerHTML = '<h2>Post Created Successfully!</h2>';
        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
    } catch (err) {
        console.log('Error:', err);
    }
}