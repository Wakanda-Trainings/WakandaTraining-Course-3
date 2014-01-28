
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var radioGroup1 = {};	// @radioGroup
	var productEvent = {};	// @dataSource
// @endregion// @endlock
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

		function drawParts() {
			var x = $$('radioGroup1').getValue();
				
				if (x == '1')
				{
					source.product.explodedBOM({
						onSuccess:function(event){
							var explodedBOM = event.result;
							var html = fillHtml(explodedBOM,0,0, false, { curid : 0 });
							$('#container1').html(html);
							$('#container1').css('overflow','scroll');
						}
					});
				} else {
					source.product.explodedUsage({
						onSuccess:function(event){
							var explodedUsage = event.result;
							var html = fillHtml(explodedUsage,0,0, false, { curid : 0 });
							$('#container1').html(html);
							$('#container1').css('overflow','scroll');
						}
					});
				}
		};		
		
// eventHandlers// @lock

	radioGroup1.click = function radioGroup1_click (event)// @startlock
	{// @endlock
		drawParts();
	};// @lock
		


	productEvent.onCurrentElementChange = function productEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var x = $$('radioGroup1').getValue();
		if (source.product.isAssembly && (x == '2'))
			$$('radioGroup1').setValue('1');
		else if (!source.product.isAssembly && (x == '1'))
			$$('radioGroup1').setValue('2');

		drawParts();
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("radioGroup1", "click", radioGroup1.click, "WAF");
	WAF.addListener("product", "onCurrentElementChange", productEvent.onCurrentElementChange, "WAF");
// @endregion
};// @endlock
