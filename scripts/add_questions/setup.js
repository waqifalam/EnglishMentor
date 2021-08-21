require('dotenv').config()
const fs = require('fs');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

const args = process.argv;
if (!args[2]) {
    console.log('No filename env arg provided in the npm script');
    process.exit(1);
}

const filename = process.env[args[2]];
if (!filename) {
    console.log('No filename provided in .env');
    process.exit(2);
}

try {
    const rawdata = fs.readFileSync(filename);
    const questions = JSON.parse(rawdata);
    const questionsFormatted = questions.map((text, id) => {
        const question = {
            id,
            text,
        }
        return JSON.stringify(question);
    })
    console.log(questionsFormatted);
    client.sendCommand('del', [process.env.QUESTIONS_SET], (err) => {
        if (err) {
            console.log(`Error happended deleting keys ${err.message}`);
            process.exit(4)
        }
        client.sendCommand('SADD', [process.env.QUESTIONS_SET, ...questionsFormatted], (err1) => {
            if (err1) {
                console.log(`Error adding new questions ${err1.message}`)
                process.exit(4)
            }
            console.log('added new questions');
            process.exit(0);
        })
    });
} catch(e) {
    console.log(`Error occured: ${e.message}`);
    process.exit(3);
}