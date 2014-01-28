var newProject = new ds.Project();
newProject.startDate = null;
newProject.name = '';
newProject.status = 'Finished';

newProject.status = 'Active';
//newProject.managerName = 'Fred Wilson';
//newProject.name = 'Security Presentation';
newProject.startDate = new Date();

try 
{
	newProject.validate();
	'Project is valid';	
}
catch (e)
{
	e.message.split('\t');
}
