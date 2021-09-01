const User = require('./User');
const Company = require('./Company');
const Contact = require('./Contact');
const Address = require('./Address');



// Contact.belongsTo(Company, {
//     foreignKey: 'company_id',
//     onDelete: "cascade"
// });

Company.hasOne(Contact, {
    foreignKey: 'company_id',
    onDelete: "cascade"
})


Company.hasOne(Address, {
    foreignKey: "company_id",
    onDelete: "cascade",
})


module.exports = { User, Company, Contact, Address };
