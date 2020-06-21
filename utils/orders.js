/*Orders: traer todos, traer uno, postear uno, modificar uno */

/*SELECT order_time, payment_method, status, final_price, product_id, amount, adress, phone_number, username
FROM orders
INNER JOIN ordered_products
ON orders.id_order = ordered_products.order_id
INNER JOIN users
ON orders.user_id = users.id_user
*/