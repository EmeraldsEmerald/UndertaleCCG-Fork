const util = require('./util.js')
const runDBTests = (db)=>{
  db.newPlayer("Steve","password")
  db.incXP("Steve",1500)
  db.incXP("Steve",7000)
  db.setDust("Steve",700)
  db.craftCard("Steve","Stickman BOi")
  console.log(JSON.stringify(db))
  db.dustCard("Steve","Stickman BOi")
  console.log(JSON.stringify(db))
  db.setMoney("Steve",700)
  db.buyPack("Steve")
  console.log(JSON.stringify(db))
  db.openPack("Steve")
  console.log(JSON.stringify(db))
  for(let i=0;i<2500;i++){
    db.setMoney("Steve",100)
    db.buyPack("Steve")
    db.openPack("Steve")
  }
  console.log(JSON.stringify(db))
  db.autoDisenchant("Steve")
  console.log(JSON.stringify(db))
}
module.exports = {runDBTests}
