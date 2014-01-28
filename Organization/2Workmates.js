var g = 'test1';
loginByPassword(g, 'a');
//var y = ds.Employee({login: g});
var x = ds.Workmate.all();
x.toArray('fullName, title, relation, evaluationComments');
//y;
//ds.Employee.query('title = "Vice President*"');