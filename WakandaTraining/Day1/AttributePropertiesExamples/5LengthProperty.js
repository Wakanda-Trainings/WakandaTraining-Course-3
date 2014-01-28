var theNewEnt = new ds.Company();

theNewEnt.name = 'UniqueName' + theNewEnt.ID;
theNewEnt.comments = "Something";

try
{
	theNewEnt.status = 'ThisIsMoreThan5Characters';
	theNewEnt.save();
}
catch (e)
{
	e;
}




