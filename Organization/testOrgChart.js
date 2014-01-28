try
	{
		loginByPassword('Admin', 'a');
		var x = ds.Employee.find('last = "Costa"');
		x.getOrgChart(3);
	}
	catch (e)
	{
		e;
	};
//ds.Employee.length;