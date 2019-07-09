

const one = (db, data, set, res)=>{
   db.findOneAndUpdate(data, {$set: set}, {upsert:false})
   .then(data=>res.json(data))
   .catch(err=>res.send(err))
}

module.exports = {one}
