var allEmp = ds.Employee.all();

var paths = [];
var count = 0;
var emp = allEmp[0];

allEmp.forEach(function(emp){
	var num = (emp.ID % 150) + 1;
	var numString = '000' + num.toString();
	numString = numString.substr(numString.length-3) + '.jpg';
	var genderPath = '';
	if(emp.gender == 'F'){
		genderPath = 'Women/Woman_';
	} else {
		genderPath = 'Men/Man_';
	}
	path = '../People-photos/' + genderPath + numString;
	paths.push(path);
	emp.photo = path;
	emp.save();
	
});

paths;