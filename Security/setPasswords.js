

//loginByPassword('admin','a');
var x = ds.Employee.all();

x.forEach(function(x){
	x.login = x.firstName;
	x.password = directory.computeHA1(x.login, 'a')
	x.save();
});

ds.Employee.all();
//	var userName = 'Admin';
//	var securityDs = solution.getApplicationByName("Security").ds;
//	var theEmployee = securityDs.Employee({login: userName});
//	var theUser = directory.internalStore.User({name: userName})
//debugger

//var x = currentSession();
//x.user;
//var y = x.user;

//y.name;

