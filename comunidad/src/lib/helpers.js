const bcrypt = require('bcryptjs')
const helpers = {}
helpers.encryptPassword = async (password) => {
  // genero patron
  const salt = await bcrypt.genSalt(10)
  //inicio del cifrado
  const hash = await bcrypt.hash(password, salt)
  return hash
}

helpers.matchPassword = async(password, savedPassword) => {
  try{
    return await bcrypt.compare(password, savedPassword)
  }catch(e){
    console.log(e)
  }
}
module.exports = helpers
