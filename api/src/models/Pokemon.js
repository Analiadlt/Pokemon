const { DataTypes , UUID , UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false,},
    life:{ type: DataTypes.STRING},
    strength:{ type: DataTypes.STRING},
    defender:{ type: DataTypes.STRING},
    speed:{ type: DataTypes.STRING},
    height:{ type: DataTypes.INTEGER},
    weight:{ type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING},
  }
 // ,{ timestamps: false}
 );
};