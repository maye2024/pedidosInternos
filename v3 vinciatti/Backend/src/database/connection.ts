import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('vinciatti', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


export default sequelize;