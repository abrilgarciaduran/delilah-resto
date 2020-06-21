/*Products: Traer todos, traer uno, Crear uno, borrarlo, modificarlo*/

function get (sql) {
    let query = sql.query(
    `SELECT * FROM products
    WHERE active = true`, {
        type: sql.QueryTypes.SELECT
    })
    return query
}

function getById (sql, id) {
    let query = sql.query(
        `SELECT * FROM products
        WHERE id_product = :id_product`, {
            replacements: {
                id_product: id
            },
            type: sql.QueryTypes.SELECT
        })
    return query
}

function getByName (sql, name) {
    let query = sql.query(
        `SELECT * FROM products
        WHERE name = :name`, {
            replacements: {
                name: name
            },
            type: sql.QueryTypes.SELECT
        })
    return query
}

function create(sql, name, price, img_url) {
    let query = sql.query(
        `INSERT INTO products (name, price, img_url, active)
        VALUES (:name , :price, :img_url, active)`, {
            replacements: {
                name,
                price,
                img_url,
                active: true
            },
            type: sql.QueryTypes.INSERT
        }
    )
    return query
}

function deleteById (sql, id) {
    let query = sql.query(
        `UPDATE products
        SET active = FALSE
        WHERE id_product = :id_product`, {
            replacements: {
                id_product: id
            },
            type: sql.QueryTypes.UPDATE
        }
    )
    return query
}

function update (sql, id, name, price, img_url) {
    let query = sql.query(
        `UPDATE products
        SET name = :name, price = :price, img_url = img_url, active = :active 
        WHERE id_product = :id`, {
            replacements: {
                id,
                name,
                price,
                img_url,
                active: true
            },
            type: sql.QueryTypes.UPDATE
        }
    )
    return query
}

module.exports = { get, getById, getByName, create, update, deleteById }