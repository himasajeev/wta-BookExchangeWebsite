'use strict';

module.exports=(sequelize,Datatypes)=>{
    return sequelize.define('book_bought_by',{},{
        timestamps:false,
        freezeTableName:true
    })
}