// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     const Todo = sequelize.define('todo', {
//         id: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: DataTypes.INTEGER
//         },
//         name: {
//             allowNull: false,
//             type: DataTypes.STRING,
//         },
//         done: {
//             allowNull: false,
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         },
//         userId: {
//             allowNull: false,
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'users', // This is a reference to another model
//                 key: 'id',     // This is the column name of the referenced model
//             },
//             onUpdate: 'CASCADE', // If the referenced primary key is updated, update this foreign key.
//             onDelete: 'CASCADE'  // If the referenced row is deleted, delete this row as well.
//         }
//     });

//     return Todo;
// };

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Todo = sequelize.define('todo', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        done: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        creationDate: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            defaultValue: () => new Date().toISOString().slice(0, 10)
        },
        completionDate: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // This is a reference to another model
                key: 'id',     // This is the column name of the referenced model
            },
            onUpdate: 'CASCADE', // If the referenced primary key is updated, update this foreign key.
            onDelete: 'CASCADE' 
        }
    });

    Todo.beforeSave(async (todo, options) => {
        
        if (todo.done && !todo.completionDate) {
            todo.completionDate = new Date().toISOString().slice(0, 10); // Only set the date part
        }
        if (!todo.done) {
            todo.completionDate = null;
        }
    });

    return Todo;
};
