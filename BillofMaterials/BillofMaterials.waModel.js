
guidedModel =// @startlock
{
	Component :
	{
		maxCanMake :
		{
			onGet:function()
			{// @endlock
				return Math.floor(this.componentProduct.quantityTotal / this.quantity);
				
			}// @startlock
		},
		extended :
		{
			onGet:function()
			{// @endlock
				var theCost = 0;
				var theQuantity = 0;
				if (this.componentProduct != null)
					theCost = this.componentProduct.costOfGoods;
				if (this.quantity != null)
					theQuantity = this.quantity;
				return (Math.round(theCost * theQuantity * 100)/100);
			}// @startlock
		}
	},
	Product :
	{
		quantityCanMake :
		{
			onGet:function()
			{// @endlock
				var theQuantity = 0;
				if (this.isAssembly)
					theQuantity = this.composedOf.min('maxCanMake');
				return theQuantity;	
			}// @startlock
		},
		quantityTotal :
		{
			onGet:function()
			{// @endlock
				return this.quantityOnHand + this.quantityCanMake;
				
			}// @startlock
		},
		isUsed :
		{
			onGet:function()
			{// @endlock
				return (this.usedIn.length > 0)
			}// @startlock
		},
		depth :
		{
			onGet:function()
			{// @endlock
				if (!this.isAssembly)
					return 1;
				else
					return (this.composedOf.max('productDepth') + 1);
			}// @startlock
		},
		entityMethods :
		{// @endlock
			buildAssembly:function(quantityNeeded)
			{// @lock
				if (this.isAssembly)
				{
					if (this.quantityTotal >= quantityNeeded) 
					{
						var makeQuantity = 0;
						if (quantityNeeded > this.quantityOnHand)
							makeQuantity = quantityNeeded - this.quantityOnHand;
						if (makeQuantity > 0)
						{
							var theParts = this.composedOf;
							theParts.forEach(function(loopPart) {
								loopPart.componentProduct.buildAssembly(makeQuantity * loopPart.quantity);
							});
							this.quantityOnHand += makeQuantity;
						}
						this.quantityOnHand -= quantityNeeded;
						this.save();
						
					}
					else
					{
						throw 110;
					}
				}
				else
				{
						this.quantityOnHand -= quantityNeeded;
						this.save();
				}
			},// @lock
			buildProduct:function(quantityToBuild)
			{// @lock
				var quantityToBuild = quantityToBuild || null;
				if (quantityToBuild == null)
					quantityToBuild = 1;

				if (this.isAssembly) 
				{
					if (this.quantityCanMake >= quantityToBuild) 
					{
						if (quantityToBuild != 0)
						{
							ds.startTransaction();
							try
							{
								var theParts = this.composedOf;
								theParts.forEach(function(loopPart) {
									loopPart.componentProduct.buildAssembly(quantityToBuild * loopPart.quantity);
								});
								this.quantityOnHand += quantityToBuild;
								this.save();
								ds.commit();
							}
							catch (e)
							{
								ds.rollback();
							}
						}
					}
					else
						throw 100;
				}
				else
				{
						throw 90;
				}
			},// @lock
			explodedUsage:function(levelQuantity)
			{// @lock
				var levelQuantity = levelQuantity || null;
				var topObject = null; // object for top of usage

				if (levelQuantity == null)
				{
					levelQuantity = 1;
					topObject = {};
					topObject['Usage for'] = [{
						Code: this.code, 
						Name: this.name
					}]; // single element array for display purposes
				}
				var partsObject = {};
				var theParts = this.usedIn;
				theParts.forEach(function(loopPart) {
					var theCode = loopPart.partOf.code;
					partsObject[theCode] = {};
					partsObject[theCode].Name = loopPart.partOf.name;
					if (loopPart.partOf.isUsed)
					{
						var subQty = levelQuantity * loopPart.quantity;
						partsObject[theCode]['Used In'] = loopPart.partOf.explodedUsage(subQty);
					}
				});
				if (topObject != null)
				{
					if (this.isUsed)
						topObject['Used In'] = partsObject;
					return topObject;
				}
				else
					return partsObject;
			},// @lock
			explodedBOM:function(levelQuantity)
			{// @lock
				var levelQuantity = levelQuantity || null; // makes levelQuantity safe to access
				var topObject = null; // object for top of BOM

				if (levelQuantity == null) // if the function was called with no parameter
				{
					levelQuantity = 1; // then we are at the top so show only one
					topObject = {};
					topObject['Bill of Materials'] = [{
						Code: this.code, 
						Name: this.name, 
						COG: '$' + this.costOfGoods.toFixed(2)
					}]; // single element array for display purposes
				}
					
				var partsObject = {};  // object to store description at this level
				var theParts = this.composedOf;
				theParts.forEach(function(loopPart) {
					var theCode = loopPart.componentProduct.code;
					partsObject[theCode] = {};
					partsObject[theCode]['Product Name'] = loopPart.componentProduct.name;
					var info = {};
					info['COG'] = '$' + loopPart.componentProduct.costOfGoods.toFixed(2);
					info['Comp Qty'] = loopPart.quantity;
					info['Sub COG'] = '$' + loopPart.extended.toFixed(2);
					info['Tot Comp Qty'] = loopPart.quantity * levelQuantity;
					var totCOG = Math.round(loopPart.extended * levelQuantity * 100);
					info['Tot COG'] = '$' + (totCOG/100).toFixed(2);
					partsObject[theCode]['Product Cost'] = [info];
					var inventoryInfo = {};
					inventoryInfo['Qty On Hand'] = loopPart.componentProduct.quantityOnHand;
					inventoryInfo['Qty Can Make'] = loopPart.componentProduct.quantityCanMake;
					inventoryInfo['Qty Total'] = loopPart.componentProduct.quantityTotal;
					inventoryInfo['Minimum Qty'] = loopPart.componentProduct.minimumQuantity;
					partsObject[theCode]['Product Qty'] = [inventoryInfo];
					if (loopPart.componentProduct.isAssembly)
					{
						var subQty = levelQuantity * loopPart.quantity;
						partsObject[theCode].Components = loopPart.componentProduct.explodedBOM(subQty);
					}
				});
				if (topObject != null)
				{
					if (this.isAssembly)
						topObject.Components = partsObject;
					return topObject;
				}
				else
					return partsObject;
			}// @startlock
		},
		methods :
		{// @endlock
			makeParts:function()
			{// @lock
				var highProducts = ds.Product.query('buyCost >= 100');
				var midProducts = ds.Product.query('buyCost > 5 and buyCost < 100');
				var lowProducts = ds.Product.query('buyCost > 0 and buyCost <= 5');
				var baseProducts = ds.Product.query('buyCost = 0');
				
				var i = 0;

				baseProducts.forEach(function(loopProduct)
					{
						loopProduct.buyCost = Math.round(Math.random() * 100)/100;
						loopProduct.save();
						var randomPos = Math.round(Math.random() * lowProducts.length);
						var randomLoops = Math.round(Math.random() * 3);
						for (var i = 0; i < randomLoops; i++){
							if ((i + randomPos) < lowProducts.length)
							{
								new ds.Component({
								componentProduct : loopProduct,
								partOf : lowProducts[i + randomPos],
								quantity : Math.round(Math.random() * 20) + 1
								}).save();
							}
						}
					});
					
				lowProducts.forEach(function(loopProduct)
					{
						var randomPos = Math.round(Math.random() * midProducts.length);
						var randomLoops = Math.round(Math.random() * 3);
						for (var i = 0; i < randomLoops; i++){
							if ((i + randomPos) < midProducts.length)
							{
								new ds.Component({
								componentProduct : loopProduct,
								partOf : midProducts[i + randomPos],
								quantity : Math.round(Math.random() * 10) + 1
								}).save();
							}
						}
					});	
		
				midProducts.forEach(function(loopProduct)
					{
						var randomPos = Math.round(Math.random() * highProducts.length);
						var randomLoops = Math.round(Math.random() * 3);
						for (var i = 0; i < randomLoops; i++){
							if ((i + randomPos) < highProducts.length)
							{
								new ds.Component({
								componentProduct : loopProduct,
								partOf : highProducts[i + randomPos],
								quantity : Math.round(Math.random() * 10) + 1
								}).save();
							}
						}
					});	
			},// @lock
			importProducts:function()
			{// @lock
				var folder = ds.getModelFolder();
				
				if (folder != null)
				{
					var thePath = folder.path;
					var baseFolder = thePath + "ImportData/";

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
											productRow.buyCost = recordArray[2];
											var theQuantity = 0;
											if (productRow.buyCost == 0) 
												theQuantity = 350;
											else if (productRow.buyCost <= 5)
												theQuantity = 150;
											else if (productRow.buyCost < 100)
												theQuantity = 75;
											else 
												theQuantity = 40;
											productRow.quantityOnHand = Math.round((Math.random() * theQuantity) + 10);
											var offset = Math.round((Math.random() * 10));
											productRow.minimumQuantity = productRow.quantityOnHand - offset;
											productRow.save();
										}
									} else 
									{
										break;
									}
								}
							}
						}
					}	
				}
			}// @startlock
		},
		costOfGoods :
		{
			onGet:function()
			{// @endlock
				var theCost = 0;
				if (this.isAssembly)
				{
					theCost = Math.round(this.composedOf.sum('extended') * 100) / 100;
				}
				else
				{
					theCost = this.buyCost;	
				}
				return theCost;
			}// @startlock
		},
		isAssembly :
		{
			onGet:function()
			{// @endlock
				return (this.composedOf.length > 0);
			}// @startlock
		}
	}
};// @endlock

















