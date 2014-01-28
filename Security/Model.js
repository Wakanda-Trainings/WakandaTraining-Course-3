
guidedModel =// @startlock
{
	Invoice :
	{
		events :
		{
			onValidate:function()
			{// @endlock
				var result = {error: 0};
				if (!this.isNew())
				{
					var currSession = currentSession();
					if (!currSession.belongsTo('Admin'))
					{
						var oldEnt = ds.Invoice(this.getKey());
						if (oldEnt.postDate != null) //so invoice was already posted
							result = {error: 2000, errorMessage: "Invoice is posted and can't be changed."};
					}
				}
				return result;
			}// @startlock
		}
	},
	Transaction :
	{
		events :
		{
			onSave:function()
			{// @endlock
				var myID = sessionStorage.myID;
				if (myID != null)
					this.enteredBy = myID;
			}// @startlock
		}
	},
	Employee :
	{
		methods :
		{// @endlock
			addToCart:function(product, quantity)
			{// @lock
				var mySession = currentSession();
				var myStorage = mySession.storage; //or sessionStorage;
				var myUser = mySession.user; //or currentUser();
				var userStorage = myUser.storage;
				var myEmployeeID = myStorage.myID;
				var me = ds.Employee(myEmployeeID);
				myStorage[product] = quantity;
				userStorage[product] = quantity;
				
				debugger;
				
				
				
			},// @lock
			makeRaises:function(percent)
			{// @lock
				var all = ds.Employee.all();
				all.forEach(function(emp){
				   emp.salary += emp.salary * percent;	
				});
				
			},// @lock
			getTime:function()
			{// @lock
				return new Date().getTime();
			}// @startlock
		},
		entityMethods :
		{// @endlock
			method1:function()
			{// @lock
				return this.lastName;
			}// @startlock
		},
		salaryCalc :
		{
			onSet:function(value)
			{// @endlock
				var currSession = currentSession();
				if (currSession.belongsTo('Admin'))
					this.salary = value;
			},// @startlock
			onGet:function()
			{// @endlock
				return this.salary;
			}// @startlock
		}
	},
	Review :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
				var result = ds.Review.createEntityCollection();
				var currSession = currentSession();
				if (currSession.belongsTo('Admin'))
					result = ds.Review.all();
				else
				{
					var myID = sessionStorage.myID;
					if (myID != null)
						result = ds.Review.query('employee.ID == :1', myID);
				}
				return result;
			}// @startlock
		}
	}
};// @endlock
