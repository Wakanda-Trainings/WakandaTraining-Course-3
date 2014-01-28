function myLogin2(userName, password) //uses data from specific project
{
	var securityDs = solution.getApplicationByName("Security").ds;
	var theEmployee = securityDs.Employee({login: userName});
	if (theEmployee == null) //user isn't in the dataclass
		return false; // allow directory authentication
	else	// use data from the Security project for login
	{  
		var result = {error: 1024, errorMessage: 'Invalid Login'};    //default will be to reject login
		if (theEmployee.password === directory.computeHA1(userName, password)) // see of the stored hash value is correct
		{
			var theGroups = [];
			switch (theEmployee.accessLevel){
				case 1: 
					theGroups = ['Admin'];
					break;
				case 2: 
					theGroups = ['Manager'];
					break;
				case 3: 
					theGroups = ['Worker'];
					break;
			}
			result = {
				ID: theEmployee.ID, 
				name: theEmployee.login, 
				fullName: theEmployee.firstName + ' ' + theEmployee.lastName, 
				belongsTo: theGroups};
		}
		return result; // either an error or a custom user object
	}
};

function myLoginx(userName, password) //uses data from specific project
{
	var result = {error: 1024, errorMessage: 'No login'};
	try
	{
		var securityDs = solution.getApplicationByName("Security").ds;
		var currSession = currentSession();
		var promoteToken = currSession.promoteWith('Internal');
//			result = {ID: 101, 
//					name: userName, 
//					fullName: 'No problem at all', 
//					belongsTo: ['Admin']};
		var theEmployee = securityDs.Employee({login: userName});
		if (theEmployee == null)
//			return false;
			result = {ID: 101, 
					name: userName, 
					fullName: 'No problem at all', 
					belongsTo: ['Admin']};
		else
			result = {ID: 101, 
					name: userName, 
					fullName: 'Other problem', 
					belongsTo: ['Admin']};
		
	}
	catch (e)
	{
			var forStorage = {message: 'Problem', problem: e};
//			result = {ID: 101, 
//				name: userName, 
//				fullName: 'problem', 
//				belongsTo: ['Admin'],
//				storage: forStorage};
	}
	return result; 
	
};

