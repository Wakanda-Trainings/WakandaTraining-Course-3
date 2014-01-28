
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button3 = {};	// @button
	var documentEvent = {};	// @document
	var button1 = {};	// @button
	var button2 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		varPassword = '';
		varAccount = ''
		varCurrentUser = '';
		varLoginError = '';
		$$('container3').hide();
		$$('container1').show();
		source.varPassword.sync();
		source.varCurrentUser.sync();
		source.varLoginError.sync();
		source.varAccount.sync();
		WAF.directory.logout();

	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		var currUser = WAF.directory.currentUser();
		if (currUser != null)
			WAF.directory.logout();
		source.employee.noEntities();

	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var hash = Sha256.hash(varAccount + varPassword);
		if (WAF.directory.loginByKey(varAccount, hash))
		{
			var currUser = WAF.directory.currentUser();
			varCurrentUser = currUser.fullName;
		//	testvar = varCurrentUser;
			varLoginError = '';
			$$('container3').show();
			$$('container1').hide();
		}
		else
		{
		//	testvar = varCurrentUser;
			varCurrentUser = '';
			varLoginError = 'Invalid Login';
			$$('container3').hide();
			$$('container1').show();
		}
		varPassword = '';
		source.varPassword.sync();
		source.varCurrentUser.sync();
		source.varLoginError.sync();
		//source.testvar.sync();
		
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		source.employee.all()

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
// @endregion
};// @endlock
