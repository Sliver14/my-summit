module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define("Registration", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Ensures the value is not an empty string
                isAlpha: true, // Ensures only alphabetic characters
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlpha: true,
            },
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true, // Assuming middleName is optional
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 5], // Example validation for country code length
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Enforces uniqueness
            validate: {
                notEmpty: true,
                isNumeric: true, // Ensures only numeric characters
            },
        },
        zone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures uniqueness
            validate: {
                isEmail: true, // Validates email format
            },
        },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        freezeTableName: true, // Prevents Sequelize from pluralizing table name
    });
    return Registration;
};
