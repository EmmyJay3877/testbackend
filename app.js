const createServer = require('./config/server');
const app = createServer();
const mongoose = require('mongoose');
const PORT = 8000

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

// register a user
app.use('/register', require('./routes/register'));


app.use('/posts', require('./routes/posts'));

app.listen(PORT, ()=> console.log(`Server listing on port ${PORT}`));

// check db connection before starting server
// mongoose.connection.once('open', async () => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// });