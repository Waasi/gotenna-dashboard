const app = require('./web/app');
const port = process.env.PORT;

app.listen(port, () => console.log(`Dashboard listening on port ${port}!`));