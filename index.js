const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser())
app.use(cors())
app.use(express.static('public'))

app.get(`/`, function(req, res){
    res.send(
        `<html>
            <body>
                <h1>What do you want to do?
                <form action="/todo" method="post">
                    <input name="desc"/>
                    <button type="submit">Add</button>
                </form>
            </body>
        </html>`
    )
})

app.get('/todo', function(req, res){
    let db = new sqlite3.Database('db.db')
    let syntax = "SELECT * FROM MYTABLE"
    db.all(syntax, function(err, rows){
        res.json(rows)
    })
    db.close()
})

app.post('/todo', function(req, res){
    let db = new sqlite3.Database('db.db')
    let grade = req.body.desc
    let syntax = `INSERT INTO MYTABLE (TODO) VALUES ('${grade}')`
    db.run(syntax)
    db.close()
    res.end()
})

app.delete('/todo/:id', function(req, res){
    let db = new sqlite3.Database('db.db')
    let id = req.params.id
    let syntax = `DELETE FROM MYTABLE WHERE ID=${id}`
    db.run(syntax)
    db.close()
    res.end()
})

app.listen(3000, function(){
    console.log('Server berjalan')
})