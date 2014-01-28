
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		source.project.noEntities();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		source.project.all();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		source.project.save({
			
			onSuccess: function(event){
			 var1 = 'Project saved';
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
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
