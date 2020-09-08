
const server = require('./routers/server.js');


server.listen(5000, () => {
    console.log('server is listening on port 5000...');
});