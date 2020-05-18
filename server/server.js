
import app from './express'
import db from  "./models"





db.sequelize.sync().then(function() {
    app.listen(4000,function(err){
        if(err)
        console.log(err);
        else
        console.log("server started on 4000");
    });
    });
    