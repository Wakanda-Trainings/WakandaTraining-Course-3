

//var x = new ds.FolderToProcess();
//x.folderName = 'AnotherFolderToProcess'
//x.project = '20130200007';
//x.active = true

//x.save();
//ds.Project.all();


//var x = ds.FolderToProcess(3);

//var modelFolder = ds.getModelFolder();
//var folderPath = modelFolder.path + 'Day1/FilesForOnLoad/' + x.folderName +'/'
//var theFolder = Folder(folderPath);
//if (theFolder.exists)
//{
//	for (var i = 101; i < 200; i++)
//	{
//		var theFile = File(theFolder.path + 'File' + i + '.txt');
//		if (!theFile.exists)
//		{
//			theFile.create();
//			
//		}
//	}
//	
//}

//ds.FolderToProcess.all();
var x = ds.FolderToProcess(1);
var y = x.fileList;
if(x.fileList.length > 0)
{
	var g = 1;
}

x;
