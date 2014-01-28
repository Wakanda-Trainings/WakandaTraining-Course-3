function getEntityChanges(theEntity){
	var result = {};
	
	var changedAttribs = theEntity.getModifiedAttributes();
	if (changedAttribs.length > 0)
	{
		var theClass = theEntity.getDataClass(); //get the entity's class
		//using its key, get a reference to the entity before it was updated
		var oldEnt = theClass(theEntity.getKey());
		
		changedAttribs.forEach(function(attName){
			var theChange = {};
			var kind = theClass[attName].kind;
			if (oldEnt[attName] == null) //formerly null
				theChange.from = null; 
			else if (kind == 'relatedEntity') //relation attribute to entity
				theChange.from = 'Key: ' + oldEnt[attName].getKey();
			else //storage attribute
				theChange.from = oldEnt[attName];

			if (theEntity[attName] == null) //now null
				theChange.to = null; 
			else if (kind == 'relatedEntity') //relation attribute to entity
				theChange.to = 'Key: ' + theEntity[attName].getKey();
			else //storage attribute
				theChange.to = theEntity[attName];
			
			result[attName] = theChange;
		});
	}
	return result;
};

