const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
// sequalize and jaws DB connection
if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(
		// uses dotenv package to keep database credentials out of public repo
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: "localhost",
			dialect: "mysql",
			port: 3306,
		}
	);
}

module.exports = sequelize;
