//Company.name is mandatory

var theNewEnt = new ds.Company();
theNewEnt.comments = "New";

try
{
	theNewEnt.save();
}
catch (e)
{
	e;
}

