var prodName = 'Audio*';
var x = ds.OrderItem.query('productName == :1', prodName);

x;

x.sumExtended();

