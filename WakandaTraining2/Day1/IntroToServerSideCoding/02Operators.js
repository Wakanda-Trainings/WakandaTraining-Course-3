
ds.Person.query('lastName == "Smith"');
//ds.Person.query('lastName == "Smith" AND firstName == "David"');

//ds.Person.query('lastName == "Sm*"'); //starts with Sm
//ds.Person.query('lastName === "Sm*"'); //equals Sm*, there are none

//ds.Product.query('name %% "Disk"'); //word in name equals Disk

//ds.Product.query('name =% "\([0-9]+\)"'); //name contains numbers in parenthesis

//ds.Person.query('lastName in [Smith, Small]');