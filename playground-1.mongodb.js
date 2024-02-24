use ('test')


// db.rendez_vous.updateOne({
//     _id: ObjectId('65d30dd84c46c2bb253fa315')
// },{
//     $set:{
//         date:"2024-02-19T07:00:00Z"
//     }
// })


// db.rendez_vous.deleteOne({
//     _id: ObjectId('65d7ea2036e22a2979a0e113')
// })


// db.rendez_vous.insertOne({
//      id_client: ObjectId('65cb7c40d9a64305170e60fe'),
//     id_employé: ObjectId('65cb5b6bb30d3673c42dafc0'),
//     id_service: ObjectId('65d0f90a3cd07c5568619717'),
//     date: new Date('2024-02-22T11:00:00Z'),
//     etat: true,
//     effectué: true
// })


// db.rendez_vous.insertMany(
//     [
//         {
//             id_client: ObjectId('65cb7c40d9a64305170e60fe'),
//             id_employé: ObjectId('65cb5b6bb30d3673c42dafc0'),
//             id_service: ObjectId('65d0f90a3cd07c5568619716'),
//             date: new Date('2024-02-21T17:00:00Z'),
//             etat: true
//         },

//         {
//             id_client: ObjectId('65cb7c40d9a64305170e60fe'),
//             id_employé: ObjectId('65cb5b6bb30d3673c42dafc0'),
//             id_service: ObjectId('65d0f90a3cd07c5568619720'),
//             date: new Date('2024-02-23T10:00:00Z'),
//             etat: true
//         }
//     ]
// )

// db.rendez_vous.deleteMany({ etat: true })

// db.rendez_vous.updateMany(
//     {},
//     { $set: { effectué: false } } 
// )


db.rendez_vous.updateOne(
    { _id: ObjectId("65d7a97abd72299df0013b20") },
    { $set: { effectué: false } } 
);


db.rendez_vous.find()