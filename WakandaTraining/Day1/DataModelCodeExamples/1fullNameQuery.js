var x = ds.Person.query('ID < 100');
//x = ds.Person.query('fullName == "John Smith"');
//x = ds.Person.query('fullName == "Burke"');
//x = ds.Person.query('fullName == "Brand*"');
//x = ds.Person.query('fullName >= "Bill Wimmer');
//x = ds.Person.query('fullName == "V* B*"');
//x = ds.Person.query('fullName >= "John Smith" order by fullName');
x.toArray('firstName, lastName, fullName');
