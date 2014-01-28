var x1 = ds.Person(3); //get a reference to the entity

x1.firstName = "Fred";

try
{
	x1.save(); //not allowed because stamps don't match
}
catch (e)
{
	e;
}