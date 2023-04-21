var express = require('express');
var router = express.Router();
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const {render} = require("express/lib/application");
const {json} = require("express");
const uri = process.env.DATA_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const urlencodedParser = express.urlencoded({extended: false});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Apartment'});
});
/* Add research. */
router.post("/api/add_research", urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const addUrl = req.body.url;

    async function add_research(text) {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('research');
            await result.insertOne({url: text});
            let answer = await result.find().toArray();
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    add_research(addUrl).catch(console.log);
});

/* GET research. */
router.get("/api/get_research", (req, res) => {
    async function get_research() {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('research');
            const answer = await result.find().toArray();
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    get_research().catch(console.log);
})

/* Del research. */
router.post("/api/del_research", urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const Id = req.body._id;

    async function del_research(text) {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('research');
            await result.findOneAndDelete({_id: new ObjectId(text)});
            let answer = await result.find().toArray();
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    del_research(Id).catch(console.log);
});

/* Add posts. */
router.post("/api/add_posts", urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const text_array = req.body;

    async function add_posts(text) {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('apartments');
            let answer = await result.insertMany(text);
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    add_posts(text_array).catch(console.log);
});

/* GET  posts. */
router.get("/api/get_posts", (req, res) => {
    async function get_posts() {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('apartments');
            const answer = await result.find().toArray();
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    get_posts().catch(console.log);
})

/* Del post. */
router.post("/api/del_post", urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const Id = req.body._id;

    async function del_post(text) {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('apartments');
            await result.findOneAndDelete({_id: new ObjectId(text)});
            let answer = await result.find().toArray();
            res.send(answer);
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    del_post(Id).catch(console.log);
});
/* GET Save. */
router.get('/save', (req, res) => {
    async function get_posts() {
        try {
            // Подключаемся к серверу
            await client.connect();
            // взаимодействие с базой данных
            const db = client.db('node-todo');
            const result = await db.collection('apartments');
            const answer = await result.find().toArray();
            const set_date = new Date();
            const get_date = `${set_date.getDay()}-${set_date.getMonth()}-${set_date.getFullYear()}`;
            res.set('Content-Type', 'application/json;charset=utf-8');
            res.set('Content-Disposition', `attachment;filename=report_${get_date}.json`);
            res.render('json', {posts: answer});
        } catch (err) {
            console.log(err);
        } finally {
            // Закрываем подключение при завершении работы или при ошибке
            await client.close();
        }
    }

    get_posts().catch(console.log);
});
module.exports = router;
