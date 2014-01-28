
var theNewEnt = new ds.Company();

theNewEnt.name = 'PDM';
theNewEnt.comments = 'New';

try
{
	theNewEnt.save();
	theNewEnt;
}
catch (e)
{
	e;
}

