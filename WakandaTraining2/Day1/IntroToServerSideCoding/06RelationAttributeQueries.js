
var compName = "In*";
var x = ds.Person.query('employer.name == :1', compName); //using a relation attribute
//x = ds.Person.query('employerName == :1', compName); //same as using the alias
x.toArray('ID, firstName, lastName, employerName');

//x = ds.Order.query('items.productName == :1', "Interface*");
//x = ds.Order.query('items.productName == :1 OR items.productName = :2', "Interface*", "Multi*");
//x = ds.Order.query('items.productName == :1 AND items.productName = :2', "Interface*", "Multi*");
//x = ds.Order.query('items.productName == :1 AND items{2}.productName = :2', "Interface*", "Multi*");

//x.toArray('ID, status, items.productName');

