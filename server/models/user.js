var bcrypt = require("bcryptjs");
const saltRounds = 10;


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    Fname:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:false
    },
    Lname: {
      type:DataTypes.STRING,
      allowNull:true,
      unique:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };
  User.beforeCreate(function(user) {
    //console.log(user.password+" "+saltRounds);
    console.log(user);
        user.password = bcrypt.hashSync(user.password, saltRounds);
      });
      return User;
    };
