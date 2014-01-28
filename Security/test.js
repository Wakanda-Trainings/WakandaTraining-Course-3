
//include(solution.getFolder('path') + 'SHA256.js');
//var pw = Sha256.hash('Darren' + 'a')
//loginByKey('Darren',pw);

//loginByPassword('Robert','a');
//loginByPassword('Dan','a');
//loginByPassword('Dave','a');

//var securityDs = solution.getApplicationByName("Security").ds;
//var theEmployee = securityDs.Employee({login:'Dave'});
//theEmployee;
try
{
//	loginByKey('Dave','a');
	ds.Employee.all();
}
catch(e)
{
	'No Access';
}

//currentUser();