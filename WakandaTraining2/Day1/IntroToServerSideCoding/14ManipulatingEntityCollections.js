var orderColl = ds.Order.createEntityCollection(); //empty collection
var anOrder = ds.Order(3); //one entity
orderColl.add(anOrder); //add an entity to the collection

//var moreOrders = ds.Order.query('ID < 3');
//orderColl.add(moreOrders);

//var sCodeProducts = ds.Product.query('code == "S*"'); //returns 148 entities
//var audioNameProducts = ds.Product.query('name == "Audio*"'); //returns 32
//var sCodeAndAudioName = ds.Product.query('code == "S*" and name == "Audio*"'); //returns 19 entities
//sCodeProducts.toArray('code, name, priceEach'); //all codes starting in S

//var c1 = sCodeProducts.minus(audioNameProducts); //results in 129 entities (148 - 19)
//c1.toArray('code, name, priceEach'); //remove those names starting in Audio

//var c2 = sCodeProducts.and(audioNameProducts); // results in 19 (entities that were in both)
//c2.toArray('code, name, priceEach'); //only those in both

//var c3 = sCodeProducts.or(audioNameProducts); // results in 161 entities (148 + (32 - 19))
//c3.toArray('code, name, priceEach'); //either code starts S or name starts Audio



