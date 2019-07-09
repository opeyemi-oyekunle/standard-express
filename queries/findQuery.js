

const one = (db, data, res)=>{
   return db.findOne(data)
   .then(data=>res.json(data))
   .catch(err=>res.send('error'))
}

const all = (db, data, res)=>{
   return db.find(data)
   .then(data=>res.json(data))
   .catch(err=>res.send('error'))
}

module.exports = {one, all}
