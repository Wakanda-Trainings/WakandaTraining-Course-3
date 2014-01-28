var trackingOn = true;
//ds.CreditReportAccess.all().remove();

var qString = 'person.lastName = :1 order by reportDate desc';
var creditReport = ds.CreditReport.find(qString, 'Steinbuch');
creditReport;

creditReport.accesses.toArray('who, when');

var result = [];
for(var i = 0; i < 100; i++)
{
	result.push(creditReport.score);	
}

result;
creditReport.accesses.toArray('who, when');
