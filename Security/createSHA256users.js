include(solution.getFolder('path') + 'SHA256.js');

Sha256.hash('12364');

//var newEmp = new ds.Employee();
//newEmp.accessLevel = 2;
//newEmp.firstName = 'Darren';
//newEmp.lastName = 'Wilson';
//newEmp.login = 'Darren';
//var pw = Sha256.hash(newEmp.login + 'a');
//newEmp.password = Sha256.hash(pw + 'Wakanda');
//newEmp.save();
//newEmp;

ds.Employee.all();