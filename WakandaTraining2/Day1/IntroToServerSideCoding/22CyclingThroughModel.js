//cycling through all the dataclasses
var classesAttributes = {};//empty array
for(className in ds.dataClasses)
{
	classesAttributes[className] = [];
	var theClass = ds.dataClasses[className]; //class reference
	for(attribName in theClass.attributes)//cycling through all the attributes
	{
		var theAttrib = theClass[attribName];//reference to dataclass attribute
		classesAttributes[className].push({name: attribName, kind: theAttrib.kind});
	}
}

classesAttributes;