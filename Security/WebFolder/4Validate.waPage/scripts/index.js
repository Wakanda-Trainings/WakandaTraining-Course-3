
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var button3 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		var1 = '';
		source.var1.sync();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		var1 = '';
		source.var1.sync();
		
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		source.invoice.save({
			
			onSuccess: function(event){
			 var1 = 'Invoice saved';
			 source.var1.sync();
			},		
			onError: function(error){
			 var1 = error.error[0].message;
			 source.var1.sync();
			}			
			
		});
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
// @endregion
};// @endlock
