
// /!\ Remove DataClass level permissions first

loginByPassword('Dan','a'); 

var x = ds.Employee.all()[0]; 

x.firstName = "Robert";
x.lastName = "Smith";
//x.lastName = "Jones";

x.save();
ds.Employee.all()[0]