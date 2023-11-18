const User = require("./User")
const Blogpost = require("./Blogpost")
const Comment = require("./Comment")

User.hasMany(Blogpost, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

Blogpost.belongsTo(User, {
  foreignKey: "user_id"
})

Blogpost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE"
})

Comment.belongsTo(Blogpost, {
  foreignKey: "blogpost_id"
})

// SQL Relationships Part I:
// One-To-One OR One-To-Many
// ============================
// hasOne always goes on the model that does NOT have the foreign key
// belongsTo always goes on the model that DOES have the foreign key
ModelA.hasOne(ModelB, {
  foreignKey: 'A_id',
  onDelete: 'CASCADE'
})
ModelB.belongsTo(ModelA,{
  foreignKey: 'A_id',
  onDelete: 'CASCADE'
})

User.belongsToMany(Game, {
  through: {
    model: Feedback,
    unique: false
  },
  as: 'gameuser' 
})

Game.belongsToMany(User, {
  through: {
    model: Feedback,
    unique: false
  },
  as: 'usergame' 
})
//  
