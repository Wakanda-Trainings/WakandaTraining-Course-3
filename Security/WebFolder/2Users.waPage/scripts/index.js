
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var button5 = {};	// @button
	var button4 = {};	// @button
	var button3 = {};	// @button
	var login1 = {};	// @login
	var button2 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var vQuantity = 0;
		var vProduct = '';
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		sources.employee.addToCart(vProduct, vQuantity);
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock

		
		try
		{
			sources.employee.makeRaises(.01);
			sources.employee.all();
			vrichText2 = 'No Error'; 
			sources.vrichText2.sync();
		}
		catch (e)
		{
			vrichText2 = 'Error'; 
			sources.vrichText2.sync();

		}
		
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock

		
		try
		{
			var result = sources.employee.getTime();
			vrichText2 = result; 
			sources.vrichText2.sync();
		}
		catch (e)
		{
			vrichText2 = 'Error'; 
			sources.vrichText2.sync();

		}
		
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		source.employee.noEntities();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		source.employee.all()
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
// @endregion
};// @endlock
