
//ds.Employee.importEmployees();
//var x = ds.Employee.all();
//x.forEach(function(emp){
//	emp.title='';
//	emp.save();
//});

//ds.Employee.makeManagers();
ds.Employee.length + ' '  + ds.Employee.query('title = "Vice President*"').length + ' '  + ds.Employee.query('title = "*Director*"').length + ' '  + ds.Employee.query('title = "Manager"').length+ ' '  + ds.Employee.query('title = "Group Leader"').length  + ' ' + ds.Employee.query('title = "Associate"').length

//ds.Employee.query('ID < 10');