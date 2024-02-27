use ('test')

// db.rendez_vous.updateOne({
//     _id: ObjectId('65d30dd84c46c2bb253fa315')
// },{
//     $set:{
//         date:"2024-02-19T07:00:00Z"
//     }
// })


// db.rendez_vous.deleteOne({
//     _id: ObjectId('65d7087afb41d0ae884f417a')
// })


// db.rendez_vous.insertOne({
//      id_client: ObjectId('65cb7c40d9a64305170e60fe'),
//     id_employé: ObjectId('65cb5b6bb30d3673c42dafc0'),
//     id_service: ObjectId('65d0f90a3cd07c5568619717'),
//     date: new Date('2024-02-22T11:00:00Z'),
//     etat: true,
//     effectué: true
// })


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

// db.createCollection("depenses");

// db.depenses.insertMany(
//     [
//         {
//             type:"Salaire",
//             date: new Date('2024-02-01'),
//             prix: 1000000
//         },

//         {
//             type:"Loyer",
//             date: new Date('2024-02-01'),
//             prix: 350000
//         },

//         {
//             type:"Achat pièce",
//             date: new Date('2024-02-10'),
//             prix: 50000
//         },

//         {
//             type:"Autres dépenses",
//             date: new Date('2024-02-21'),
//             prix: 32000
//         }

//     ]

// db.createView("total_depense_par_mois_vw", "depenses", [
//     {
//       $group: {
//         _id: {
//           year: { $year: "$date" },
//           month: { $month: "$date" }
//         },
//         total: { $sum: "$prix" }
//       }
//     }
//   ]);

// db.createView("benefice_par_mois_vw", "total_gain_par_mois_vw", [
//     {
//       $lookup: {
//         from: "total_depense_par_mois_vw",
//         localField: "_id",
//         foreignField: "_id",
//         as: "depense"
//       }
//     },
//     {
//       $unwind: "$depense"
//     },
//     {
//       $project: {
//         _id: 0,
//         year: "$_id.year",
//         month: "$_id.month",
//         benefice: { $subtract: ["$total_price", "$depense.total"] }
//       }
//     }
//   ]);
  
db.chiffre_affaire_mois.find();