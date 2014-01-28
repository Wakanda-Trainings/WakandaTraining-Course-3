var x = ds.Person.query('ID < 100 and city = "Campbell"');
if (x.changeAttribute('city', 'Campbell'))
	x.city;
else
	'entity was locked and could no be updated';
	
