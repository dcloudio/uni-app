const oName = 'getUserInfo'
const nName = 'getUserProfile'

export default {
  name: __GLOBAL__.canIUse(nName) ? nName : oName
}
