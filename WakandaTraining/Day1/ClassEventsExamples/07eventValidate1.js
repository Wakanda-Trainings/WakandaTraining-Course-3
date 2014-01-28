var x = new ds.Task();
x.description = 'Training';
x.taskDate = new Date(2013, 1, 25);
x.taskType = 'Event';
x.taskStatus = 'New';
 	
try {
 	x.validate()
 	'Task is valid';
}
catch (e){
	e;
}

 //x;
		
