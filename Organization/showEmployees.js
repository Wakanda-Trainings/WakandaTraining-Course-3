
loginByPassword('test4','a'); //test140
//currentUser();
var x = ds.Employee.all();

//x.toArray('fullName, login, relation, evaluationComments');

x.toArray('fullName, login, relation, salaryCalc');
