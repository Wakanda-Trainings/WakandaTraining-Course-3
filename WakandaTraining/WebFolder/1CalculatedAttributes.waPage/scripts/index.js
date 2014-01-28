
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textField2 = {};	// @textField
	var textField1 = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	textField2.change = function textField2_change (event)// @startlock
	{// @endlock
		if (vAddress.length > 0)
		{
			var qString = 'address == "' + vAddress + '"';
			source.person.query(qString);
			vName = '';
			source.vName.autoDispatch();
		}
	};// @lock

	textField1.change = function textField1_change (event)// @startlock
	{// @endlock
		if (vName.length > 0)
		{
			
			var qString = 'fullName == "' + vName + '"';
			source.person.query(qString);
			vAddress = '';
			source.vAddress.autoDispatch();
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textField2", "change", textField2.change, "WAF");
	WAF.addListener("textField1", "change", textField1.change, "WAF");
// @endregion
};// @endlock
