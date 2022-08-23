const express = require('express');
const app = express();
const fetch = require('node-fetch');
const path = require('path');
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/sent', (req, res) => {
    res.sendFile(path.join(__dirname, '/sent.html'));
})

app.get('/send', async (req, res) => {
    console.log(req.query.webhook)
    await sendmenow(req, res);
})



async function sendmenow(req, res){
    webhook = req.query.webhook;
    username = req.query.username;
    content = req.query.content;
    titles = req.query.title;
    thumbnail = req.query.thumbnail;
    names = req.query.names;
    value = req.query.value;

        var params = {
            username: `${username}`,
            avatar_url: "",
            content: `${content}`,
            embeds: [
                {
                    "title": `${titles}`,
                    "color": 15258703,
                    "thumbnail": {
                    "url": `${thumbnail}`,
                    },
                    "fields": [
                        {
                            "name": `${names}`,
                            "value": `${value}`,
                            "inline": true
                        }
                    ]
                }
            ]
        }
    
        fetch(`${webhook}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => {
            console.log(res);
    }) 
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
