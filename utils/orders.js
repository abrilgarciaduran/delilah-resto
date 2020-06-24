/*Orders: traer todos, traer uno, postear uno, modificar uno */

/*SELECT order_time, payment_method, status, final_price, product_id, amount, adress, phone_number, username
FROM orders
INNER JOIN ordered_products
ON orders.id_order = ordered_products.order_id
INNER JOIN users
ON orders.user_id = users.id_user
*/



function create (sql, user_id, final_price, payment_method){
    var currentdate = new Date(); 
    var horaActual = currentdate.getFullYear() + "-"  
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

    let query = sql.query(
        `INSERT INTO orders (status, payment_method, final_price, user_id, order_time) 
         VALUES (:status, :payment_method, :final_price, :user_id, :order_time)`,
        {
            replacements: {
                status: "new",
                user_id: user_id,
                payment_method: payment_method,
                final_price: final_price,
                order_time: horaActual
            },
            type: sql.QueryTypes.INSERT
        });
    return query
}

function addOrderedProduct (sql, order_id, product_id, amount) {
    let query = sql.query(
        `INSERT INTO ordered_products (order_id, product_id, amount)
        VALUES (:order_id, :product_id, :amount)`,
        {
            replacements: {
                order_id: order_id,
                product_id: product_id,
                amount: amount
            },
            type: sql.QueryTypes.INSERT
        }
    );
    return query
}

function get (sql) {
    let query = sql.query(
        `SELECT orders.id_order, orders.status, orders.order_time, orders.final_price, orders.payment_method, users.full_name, users.address
        FROM orders
        JOIN users ON users.id_user = orders.user_id`, {
            type: sql.QueryTypes.SELECT
        });
        return query
}

function getById (sql, id_order) {
    let query = sql.query(
        `SELECT orders.id_order, orders.status, orders.order_time, orders.final_price, orders.payment_method, users.full_name, users.address
        FROM orders
        JOIN users ON users.id_user = orders.user_id
        WHERE orders.id_order = :id_order`, {
            replacements: {
                id_order: id_order
            },
            type: sql.QueryTypes.SELECT
        });
    return query
}

function getByUserId (sql, id_user) {
    let query = sql.query(
        `SELECT orders.id_order, orders.status, orders.order_time, orders.final_price, orders.payment_method, users.full_name, users.address
        FROM orders
        JOIN users ON users.id_user = orders.user_id
        WHERE orders.user_id = :id_user`, {
            replacements: {
                id_user: id_user
            },
            type: sql.QueryTypes.SELECT
        });
    return query
}

function getOrderedProductsById (sql, id_order) {
    let query = sql.query(
        `SELECT ordered_products.amount, products.name 
        FROM ordered_products
        JOIN products ON products.id_product = ordered_products.product_id
        WHERE ordered_products.order_id = :id_order`, {
            replacements: {
                id_order: id_order
            },
            type: sql.QueryTypes.SELECT
        });
    return query
}

function updateOrderStatus (sql, id_order, status) {
    let query = sql.query(
        `UPDATE orders
        SET status = :status
        WHERE id_order = :id_order`, {
        replacements: {
            id_order: id_order,
            status: status
        },
        type: sql.QueryTypes.UPDATE
    });
    return query
};

module.exports = { create, addOrderedProduct, get, getById, getByUserId, getOrderedProductsById, updateOrderStatus }