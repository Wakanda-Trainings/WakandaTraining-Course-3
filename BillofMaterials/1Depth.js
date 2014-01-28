var x = ds.Product.query('ID < 100');
x = x.query('depth > 2');
//x.toArray('code, depth, name');
//x.toArray('code, depth, costOfGoods, name');

x.toArray('code, depth, costOfGoods, quantityCanMake');
