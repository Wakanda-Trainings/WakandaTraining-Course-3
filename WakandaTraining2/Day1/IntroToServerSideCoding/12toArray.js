var someOrders = ds.Order.query('ID < 100');

someOrders.toArray('ID, status, orderDate'); //returns array of objects

//someOrders.toArray('ID, status, customerEmployerName'); //alias attributes treated the same

////attributes from a related entity are grouped together 
//someOrders.toArray('ID, status, customer.lastName, customer.firstName'); 

////attributes from a related entity collection are grouped into an array of objects
//someOrders.toArray('ID, status, items.productName, items.quantity'); 
