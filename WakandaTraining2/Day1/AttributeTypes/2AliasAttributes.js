var x = ds.Person.query('ID < 50');

x = ds.OrderItem.query('ID < 50');

x = ds.Order.query('ID < 50');

x = ds.Order.query('customerEmployerName == Regale');

x;//.toArray('firstName, lastName, employerName');
