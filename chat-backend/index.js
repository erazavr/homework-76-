const exprees = require('express');
const nanoid = require('nanoid');
const cors = require('cors');
const fs = require('fs');
const app = exprees();
const port = 8000;
const fileName = fName => {
    return `./messages/${fName}.json`
};
app.use(exprees.json());
app.use(cors());
app.get('/messages', (req, res) => {
    if (req.query.datetime) {
        const date = new Date(req.query.datetime);
        if (isNaN(date.getDate())) {
            return res.status(400).send('Wrong date')
        } else {
            let messages = [];
            fs.readdir('./messages', (err, files) => {
                files.forEach(file => {
                    const data = fs.readFileSync(`./messages/${file}`);
                    messages.push(JSON.parse(data.toString()))
                });

                let sortedMessages = messages.filter(obj => {
                    return obj.datetime > req.query.datetime
                });
                res.send(sortedMessages)
            });
        }
    } else {
        let messages = [];
        fs.readdir('./messages', (err, files) => {
            files.forEach(file => {
                const data = fs.readFileSync(`./messages/${file}`);
                messages.push(JSON.parse(data.toString()))
            });
            res.send(messages.slice(-30))
        });
    }
});
app.post('/messages', (req, res) => {
    if (req.body.author === '' || req.body.message === '') {
        res.status(400).send({error: "Author and message must be present in the request"})
    } else {
        const date = new Date;
        const data = JSON.stringify({...req.body, id: nanoid(), datetime: date.toISOString()});
        fs.writeFile(fileName(date.toISOString()), data,  err => {
            if (err) {
                console.log(err)
            } else {
                console.log('Everything looks good')
            }
        });
        res.send(req.body)
    }
});

app.listen(port, () => {
    console.log(`We are here ${port}`)
});