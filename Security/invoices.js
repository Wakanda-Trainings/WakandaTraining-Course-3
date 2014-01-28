var allInvoices = ds.Invoice.all();
allInvoices;
loginByPassword('Robert', 'a');

//var theInvoice = ds.Invoice(5);
theInvoice = ds.Invoice(8);
try
{
	theInvoice.subtotal = 666;
  	theInvoice.postDate = new Date();
	theInvoice.save()
	theInvoice;
}
catch(e)
{
	e
}






