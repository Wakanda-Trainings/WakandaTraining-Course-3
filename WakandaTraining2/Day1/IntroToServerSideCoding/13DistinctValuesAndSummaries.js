var somePeople = ds.Person.query('lastName = "Sm*"');
somePeople.lastName;
//somePeople.distinctValues('lastName');


//var someOrders = ds.Order.query('customerEmployerName == "In*"');

//someOrders.items.sum('quantity');

//someOrders.items.min('priceEach');
//someOrders.items.max('priceEach');
//someOrders.items.average('priceEach');
//someOrders.items.compute('priceEach, quantity');