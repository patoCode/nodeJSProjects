const mongose = require('mongoose');
const { database } = require('./keys')


mongose.connect(database.URI, {
  useNewUrlParser: true
})
      .then(db=> console.log('DB is connect'))
      .catch(err => console.error(err));
