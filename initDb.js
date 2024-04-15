import {
    getPool,
    MYSQL_DATABASE_NAME
} from './getPool.js';

const initDb = async () => {
    try {
        let pool = await getPool();

        //eliminando BBDD si existe
        await pool.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE_NAME}`);

        await pool.query(`CREATE DATABASE ${MYSQL_DATABASE_NAME}`);

        await pool.query(`USE ${MYSQL_DATABASE_NAME}`);

        await pool.query(`
        CREATE TABLE addresses (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            street VARCHAR(100) NOT NULL,
            postalCode VARCHAR(100) NOT NULL,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        await pool.query(`
            CREATE TABLE estudiantes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                id_address INT UNSIGNED,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                birthdate DATETIME NOT NULL,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (id_address) REFERENCES addresses(id)
        )
        `);
        console.log('BBDD creada correctamente....');
    } catch (error) {
        console.log(error);
    }
}

export {
    initDb
};