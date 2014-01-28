var newPerson = new ds.Person();
var someCompany = ds.Company.find('name == "G*"');

newPerson.firstName = 'Brett';
newPerson.lastName = 'Wilson';
newPerson.employer = someCompany; //assign the entity to the attribute

//newPerson.employer = 23; //or assign the key directly
newPerson.save();

newPerson;