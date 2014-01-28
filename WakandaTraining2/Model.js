
guidedModel =// @startlock
{
	Person :
	{
		entityMethods :
		{// @endlock
			getChanges:function()
			{// @lock
				return getEntityChanges(this);
				
			},// @lock
			
			getLastOrderByStatus:function(status)
			{// @lock
				return this.purchaseOrders.find('status == :1 order by orderDate desc', status);
			}// @startlock
		}
	},
	Order :
	{
		total :
		{
			onGet:function()
			{// @endlock
				// Add your code here
			}// @startlock
		},
		entityMethods :
		{// @endlock
			orderSubtotal:function()
			{// @lock
				return this.items.sumExtended();
				
			}// @startlock
		}
	},
	OrderItem :
	{
		collectionMethods :
		{// @endlock
			sumExtended:function()
			{// @lock
				var result = 0;
				this.forEach(function(item){
					result += item.priceEach * item.quantity;
				});
				return result;
			}// @startlock
		}
	}
};// @endlock
