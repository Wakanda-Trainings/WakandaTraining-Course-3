var x = ds.Employee.all();

x.forEach(function(emp){
	
	emp.password = directory.computeHA1(emp.login, 'a');
	
});