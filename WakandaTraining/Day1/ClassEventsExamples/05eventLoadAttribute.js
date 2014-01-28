
var projects = ds.Project.query('foldersToProcess.active == true');
projects;
projects.foldersToProcess.toArray('folderName, active, fileList');

var topPath = ds.getModelFolder().path + 'Day1/FilesForOnLoad/';		
projects.forEach(function(theProject){
	theProject.processFolders(topPath);
});

projects.foldersToProcess.toArray('folderName, active, fileList');


