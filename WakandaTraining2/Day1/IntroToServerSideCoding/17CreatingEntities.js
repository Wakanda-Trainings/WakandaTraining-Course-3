var newEnt = new ds.Person();
//var theClass = ds.Person; //get a reference to the class itself
//newEnt = theClass.createEntity(); //more generic form

newEnt.firstName = 'Fred';
newEnt.lastName = 'Smith';
newEnt.phone = '(408) 555-1212';

//newEnt = new ds.Person({
//	firstName: 'John',
//	lastName: 'Brown',
//	phone: '(408) 555-6391'
//})
newEnt.save();

//can do it all together if you don't need a reference to the resulting entity
//new ds.Person({
//	firstName: 'Paul', 
//	lastName: 'Green', 
//	phone: '(408) 555-9988'
//}).save()

ds.Person.find('ID > 0 order by ID desc'); //most recently added entity