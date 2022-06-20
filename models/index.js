const User = require('./User')
const Comment = require('./Comment')

// Define the above associate from the opposite end. 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Define a User as having many Recipes
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment };