var theNewEnt = new ds.Company();

theNewEnt.name = 'UniqueName' + theNewEnt.ID;
theNewEnt.comments = "Something";

theNewEnt.status = 'ThisIsMoreThan5Characters';

theNewEnt.save();

theNewEnt;


