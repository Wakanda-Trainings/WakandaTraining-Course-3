try
	{
		loginByPassword('test2', 'a');
		var x = ds.CoWorker.all().orderBy('relation');
		x.toArray('ID, fullName, relation');
	}
	catch (e)
	{
		e;
	};
//ds.Employee.length;