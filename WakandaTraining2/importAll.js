
ds.Company.remove();
ds.Person.remove();
ds.Order.remove();
ds.OrderItem.remove();
ds.Product.remove();


var folder = ds.getModelFolder();





if (folder != null)
{
	var thePath = folder.path;
	var baseFolder = thePath + 'ImportData/';
	
	
	var file = File(baseFolder + "Products.txt");
	if (ds.Product.length == 0)
	{
		var input = TextStream(file,"read");
		if (!input.end())
		{
			var record = input.read("\r");

			if (record = "ShortName\tItem_Name\tItem_Cost") //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r");//read one row
					if (record != "")
					{
						var recordArray = record.split("\t");
						if (recordArray.length > 1)
						{
							var productRow = new ds.Product();
							productRow.code = recordArray[0];
							productRow.name = recordArray[1];
							productRow.priceEach = recordArray[2];
							if (productRow.priceEach > 0)
								productRow.save();
						}
					} else 
					{
						break;
					}
				}
			}
		input.close();
		}
	}
	
	
	
	
	var file = File(baseFolder + 'CompanyNames.txt');
	
	if (ds.Company.length == 0)
	{
		
		var input = TextStream(file,'read');
		if (!input.end())
		{
			var record = input.read('\r');
			if (record = 'Company_Name') //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r").substr(1); //read one row
					if (record != "")
					{
						var newCompany = new ds.Company();
						newCompany.name = record;
						newCompany.save();
					}
				}
			}
			input.close();
		}
	}	
	
	var allCompanies = ds.Company.all();
	
	
	
	var file = File(baseFolder + 'NamesAddressesNumbers.txt');
	
	if (ds.Person.length == 0)
	{
		var input = TextStream(file,'read');
		if (!input.end())
		{
			var record = input.read('\r');
			if (record = 'First\tLast\tAddress\tCity\tState\tZip\tPhone') //verify that the file is in the right format
			{
				while (!input.end())
				{
					record = input.read("\r"); //read one row
					if (record != "")
					{
						var columnArray = record.split('\t');
						if (columnArray.length == 7)
						{
							var randomCompany = allCompanies[Math.round(Math.random() * (allCompanies.length - 1))];
							var theAddress = columnArray[2];
							
							var nextPart = columnArray[3] + ', ' + columnArray[4] + ' ' + columnArray[5];
							if ((theAddress.length > 0) && (nextPart.length > 3))
								theAddress += '\r' + nextPart;
							var newPerson = new ds.Person({
								firstName: columnArray[0].replace(/['"]/g,''),
								lastName: columnArray[1].replace(/['"]/g,''),
								billingAddress: theAddress,
								mailingAddress: theAddress,
								phone: columnArray[6],
								employer: randomCompany
								});
							if (newPerson.lastName != '?')
								newPerson.save();
						}
					}
				}
			}
		input.close();
		}	
	}

	var allPeople = ds.Person.all();
	var numOrders = 5000;
	var aStatus = ['Open', 'Shipped', 'Back Ordered', 'Closed'];
	for(var i = 1;i <= numOrders; i++)
	{
		var randomPosition = Math.round(Math.round(Math.random() * (allPeople.length - 1))/5)*5;
		var randomPerson = allPeople[randomPosition];
		var randomYear = 1990 + Math.round(Math.random() * 20);
		var randomMonth = 1 + Math.round(Math.random() * 11);
		var randomDay = 1 + Math.round(Math.random() * 27);
		var randomDate = new Date(randomYear, randomMonth,randomDay);
		var randomStatNum = 1 + Math.round(Math.random() * 4);
		if (randomStatNum > 4)
			randomStatNum = 4;
		var randomStatus = aStatus[randomStatNum - 1];	
		var newOrder = new ds.Order();
		newOrder.orderDate = randomDate;
		newOrder.customer = randomPerson;
		newOrder.status = randomStatus
		newOrder.save();
		
	}
	
	var allOrders = ds.Order.all();
	var allProducts = ds.Product.all();
	numOrders = allOrders.length;
	
	allOrders.forEach(function(theOrder){
		var randomCount = 1 + Math.round(Math.random() * 10);
		var productIDs = [];
		for(var j = 1; j <= randomCount; j++)
		{
			var randomNum = Math.random();
			var randomIndex = Math.round(randomNum * (allProducts.length - 1));
			var randomProduct = allProducts[randomIndex];
			while(productIDs.indexOf(randomProduct.ID) != -1) {
				randomProduct = allProducts[Math.round(Math.random() * (allProducts.length - 1))]
			}
			productIDs.push(randomProduct.ID);
			
			var newItem = new ds.OrderItem();
			newItem.order = theOrder;
			newItem.quantity = 1 + Math.round(Math.random() * 50);
			newItem.product = randomProduct;
			newItem.priceEach = randomProduct.priceEach;
			newItem.save();
		}
	});
	
	
	
	
	
	
}
