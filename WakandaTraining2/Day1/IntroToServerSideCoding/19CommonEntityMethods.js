
var theEnt = new ds.Company();
//theEnt = ds.Company(50);
//theEnt.name = 'Global Tech';
//theEnt.save();
//theEnt.remove(); //delete the entity if allowed
var result = {};
result.isNew = theEnt.isNew(); //is this a new entity
result.isModified = theEnt.isModified(); //have any of the attributes been modified
result.changes = theEnt.getModifiedAttributes() //which attributes have been modified

result;