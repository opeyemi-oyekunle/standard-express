
const addData = (db, data, res)=>{
  db.create(data, (err, aData)=>{
    if(err){
      res.send('error')
    }else{
      res.json(aData)
    }
  })
}

module.exports = addData
