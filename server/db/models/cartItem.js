const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 1,
    },
    renewDay: {
        type: Sequelize.DATE,
        defaultValue: null
    }
})

module.exports = CartItem;