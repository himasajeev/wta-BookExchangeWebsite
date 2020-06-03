
import app from './express'
import db from  "./models"
import {list} from "./controllers/bookcontroller"






db.sequelize.sync().then(function() {
    app.listen(4001,function(err){
        if(err)
        console.log(err);
        else
        console.log("server started on 4000");

    });
    });
