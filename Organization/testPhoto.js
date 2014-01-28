var session = currentSession();
var promoteToken = session.promoteWith('Administrator');
session.belongsTo('Administrator');

session.unPromote(promoteToken);