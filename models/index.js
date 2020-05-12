'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};
console.log(config)

const sequelize=new Sequelize(config.db.database,config.db.username,config.db.password,{
  dialect:'mysql',
  host:config.db.host
})

fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//ASSOCIATIONS
db.book_belongs_to.belongsTo(db.user)
db.book_belongs_to.belongsTo(db.book)
db.book_bought_by.belongsTo(db.user)
db.book_bought_by.belongsTo(db.book)


sequelize
    .authenticate()
    .then(()=>{
      console.log("connected");
    })
    .catch(err=>{
      console.error(err);
    });

module.exports = db;
