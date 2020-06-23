////////Imports
//Express
const express = require('express');
const server = express();
//Libraries
const jwt = require('jsonwebtoken');
const cors = require('cors');
//Middlewares
const bodyParser = require('body-parser');
//Data Base
const { db_host, db_name, db_user, db_password, db_port } = require('./database/db_data');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`mysql://${db_user}@${db_host}:${db_port}/${db_name}`);
//Custom Modules
const jwtSignature = require('./config/config.js')
const products = require('./utils/products.js')
const users = require('./utils/users.js')
const orders = require('./utils/orders.js')
const server_port = 3000;

////////Server setup
server.listen(server_port, () => {
    console.log(`Server started in port ${server_port}` )
})
server.use(bodyParser.json(), cors());

///Auth for admin Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InphZmlyb1JvYmVydG8iLCJpc19hZG1pbiI6MSwiaXNfYWN0aXZlIjoxLCJpYXQiOjE1OTI3NjM3MzF9.CHe1VBX9GJDkS728C43JrPlKjHcOwciFS3fF1i1Iebs
////////////////////////////////////////////////////////////////////////////
//User Endpoints
server.get('/v1/users', isAdmin, async (req, res) => {
    const usersList = await users.get(sequelize);
    res.status(200).json(usersList)
})

server.post('/v1/users', checkingInput, validateUserData, async (req, res) => {
    const { username, full_name, email, phone, address, password } = req.body;
    const newUser = await users.create(sequelize, username, full_name, email, phone, address, password)
    if (newUser.length == 0) {
        res.status(400).json({ Error: "Bad request"})
    }
    const userCreated = await users.getById(sequelize, newUser[0])
    res.status(201).json(userCreated)
}) 

server.put('/v1/users', isAdmin, checkingInput, async (req, res) => {
    const { username, full_name, email, phone, address, password } = req.body;
    const modifiedUser = await users.update(sequelize, username, full_name, email, phone, address, password)
    res.status(200).json({Success: 'Modified'}) 
})

server.get('/v1/users/:id', isAdmin, findUser, async (req, res) => {
    const useryById = await users.getById(sequelize, req.params.id)
    res.status(200).json(useryById)
})

server.patch('/v1/users/:id', isAdmin, async (req, res) => {
    const newAdmin = await users.makeAdminById(sequelize, req.params.id)
    res.status(200).json({Success: "User is now admin"})
})

server.delete('/v1/users/:id', isAdmin, findUser, async (req, res) => {
    const deleteUserById = await users.deleteById(sequelize, req.params.id)
    res.status(204).json({})
})

server.post('/v1/users/login', async (req, res) => {
    const { username, password } = req.body;
    const userByUsername = await users.getByUsername(sequelize, username)
    if ( (userByUsername.length == 0) || (userByUsername[0].user_password != password)){
        res.status(400).json({Error: 'Invalid user or password'})
    } else if (userByUsername[0].is_active == 0 ) {
        res.status(400).json({Error: 'User disabled'})
    }
    const payload = {
        id: userByUsername[0].id,
        username: userByUsername[0].username,
        is_admin: userByUsername[0].is_admin,
        is_active: userByUsername[0].is_active
    }
    const token = jwt.sign(payload, jwtSignature.signature );
    res.status(201).json({ token });
})

//Product Endpoints
server.get('/v1/products', validateToken, async (req, res) => {
    let productsList = await products.get(sequelize);
    res.status(200).json(productsList)
})

server.post('/v1/products', existantProduct, isAdmin, async (req, res) => {
    const { name, price, img_url } = req.body;
    const newProduct = await products.create(sequelize, name, price, img_url)
    const productCreated = await products.getById(sequelize, newProduct[0]);
    res.status(201).json(productCreated)
})

server.get('/v1/products/:id', findProduct, validateToken, async (req, res) => {
    let product = await products.getById(sequelize, req.params.id);
    res.status(200).json(product)
})

server.put('/v1/products/:id', findProduct, isAdmin, async (req, res) => {
    const { name, img_url, price } = req.body;
    const modifyProduct = await products.update(sequelize, req.params.id, name, price, img_url);
    const modifiedProduct = await products.getById(sequelize, req.params.id)
    res.status(200).json(modifiedProduct)
})

server.delete('/v1/products/:id', findProduct, isAdmin, async (req, res) => {
    const deleteProductById = await products.deleteById(sequelize, req.params.id)
    res.status(200).send('Product borrado')
})


//Order Endpoints
server.get('/v1/orders', isAdmin, (req, res) => {
    //Trae todas las ordenes

    /*
    const getProducts = await...
    res.status(200).json(getProducts)
    */
})

server.post('/v1/orders', validateToken, async (req, res) => {
    try {
    const {final_price, id_user, payment_method} = req.body;
    console.log('A crear orden')
    const createOrder = await orders.create(sequelize, id_user, final_price, payment_method);
    console.log(createOrder)
    const { products } = req.body;
    products.forEach(async (productToAdd) => {
        const id = productToAdd.product_id;
        const amount = productToAdd.amount;
        const addProduct = await orders.addOrderedProduct(sequelize, createOrder[0], id, amount)
        console.log(addProduct)
    });
    res.status(201).json({ Success: "order sent"})
    }
    catch {
        res.status(400).json({ Error: "Bad Request"})
    }
})

server.get('/v1/orders/:id', findOrder, (req, res) => {
    //Trae un pedido

    /*
    const getProduct = await...
    res.status(200).json(getProduct)
    */
})

server.put('/v1/orders/:id', findOrder, isAdmin, (req, res) => {
    //Modificar el estado del pedido

    /*
    const modiefiedOrder = await...
    res.status(201).json(orderModified)
    */
})

server.patch('/v1/orders/:id', findOrder, isAdmin, async (req, res) => {
    const { status } = req.body;
    const modifiedStatus = await orders.updateOrderStatus(sequelize, req.params.id, status)
})


/*{
    "final_price": 630,
    "id_user": 1,
    "payment_method": "cash",
    "products": [
        {
            "product_id": 2,
            "amount": 3
        }
    ]
}
SELECT orders.id_order, orders.status, orders.order_time, orders.final_price, orders.payment_method, users.full_name, users.address
FROM orders
JOIN users ON users.id_user = orders.user_id
WHERE orders.id_order = 2

SELECT ordered_products.amount, products.name 
FROM ordered_products
JOIN products ON products.id_product = ordered_products.product_id
WHERE ordered_products.order_id = 2
*/









/////////////////////////////////////////////////////////////////////////////
//Functions & Middlewares

async function findOrder (req, res, next) {
    let orderFound = await orders.getById(sequelize, req.params.id);
    if (orderFound.length === 0) {
        return res.status(404).json({ Error: 'Not Found' });
    }
    next()
}
async function findProduct (req, res, next) {
    try {
    let productFound = await products.getById(sequelize, req.params.id);
    if (productFound.length === 0) {
        return res.status(404).json({ Error: 'Not Found' });
    }
    next()
    }
    catch {
        res.status(400).json({Error: 'Bad request'})
    }
};
async function existantProduct (req, res, next) {
    try {const { name } = req.body;
        console.log(name)
        const productExist = await products.getByName(sequelize, name)
        if (productExist.length > 0) {
            res.status(409).json({Error: 'Product already exists'})
        }
        next()
    }
    catch {
        res.status(400).json({Error: 'Bad request'})
    }
}
async function findUser (req, res, next) {
    let userFound = await users.getById(sequelize, req.params.id);
    if (userFound.length === 0) {
        return res.status(404).json({ Error: 'Not Found' });
    }
    next()
};
async function checkingInput (req, res, next) {
    const { username, full_name, email, phone, address, password } = req.body;
    if (username == undefined || email == undefined || full_name == undefined || email == undefined || phone == undefined || address == undefined || password == undefined) {
        res.status(400).json({Error: 'Bad request'})
    }
    next()
}
async function validateUserData (req, res, next) {
    const { username, email } = req.body;
    const userDataExists = await sequelize.query(
        `SELECT * FROM users
        WHERE username = '${username}' || email = '${email}'`, {
            type: sequelize.QueryTypes.SELECT
        })
    if (userDataExists.length > 0) {
        res.status(409).json({Error: 'Username is already in use'})
    }
    next()
};
function validateToken (req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ error: 'Unauthorized, please log in' });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, jwtSignature.signature);
    if (verifiedToken) {
        req.username = verifiedToken;
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized, please log in' });
    }
};
function isAdmin (req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ error: 'Unauthorized, you are not logged in' });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, jwtSignature.signature);
    if (verifiedToken.is_admin == true) {
        req.username = verifiedToken;
        next();
    } else {
        res.status(403).json({ error: 'Forbidden, you are not an admin user' });
        };
}







////////////////////////////////////////////////////////////////////////////////
//Error detection
server.use((err, req, res, next) => {
    if (!err) {
        return next()
    }
    else {
        console.log("An error has ocurred");
        res.status(500).json(err.message)
    }
})