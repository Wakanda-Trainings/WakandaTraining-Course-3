var x = ds.Person.query('ID < 100');
//x = ds.Person.query('address == "323 Fairchild Drive"');
//x = ds.Person.query('address >= "48000"');
//x = ds.Person.query('address >= "48000" and address != "Milmont*"');
//x = ds.Person.query('address == "Aborn Road');
//x = ds.Person.query('address == "25 F*');
//x = ds.Person.query('address == "Bas*" order by address');

x.toArray('streetNumber, streetName, address');
