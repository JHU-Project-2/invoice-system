const sequelize = require("../config/connection");
const { User, Company, Contact, Address, Project } = require("../models");
const userData = require("./userData.json");
const companyData = require("./companyData.json");
const contactData = require("./contactData.json");
const addressData = require("./addressData.json");
const projectData = require("./projectData.json");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Company.bulkCreate(companyData, {
    individualHooks: true,
    returning: true,
  });
  await Contact.bulkCreate(contactData, {
    individualHooks: true,
    returning: true,
  });
  await Address.bulkCreate(addressData, {
    individualHooks: true,
    returning: true,
  });
  await Project.bulkCreate(projectData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
