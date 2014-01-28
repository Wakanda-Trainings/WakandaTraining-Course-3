var aPerson = ds.Person(40);

aPerson.firstName = 'Dave';
aPerson.lastName = null;
aPerson.employer = ds.Company({name : 'Somatix'});

aPerson.getChanges();



