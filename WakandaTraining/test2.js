//var x = ds.Person.all();

//x.forEach(function(thePerson){
//	var y = new ds.CreditReport();
//	y.person = thePerson;
//	y.reportDate = new Date();
//	y.score = Math.round((Math.random() * 40) + 40) * 10;
//	y.save();
//	
//});
//ds.CreditReportAccess.remove();
var trackingOn = true;
//var logOn = false;

var x = ds.CreditReport.find('person.lastName = :1', 'Steinbuch')
var result = [];
for(var i = 0; i < 100; i++)
{
	result.push(x.score);	
}

x.accesses.toArray('who, when');

//var x = new ds.CreditReportAccess({
//					who : currentUser().name,
//					when : new Date(),
//					report : ds.CreditReport.find('person.lastName = :1', 'Steinbuch')
//				});
//				
//				x;