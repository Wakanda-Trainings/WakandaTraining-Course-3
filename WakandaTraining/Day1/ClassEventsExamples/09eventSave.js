var x = ds.Project('20130200007');
x.changes.orderBy('ID desc')[0].changes.split('\r');
//x;

//x.status = 'Inactive';
//x.name = 'Appropriations for Building 1';
//x.managerName = 'Mike Wilson';

//try
//{
//	x.save();
//	'Project was saved';
//}
//catch(e)
//{
//	e;
//}