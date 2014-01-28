
// /!\ Restore DataClass permissions first

loginByPassword('Dan','a');

//var curSes = currentSession();
//var token = curSes.promoteWith('Internal')
var result = [];

try
{
	result = ds.Employee.all().toArray();
}
catch(e)
{
	'No Access';
}

//curSes.unPromote(token);
//result;

//try
//{
//	ds.Employee.all();
//}
//catch(e)
//{
//	'No Access';
//}
