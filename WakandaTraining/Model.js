
guidedModel =// @startlock
{
	CreditReport :
	{
		events :
		{
			onLoad:function()
			{// @endlock
				if (application.trackingOn != null)
					if (application.trackingOn)
						new ds.CreditReportAccess({
							who : currentUser().name,
							when : new Date(),
							report : this
						}).save();
			}// @startlock
		}
	},
	FolderToProcess :
	{
		fileList :
		{
			events :
			{
				onLoad:function(attributeName)
				{// @endlock
					var fileNames = [];
					var modelFolder = ds.getModelFolder();
					var folderPath = modelFolder.path + 'Day1/FilesForOnLoad/' + this.folderName +'/'
					var theFolder = Folder(folderPath);
					if (theFolder.exists)
					{
						var files = theFolder.files;  
						for(var i=0; i<files.length; i++)       
						{
							fileNames.push(files[i].name);
						}
					}
					this.fileList = fileNames.join('\t');
				}// @startlock
			}
		},
		entityMethods :
		{// @endlock
			process:function(parentPath)
			{// @lock
				var thisPath = parentPath + this.folderName + '/';
				var processedPath = parentPath + 'Processed/';
				var fileNames = this.fileList.split('\t'); //doesn't re-run the On Load
				for(var i = 0; i < fileNames.length; i++)
				{
					var file = File(thisPath + fileNames[i]);
					if (file.exists)
					{
						//do something with the file
						file.moveTo(processedPath + fileNames[i] ,true); //move to processed folder
					}
				}
			}// @startlock
		}
	},
	Project :
	{
		name :
		{
			events :
			{
				onSet:function(attributeName)
				{// @endlock
					this.name = this.name.replace( /(^|\s)([a-z])/g , 
						function(m,p1,p2){ return p1+p2.toUpperCase(); } )
				}// @startlock
			}
		},
		entityMethods :
		{// @endlock
			processFolders:function(topPath)
			{// @lock
				var theFolders = this.foldersToProcess;		
				for(var i = 0; i < theFolders.length; i++)
				{
					var theFolder = theFolders[i];
					if (theFolder.active)
						if(theFolder.fileList.length > 0) //runs the On Load for fileList
							theFolder.process(topPath); //pass in the top path
				}
			}// @startlock
		},
		events :
		{
			onInit:function()
			{// @endlock
				this.startDate = new Date();
				this.status = 'New';
				//this.name = '';

				//at this point projectNumber already has
				//a sequential unique integer as a string 
				var theCount = '0000' + this.projectNumber; //pad with zeroes
				theCount = theCount.substr(-5); //last 5 digits
				var theYear = this.startDate.getFullYear().toString(); // 4 digit year
				var theMonth = (this.startDate.getMonth() + 1).toString(); //month number as string
				theMonth = ('0' + theMonth).substr(-2); //pad month with leading zero if needed
				this.projectNumber = theYear + theMonth + theCount;//combine year, month + count
				
			},// @startlock
			onRemove:function()
			{// @endlock
				var result = {error: 0};
				if (this.foldersToProcess.length > 0)
				{
					result = {error: 501, errorMessage: 'Cannot delete projects with process folders'};
				}
				else
				{
					try
					{
						ds.startTransaction();
						this.changes.remove();
						ds.commit()
					}
					catch(e)
					{
						ds.rollBack();
						result = {error: 601, errorMessage: 'Could not delete project changes'};
					}
				}
			
				
				return result;
			},// @startlock
			onSave:function()
			{// @endlock
				if (!this.isNew())
				{
					var changes = getEntityChanges(this);
					var changesText = '';
					for (var attName in changes)
					{
						changesText += attName + '\r';
						changesText += 'From: ' + changes[attName].from + '\r';
						changesText += 'To: ' + changes[attName].to + '\r\r';
					}
					
					if (changesText.length > 0)
					{
						new ds.ProjectChange({
							project: this,
							changeDate: new Date(),
							changedBy: currentUser().name,
							changes: changesText
						}).save();
					}
				}				
			},// @startlock
			onValidate:function()
			{// @endlock
				var result = {error: 0};
				var theErrors = [];
				
				if ((this.name == null) || (this.name.length == 0))
					theErrors.push('Project has no name');
					
				if (this.startDate == null)
					theErrors.push('Project has no date');
				
				if ((this.status != 'New') && (this.status != 'Active')  && (this.status != 'Inactive'))
					theErrors.push('Project has invalid status');
					
//				if ((this.managerName == null) || (this.managerName.length == 0))
//					theErrors.push('Project has no manager name');
				
				if (theErrors.length > 0)
					result = {error: 201, errorMessage: theErrors.join('\t')};
			
				return result;
				
			}// @startlock
		}
	},
	Task :
	{
		events :
		{
			onValidate:function()
			{// @endlock
				var result = {error: 0};
				
				if (this.description.length == 0)
					result = {error: 101, errorMessage: 'Task has no description'};
					
				else if (this.taskDate.toLocaleDateString() != new Date().toLocaleDateString())
					result = {error: 102, errorMessage: 'Task has invalid date'};
					
				else if ((this.taskType != 'Appointment') && (this.taskType != "Event"))
					result = {error: 103, errorMessage: 'Task has invalid type'};
					
				else if ((this.taskStatus != 'Unconfirmed') && (this.taskStatus != 'Confirmed'))
					result = {error: 104, errorMessage: 'Task has invalid status'};
				
				return result;
			},// @startlock
			onInit:function()
			{// @endlock
				this.description = '';
				this.taskType = 'Appointment';
				this.taskStatus = 'Unconfirmed';
				this.taskDate = new Date();
			}// @startlock
		}
	},
	Person :
	{
		events :
		{
			onInit:function()
			{// @endlock
				this.firstName = '';
				this.lastName = '';
				this.streetNumber = 0;
				this.streetName = '';
			}// @startlock
		},
		collectionMethods :
		{// @endlock
			changeAttribute:function(attributeName, value)
			{// @lock
				var result = true;
				ds.startTransaction();
				try
				{
					this.forEach(function(thePerson)
					{
						thePerson[attributeName] = value;
					});
					ds.commit();
				}
				catch (e)
				{
					ds.rollBack();
					result = false;
				}
				
				return result;
			}// @startlock
		},
		address :
		{
			onQuery:function(compOperator, valueToCompare)
			{// @endlock
				
				var result = '';
				var addressParts = valueToCompare.split(' ');
				var numPart = 0;
				var namePart = '';
				if (addressParts.length > 0)
				{
					numPart = Number(addressParts[0]);
					if ((numPart == null) || (numPart.toString() != addressParts[0])) //so was all digits
					{
						numPart = 0;
						namePart = valueToCompare;
					}
					else
					{
						addressParts.shift();
						namePart = addressParts.join(' ');
					}
				}
				if ((numPart != 0) || (namePart.length > 0))
				{
					if (numPart == 0) //no street number was supplied
						result = 'streetName ' + compOperator + '"' + namePart + '"';
					else if (namePart.length == 0)
						result = 'streetNumber ' + compOperator + '"' + numPart + '"';
					else { 	//both street number and name were supplied
						switch (compOperator) {
							case '==':
							case '===':
								result = 'streetNumber ' + compOperator + '"' + numPart + '"';
								result += ' and streetName ' + compOperator + '"' + namePart + '"';
								break;
							case '!=': 	//since no 'break' runs next case
							case '!==':
									/* could use this but not as fast
									result = "(firstName "+ compOperator +"'"+fname+"'";
									result += "and lastName "+ compOperator +"'"+lname+"')";
									instead use the code below */
								result = 'not (';
								result += 'streetNumber '+compOperator.substr(1) + '"' + numPart + '"';
								result += 'and streetName '+compOperator.substr(1) + '"' + namePart + '")';
								break;
							case '>': 		//all 4 handled in the case below
							case '>=': 
							case '<': 
							case '<=': 
								var compOper2 = compOperator[0]; // get the first char
								result = '(streetName = "' + namePart + '" and streetNumber ' 
								result += compOperator + '"' + numPart + '")';
								result += 'or (streetName ' + compOper2 + '"' + namePart + '")';
								break;
						}	 
					} 	
				}
				return result;
				
			},// @startlock
			onSort:function(ascending)
			{// @endlock
				if (ascending)
					return 'streetName, streetNumber';
				else
					return 'streetName desc, streetNumber desc';
			},// @startlock
			onSet:function(value)
			{// @endlock
				var addressParts = value.split(' ');
				var numPart = 0;
				var namePart = '';
				if (addressParts.length > 0)
				{
					numPart = Number(addressParts[0]);
					if ((numPart == null) || (numPart.toString() != addressParts[0])) //so was all digits
					{
						numPart = 0;
						namePart = value;
					}
					else
					{
						addressParts.shift();
						namePart = addressParts.join(' ');
					}
				}
				this.streetNumber = numPart;
				this.streetName = namePart;
			},// @startlock
			onGet:function()
			{// @endlock
				if ((this.streetNumber != null) & (this.streetNumber > 0))
					return this.streetNumber + ' ' + this.streetName;
				else
					return this.streetName;
			}// @startlock
		},
		fullName :
		{
			onSort:function(ascending)
			{// @endlock
				if (ascending)
					return 'lastName, firstName';
				else
					return 'lastName desc, firstName desc';
			},// @startlock
			onQuery:function(compOperator, valueToCompare)
			{// @endlock
				var result = null;
				var pieces = valueToCompare.split(' ');	 //break into array
				var fname = pieces[0];
				var lname = ''; //not sure they provided a full name
				if (pieces.length > 1) 	//so check
				{
					pieces.shift();//get rid of the first element
					lname = pieces.join(" "); // last name is all the rest
				}
				if (lname == '') { 	//only one piece was supplied
					if (compOperator == '==') {  	//we'll take to mean special case
					   //indicating very broad query
						result = '(firstName == "' + fname + '"';
						result += ' or lastName == "' + fname + '")';
					} 	//if
					else  	//we'll take this to mean comparison to lastName
						result = 'lastName ' + compOperator + '"' + fname + '"';
				}
				else { 	//two pieces were supplied
					switch (compOperator) {
						case '=': 		//since no 'break' runs next case
						case '==':
						case '===':
							result = 'firstName ' + compOperator + '"'+ fname + '"';
							result += ' and lastName ' + compOperator +'"'+lname + '"';
							break;
						case '!=': 	//since no 'break' runs next case
						case '!==':
								/* could use this but not as fast
								result = "(firstName "+ compOperator +"'"+fname+"'";
								result += "and lastName "+ compOperator +"'"+lname+"')";
								instead use the code below */
							result = 'not (';
							result += 'firstName '+compOperator.substr(1)+ '"'+fname+'"';
							result += 'and lastName '+compOperator.substr(1)+ '"'+lname+'")';
							break;
						case '>': 		//all 4 handled in the case below
						case '>=': 
						case '<': 
						case '<=': 
							var compOper2 = compOperator[0]; // get the first char
							result = '(lastName = "' + lname + '" and firstName ' 
							result += compOperator + '"' + fname + '")';
							result += 'or (lastName ' + compOper2 + '"' + lname+ '")';
							break;
					}	 //switch
				} 	//else
				return result;

			},// @startlock
			onSet:function(value)
			{// @endlock
				var nameParts = value.split(' ');
				if (nameParts.length > 1)
				{
					this.firstName = nameParts[0];
					nameParts.shift();
					this.lastName = nameParts.join(' ');
				}
				else
				{
					this.firstName = '';
					this.lastName = value;
				}
			},// @startlock
			onGet:function()
			{// @endlock
				return this.firstName + ' ' + this.lastName;
			}// @startlock
		},
		methods :
		{// @endlock
			importPeople:function()
			{// @lock
				var folder = ds.getModelFolder();
				if (folder != null)
				{
					var thePath = folder.path;
					var baseFolder = thePath + 'ImportData/';
					var file = File(baseFolder + 'NamesAddressesNumbers.txt');

					if (ds.Person.length == 0)
					{
						var input = TextStream(file,'read');
						if (!input.end())
						{
							var record = input.read('\r');
							if (record == 'First\tLast\tAddress\tCity\tState\tZip\tPhone') //verify that the file is in the right format
							{
								while (!input.end())
								{
									record = input.read("\r"); //read one row
									if (record != "")
									{
										var columnArray = record.split('\t');
										if (columnArray.length == 7)
										{
											var addressParts = columnArray[2].split(' ');
											var numPart = 0;
											var namePart = '';
											if (addressParts.length > 0)
											{
												numPart = Number(addressParts[0]);
												if ((numPart == null) || (numPart.toString() != addressParts[0])) //so was all digits
												{
													numPart = 0;
													namePart = columnArray[2];
												}
												else
												{
													addressParts.shift();
													namePart = addressParts.join(' ');
												}
											}
											
											var newPerson = new ds.Person({
												firstName: columnArray[0].replace(/['"]/g,''),
												lastName: columnArray[1].replace(/['"]/g,''),
												streetNumber: numPart,
												streetName: namePart,
												city: columnArray[3],
												state: columnArray[4],
												zip: columnArray[5],
												homePhone: columnArray[6]
												});
											if (newPerson.lastName != '?')
												newPerson.save();
										}
									}
								}
							}
						}	
					}
				}
			}// @startlock
		}
	}
};// @endlock
