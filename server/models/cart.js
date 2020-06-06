'use strict';

module.exports=(sequelize,Datatypes)=>{
    return sequelize.define('cart',{},{
        timestamps:false,
        freezeTableName:true
    })
}