'use strict';

module.exports=(sequelize,Datatypes)=>{
    return sequelize.define('book_belongs_to',{},{
        timestamps:false,
        freezeTableName:true
    })
}