'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    screenName: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    oauthToken: { type: DataTypes.STRING, allowNull: false },
    oauthTokenSecret: { type: DataTypes.STRING, allowNull: false }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
