function executeOperation(a, b, operationFunc) {
    return operationFunc(a, b);
}

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}


const multiplyArrow = (a, b) => a * b;


const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
    const users = [{ id: 1, name: 'Anna' }, { id: 2, name: 'Bo' }];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({ message: 'Bruger oprettet', user: newUser });
});

app.listen(3000);
