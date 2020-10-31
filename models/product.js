

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Product.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Product.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Product;
};





