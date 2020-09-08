
const server = require('./routers/server.js');


server.listen(5000, () => {
    console.log('\n***server is running on http://localhost:5000***\n');
});