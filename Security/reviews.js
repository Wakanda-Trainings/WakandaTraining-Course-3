//loginByPassword('Robert', 'a');
//loginByPassword('Fred', 'a');
//loginByPassword('Admin', 'b');


var x = ds.Review.all();
x.toArray('reviewScore, newSalary, employee.firstName, employee.lastName');