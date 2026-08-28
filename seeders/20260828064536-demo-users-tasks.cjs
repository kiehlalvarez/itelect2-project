'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { name: 'Juan Dela Cruz', email: 'juan@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maria Santos', email: 'maria@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pedro Reyes', email: 'pedro@example.com', createdAt: new Date(), updatedAt: new Date() }
    ]);

    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users";`
    );
    const userRows = users[0];

    const juan = userRows.find(u => u.email === 'juan@example.com');
    const maria = userRows.find(u => u.email === 'maria@example.com');
    const pedro = userRows.find(u => u.email === 'pedro@example.com');

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Fix fare display bug', dueDate: new Date(), completed: false, userId: juan.id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Test GPS module', dueDate: new Date(), completed: false, userId: maria.id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Update RRL document', dueDate: new Date(), completed: true, userId: pedro.id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Prepare defense slides', dueDate: new Date(), completed: false, userId: juan.id, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Submit GT8', dueDate: new Date(), completed: false, userId: maria.id, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};