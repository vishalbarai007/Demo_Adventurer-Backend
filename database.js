const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "AdventurerDB"
});
client.connect();

client.query('SELECT * FROM loginformdb', (err, res) => {
    
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err);
    }

    client.end();  // Note the parenthesis to actually close the connection
});
