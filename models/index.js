const User = require("./User")
const Blogpost = require("./Blogpost")
const Comment = require("./Comment")

// User can have many blogposts
User.hasMany(Blogpost, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// blogpost has one user
Blogpost.belongsTo(User, {
  foreignKey: "user_id"
})

//blogpost can have many comments
Blogpost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE"
})

// a comment belongs to a single blogpost
Comment.belongsTo(Blogpost, {
  foreignKey: "blogpost_id"
})

// user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// comment has one user
Comment.belongsTo(User, {
  foreignKey: "user_id"
})


module.exports = {
  User,
  Comment,
  Blogpost
};