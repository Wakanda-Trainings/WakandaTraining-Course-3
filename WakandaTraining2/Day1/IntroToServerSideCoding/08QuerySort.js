var qString = 'customerEmployerName == :1 ';
qString += 'order by orderDate desc';
var customerName = 'Zoza';

var x = ds.Order.query(qString, customerName);

x.toArray('ID, orderDate, status, customerEmployerName');