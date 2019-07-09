
const one = (db, data, res)=>{
  db.findOneAndDelete(data)
  .then(data=>res.json(data))
  .catch(err=>res.send('error'))
}

const all = (db, data, res)=>{
   db.findManyAndDelete(data)
   .then(data=>res.json(data))
   .catch(err=>res.send('error'))
}

module.exports = {one, all}
