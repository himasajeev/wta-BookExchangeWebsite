'use strict';

module.exports=(sequelize,Datatypes)=>{
  return sequelize.define('user',{
    username:{
      type:Datatypes.STRING,
      allowNull:false
    },
    firstname:{
      type:Datatypes.STRING,
      allowNull:false
    },
    lastname:{
      type:Datatypes.STRING,
      allowNull:false
    },
    email:{
      type:Datatypes.STRING,
      allowNull:false,
      isEmail:true
    },
    password:{
      type:Datatypes.STRING,
      allowNull:false
    }},{
    timestamps:false,
    freezeTableName:true
  })
}