var someCompanies = ds.Company.query('ID < 50 order by name'); //get a collection
var someNamesArray = someCompanies.name; //using an attribute on a collection!
someNamesArray;


//var somePeople = ds.Person.query('lastName == T*');
//var someCompanies = somePeople.employer;
//someCompanies.orderBy('name');
