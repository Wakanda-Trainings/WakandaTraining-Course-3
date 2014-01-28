var theNewEnt = new ds.Company();

theNewEnt.name = 'UniqueName' + theNewEnt.ID;
theNewEnt.status = '12345';

theNewEnt.comments = 'Test123';

try
{
	theNewEnt.save();
}
catch (e)
{
	e;
}





