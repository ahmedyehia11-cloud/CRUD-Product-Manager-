const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mysql = require('mysql2')
const query = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'week3'
})
app.use(express.json({}))
app.use(cors())

// CRUD api 1 add product 
app.post('/products', (req, res) => {
    const { name, price, description } = req.body
    query.execute(`insert into products (name,price,description) values ('${name}',${price},'${description}')`, (err, data) => {
        if (err) {
            res.json({ MESSAGE: "err", err })
        } else { res.json({ message: "done", data }) }
    })

})

// get all products 
app.get('/products', (req, res) => {
    const get = query.execute('select * from products', (err, data) => {
        if (err) {
            res.json({ MESSAGE: "err", err })

        } else { res.json({ message: "done", data }) }
    })
})




// get one product 
app.get('/products/:id', (req, res) => {
    const { id } = req.params
    const get = query.execute(`select * from products where id =${id}`, (err, data) => {
        if (err) {
            res.json({ MESSAGE: "err", err })
        } else { res.json({ message: "done", data }) }
    })
})



// update 
app.put('/products/:id', (req, res) => {
    const { id } = req.params
    const { name, price, description } = req.body
    query.execute(`update products set name='${name}' , price=${price},description='${description}' where id=${id} `, (err, data) => {
        if (err) {
            res.json({ MESSAGE: "err", err })

        } else { res.json({ message: "done", data }) }
    })
})





// delete 
app.delete('/products/:id', (req, res) => {
    const { id } = req.params
    query.execute(` delete from products  where id=${id} `, (err, data) => {
        if (err) {
            res.json({ MESSAGE: "err", err })

        } else { res.json({ message: "done", data }) }
    })
})




app.listen(port, () => {
    console.log(`server is running on port ${port} `);
})