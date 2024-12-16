require('dotenv').config();
const http = require('http');
const app = require('./index');

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${process.env.PORT || 3000} is already in use.`);
        process.exit(1);
    } else {
        throw err;
    }
});
