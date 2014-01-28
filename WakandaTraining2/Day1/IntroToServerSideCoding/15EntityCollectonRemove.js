
var prodName = "RGBS Switcher 8*";
//prodName = "RGBS Switcher (*";
//prodName = "RGBS Scaler*";
//prodName = "RGBS SCAN*";


var someItems = ds.OrderItem.query('productName == :1', prodName);

//someItems.remove();
//someItems = ds.OrderItem.query('productName == :1', prodName);

someItems.toArray('ID, priceEach, quantity, productName');