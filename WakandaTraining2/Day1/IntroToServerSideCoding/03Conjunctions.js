
ds.Person.query('lastName = "Smith" OR lastName = "Small"'); //OR

//ds.Person.query('lastName = "Smith" AND ID < 1000'); //AND

//ds.Order.query('not ID > 100'); //NOT

//ds.Order.query('ID < 100 except status = "shipped"'); //EXCEPT

//ds.Person.query('firstName = "John" AND lastName = "Smith" OR lastName = "Small"');

//ds.Person.query('firstName = "John" AND (lastName = "Smith" OR lastName = "Small")');