
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var varFindEvent = {};	// @dataSource
	var varDepthEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var employeeEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		checkLogin();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		checkLogin();
		
	};// @lock

	varFindEvent.onAttributeChange = function varFindEvent_onAttributeChange (event)// @startlock
	{// @endlock
		if (varFind.length > 0)
			source.employee.query('last = :1 or title = :1', varFind + '*');
		else
			source.employee.allEntities();
	};// @lock

	varDepthEvent.onAttributeChange = function varDepthEvent_onAttributeChange (event)// @startlock
	{// @endlock
		drawOrgChart();
	};// @lock
	function fillHtml(obj, level, pos, inarray, params)
	{
		var html = "";
		if (typeof obj == 'object')
		{
			if (obj == null)
				html += '<b>null</b>'+'   ';
			else if (obj.constructor == (new Array).constructor)
			{
				html += '<table class="array" >';//border="0" cellspacing=0" cellpadding="0">';
				for (var i = 0; i < obj.length; i++)
				{
					html += '<tr>';
					var musttd = true;
	 						var subobj = obj[i];
					if (typeof subobj == 'object' && subobj != null && subobj.constructor != (new Array).constructor)
					{
						musttd = false;
					}
					else
						html += '<td>';
					html += '<div class="arrayelem">'
					html += fillHtml(subobj, level+1, 0, true, params);
					html += '</div>';
					if (musttd)
						html += '</td>';
					html += '</tr>';
				}
				html += '</table>';
			}
			else
			{
				if (!inarray)
					html += '<table class="objet" border="0">';
				for (var prop in obj)
				{
					if (inarray)
						html += '<td>';
					else
					{
						html += '<tr>';
						html += '<td>';
					}
					params.curid++;
					html += '<table class="prop" border="0">'
					html += '<tr VALIGN="top">';
					html += '<td>';
					html += '<div class = "prop" xprop="propval'+params.curid+'"> <b>'+prop+': </b></div>';
					html += '</td>';
					html += '<td>';
					var subobj = obj[prop];
					if (typeof subobj == 'object' && subobj != null)
					{
						if (subobj.constructor == (new Array).constructor)
							html += '<div id="propval'+params.curid+'" class="subarray">';
						else
							html += '<div id="propval'+params.curid+'" class="subobject">';
					}
					else
						html += '<div id="propval'+params.curid+'" class="subelem">';
					html += fillHtml(subobj, level+1, 0, false, params);
					html += '</div>';
					html += '</td>';
					html += '</tr>';
					html += '</table>';
					if (inarray)
						html += '</td>';
					else
					{
						html += '</td>';
						html += '</tr>';
					}
				}
				if (!inarray)
					html += '</table>';
			}
		}
		else if (typeof obj == "string")
	 			{
			html += obj + '    ';//'"'+obj+'"'+'   ';
		}
		else if (typeof obj == "number")
		{
			html += '<i>'+obj+'</i>'+'   ';
		}
		else
			html += obj+'   ';
	            return html;
	};

	function drawOrgChart() {
		
		source.employee.getOrgChart({
			onSuccess:function(event){
				var orgChart = event.result;
				var html = fillHtml(orgChart,0,0, false, { curid : 0 });
				$('#container4').html(html);
				$('#container4').css('overflow','scroll');
			}
		}, [varDepth]);	
	};
	
	function checkLogin()
	{
//		var currUser = WAF.directory.currentUser();
//		if (currUser != null)
//		{
//			try {
//				source.employee.allEntities();
//				$$('container1').show();
//			} catch (e) {
//				source.employee.noEntities();
//			}
//			
//		}
//		else
//		{
//			source.employee.noEntities();
//			$$('container1').hide();
//			$$('login1').showLoginDialog();

//		}
	};
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		varDepth = 2;
		source.varDepth.sync();
		varFind = '';
		source.varFind.sync();
//		checkLogin();
	};// @lock

	employeeEvent.onCurrentElementChange = function employeeEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		drawOrgChart();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("varFind", "onAttributeChange", varFindEvent.onAttributeChange, "WAF");
	WAF.addListener("varDepth", "onAttributeChange", varDepthEvent.onAttributeChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("employee", "onCurrentElementChange", employeeEvent.onCurrentElementChange, "WAF");
// @endregion
};// @endlock
