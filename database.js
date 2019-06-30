// const mongodb=require ('mongodb');
// const MongoClient=mongodb.MongoClient;
//
// let db;
//
// const MongoConnect=(callback)=>{
//                                               //password                //nameofdb is shop
//   MongoClient.connect('mongodb+srv://ray:ray@cluster0-uzqum.mongodb.net/shop?retryWrites=true',{useNewUrlParser:true})
//     .then(client => {
//         console.log('Connection Established');
//         db=client.db();
//         callback();
//     })
//     .catch(err => {
//       console.log('YAHAN ERROR');
//       console.log(err);
//     });  //insert url srv address
// };
//
// const getdb=()=>{
//   if(db) {
//     return db;
//   }
//
// };
//
// exports.MongoConnect=MongoConnect;
// exports.getdb=getdb;
