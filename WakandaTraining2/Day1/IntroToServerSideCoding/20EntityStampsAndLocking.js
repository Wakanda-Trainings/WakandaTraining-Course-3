var x1 = ds.Person(3); //get a reference to the entity
var x2 = ds.Person(3); //get a separate reference to same entity
x1;

//x1.firstName = "Fred";
//x2.firstName = "John";
//ds.startTransaction();

//x1.save(); //saves entity, stamp is updated
//x1;
//try
//{
//	x2.save(); //not allowed because stamps don't match
//}
//catch (e)
//{
//	e;
//}
//ds.rollBack();
