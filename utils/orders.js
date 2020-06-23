/*Orders: traer todos, traer uno, postear uno, modificar uno */

/*SELECT order_time, payment_method, status, final_price, product_id, amount, adress, phone_number, username
FROM orders
INNER JOIN ordered_products
ON orders.id_order = ordered_products.order_id
INNER JOIN users
ON orders.user_id = users.id_user
*/

function create (sql, user_id, final_price, payment_method){
    let query = sql.query(
        `INSERT INTO orders (status, payment_method, final_price, user_id) 
         VALUES (:status, :payment_method, :final_price, :user_id)`,
        {
            replacements: {
                status: "new",
                user_id: user_id,
                payment_method: payment_method,
                final_price: final_price
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
        })
}






function updateOrderStatus (sql, id, status) {
    let query = sql.query(
        `UPDATE orders
        SET status = :status
        WHERE id = :id`, {
        replacements: {
            id,
            status: status
        },
        type: sql.QueryTypes.UPDATE
    });
    return query
};

module.exports = { create, addOrderedProduct, updateOrderStatus }