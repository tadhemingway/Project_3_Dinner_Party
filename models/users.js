module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Users.associate = function (models) {
        Users.hasMany(models.Events, {
            foreignKey: {
                allowNull: true
            }
        });

        Users.hasMany(models.Rsvps, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Users;
};