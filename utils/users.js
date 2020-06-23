/*Users: Registro, log in, Traer todos los usuarios, traer un usuario por nombre, traer un usuario por id, modificar usuario, borrar usuario,*/


function get (sql) {
    let query = sql.query(
    `SELECT * FROM users`, {
        type: sql.QueryTypes.SELECT
    })
    return query
}

function getById (sql, id) {
    let query = sql.query(
        `SELECT * FROM users
        WHERE id_user = :id_user`, {
            replacements: {
                id_user: id
            },
            type: sql.QueryTypes.SELECT
        })
    return query
}

function getByUsername (sql, username) {
    let query = sql.query(
        `SELECT * FROM users
        WHERE username = :username `, {
            replacements: {
                username: username
            },
            type: sql.QueryTypes.SELECT
        })
    return query
}

function create(sql, username, full_name, email, phone_number, address, password) {
    let query = sql.query(
        `INSERT INTO users (username, full_name, email, phone_number, address, user_password, is_active, is_admin)
        VALUES (:username, :full_name, :email, :phone_number, :address, :password, is_active, is_admin)`, {
            replacements: {
                username,
                full_name,
                email,
                phone_number,
                address,
                password,
                is_active: true,
                is_admin: false
            },
            type: sql.QueryTypes.INSERT
        }
    )
    return query
}

function update (sql, username, full_name, email, phone_number, address, user_password) {
    let query = sql.query(
        `UPDATE users
        SET username = :username, full_name = :full_name, email = :email, phone_number = :phone_number, address = :address, user_password = :user_password
        WHERE username = :username`, {
            replacements: {
                username,
                full_name,
                email,
                phone_number,
                address,
                user_password
            },
            type: sql.QueryTypes.UPDATE
        }
    )
    return query
}

function makeAdminById (sql, id) {
    let query = sql.query(
        `UPDATE users
        SET is_admin = TRUE
        WHERE id_user = :id_user`, {
            replacements: {
                id_user: id
            },
            type: sql.QueryTypes.UPDATE
        }
    )
    return query
}

function deleteById (sql, id) {
    let query = sql.query(
        `UPDATE users
        SET is_active = FALSE
        WHERE id_user = :id_user`, {
            replacements: {
                id_user: id
            },
            type: sql.QueryTypes.UPDATE
        }
    )
    return query
}

module.exports = { get, getById, getByUsername, create, update, makeAdminById, deleteById }