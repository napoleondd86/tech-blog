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