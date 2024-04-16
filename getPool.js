import 'dotenv/config';
import mysql from 'mysql2/promise';

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE_NAME
} = process.env;

let pool;
const getPool = async () => {
    try {

        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10, //límite de 10 conexiones para acceder a la BBDD
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASSWORD,
                database: MYSQL_DATABASE_NAME,
                timezone: 'Z'
            });
        }

        return await pool;
    } catch (error) {
        console.log(error);
    }
}

export {
    getPool,
    MYSQL_DATABASE_NAME
};