'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING,
    }
   })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('posts')
  }
};
