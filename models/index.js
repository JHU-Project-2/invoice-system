const User = require('./User');
const Company = require('./Company');
const Contact = require('./Contact');



// Contact.belongsTo(Company, {
//     foreignKey: 'company_id',
//     onDelete: "cascade"
// });

Company.hasOne(Contact, {
    foreignKey: 'company_id',
    onDelete: "cascade"
})

module.exports = { User, Company, Contact };
