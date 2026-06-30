const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require('./routers/posts');
const serverError = require('./middlewares/serverError');
const notFound = require('./middlewares/notFOund');
const logRequest = require('./middlewares/logRequest');

app.use(logRequest);

app.use(express.static('public'));

// register the JSON body parser middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/posts', postsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    // app.error(' 500 test error')
    res.json({ message: 'Benvenuto nel mio blog!' });
});


app.use(serverError);

app.use(notFound);
