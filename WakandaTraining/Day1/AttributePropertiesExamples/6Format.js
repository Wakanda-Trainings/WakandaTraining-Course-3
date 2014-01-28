var theNewEnt = new ds.Company();

theNewEnt.name = 'UniqueName' + theNewEnt.ID;
theNewEnt.comments = 'FormatExample';
theNewEnt.creationDate = new Date();
theNewEnt.status = '12345';
theNewEnt.save();
theNewEnt;

