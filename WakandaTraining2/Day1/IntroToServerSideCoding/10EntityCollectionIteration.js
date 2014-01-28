var entityColl = ds.Company.query('name == "Sm*"'); 

//for(var i = 0; i < entityColl.length; i++)
//{
//	var theEnt = entityColl[i];
//	//Do something here with theEnt
//	theEnt.save();//if you want to save any changes you made
//}

for(var theComp = entityColl.first(); theComp.valid(); theComp.next())
{
	//Do something here with theComp
	theComp.save();//if you want to save any changes
}

//entityColl.forEach(function(myComp){
//	//Do someth here with myComp
//	//No need to save. Wakanda will save if entity is modified.
//});