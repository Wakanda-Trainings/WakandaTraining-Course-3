var x = 'Red'; //We will use this in the switch
var y = ''; //this will hold the result

//start with switch and a value then brackets
switch (x) {
	//inside brackets, use case then value followed by colon
	case 'Red':
		y += 'Red ';
		//inside each case you can have multiple lines
		//will run this code and the NEXT case's code!

	case 'Blue':
		//this code runs also since no break above
		y += 'Blue ';
		break;  //leaves the switch
		
	case 'Green': 	
		y += 'Green ';
		
}

y;