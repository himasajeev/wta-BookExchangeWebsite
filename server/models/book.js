'use strict';

module.exports=(sequelize,Datatypes)=>{
    return sequelize.define('book',{
            bookname :{
                type:Datatypes.STRING,
                allowNull:false,
            },
            author:{
                type:Datatypes.STRING,
                allowNull:false,
            },
            available:{
                type:Datatypes.BOOLEAN,
                default:true
            },
            subject:{
              type:Datatypes.STRING
            },
            owner:{
              type:Datatypes.STRING
            },
            imagepath:{
              type:Datatypes.STRING
            },
            price:{
              type:Datatypes.FLOAT
            }
          },
        {
            timestamps:false,
            freezeTableName:true
        });
}
