// Event listeners for buttons
document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);

// GET text file content
function getText() {
    fetch('sample.txt')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('output').innerHTML = data;
        })
        .catch((err) => console.log('Error:', err));
}

// GET users from JSON file
function getUsers() {
    fetch('users.json')
        .then((res) => res.json())
        .then((data) => {
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
        })
        .catch((err) => console.log('Error:', err));
}

// GET posts from external API
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
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
        })
        .catch((err) => console.log('Error:', err));
}

// POST new post to API
function addPost(e) {
    e.preventDefault();
    
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title: title, body: body})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Post created:', data);
        // Optional: Show success message
        document.getElementById('output').innerHTML = '<h2>Post Created Successfully!</h2>';
        // Clear form
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
    })
    .catch((err) => console.log('Error:', err));
}