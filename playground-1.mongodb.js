use ('test')

// db.rendez_vous.updateOne({
//     _id: ObjectId('65d30dd84c46c2bb253fa315')
// },{
//     $set:{
//         date:"2024-02-19T07:00:00Z"
//     }
// })


// db.rendez_vous.deleteOne({
//     _id: ObjectId('65dee215a566b17a889cab36')
// })


// db.rendez_vous.insertOne({
//      id_client: ObjectId('65cb7c40d9a64305170e60fe'),
//     id_employe: ObjectId('65cb5b6bb30d3673c42dafc0'),
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
//             id_employe: ObjectId('65cb5b6bb30d3673c42dafc0'),
//             id_service: ObjectId('65d0f90a3cd07c5568619716'),
//             date: new Date('2024-03-21T17:00:00Z'),
//             etat: true,
//             effectue: true
//         }
//     ]
// )

// db.rendez_vous.find();
// db.rendez_vous.deleteMany({ etat: true })

// db.rendez_vous.updateMany(
//     {},
//     { $set: { id_employe: ObjectId('65de11837cebe4e1a21a7f8f') } }
// )

// db.createCollection("depenses");

// db.depenses.insertMany(
//     [

//         {
//             type:"Autres dépenses",
//             date: new Date('2024-03-21'),
//             prix: 32000
//         }

//     ]
// );

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
//       $unwind: { path: "$depense", preserveNullAndEmptyArrays: true }
//     },
//     {
//       $project: {
//         _id: 0,
//         year: "$_id.year",
//         month: "$_id.month",
//         benefice: {
//           $subtract: [
//             "$total_price",
//             { $ifNull: ["$depense.total", 0] } // Si $depense.total est null, utilisez 0
//           ]
//         }
//       }
//     }
//   ]);


// db.createView("rendez_vous_with_service_details_vw", "rendez_vous", [
//     {
//       $lookup: {
//         from: "services",
//         localField: "id_service",
//         foreignField: "_id",
//         as: "service"
//       }
//     },
//     {
//       $unwind: "$service"
//     },
//     {
//       $project: {
//         _id: 1,
//         id_client: 1,
//         id_employe: 1,
//         id_service: 1,
//         date: 1,
//         etat: 1,
//         effectue: 1,
//         "service.name": 1,
//         "service.deadline": 1,
//         "service.hours": {
//           $cond: [
//             { $ne: ["$service.deadline", ""] },
//             {
//               $toInt: {
//                 $let: {
//                   vars: {
//                     hoursMatch: { $regexFind: { input: "$service.deadline", regex: /\d+h/ } }
//                   },
//                   in: { $trim: { input: "$$hoursMatch.match", chars: "h" } }
//                 }
//               }
//             },
//             0
//           ]
//         },
//         "service.minutes": {
//           $cond: [
//             { $ne: ["$service.deadline", ""] },
//             {
//               $toInt: {
//                 $let: {
//                   vars: {
//                     minutesMatch: { $regexFind: { input: "$service.deadline", regex: /\d+min/ } }
//                   },
//                   in: { $trim: { input: "$$minutesMatch.match", chars: "min" } }
//                 }
//               }
//             },
//             0
//           ]
//         }
//       }
//     },
//     {
//       $addFields: {
//         "service.hours": {
//           $cond: [
//             { $eq: ["$service.hours", null] },
//             0,
//             "$service.hours"
//           ]
//         },
//         "service.minutes": {
//           $cond: [
//             { $eq: ["$service.minutes", null] },
//             0,
//             "$service.minutes"
//           ]
//         }
//       }
//     }
//   ]);
  
  
// db.createView("rendez_vous_summary_view", "rendez_vous_with_service_details_vw", [
//   {
//     $match: {
//       etat: true,
//       effectue: true
//     }
//   },
//   {
//     $group: {
//       _id: {
//         year: { $year: "$date" },
//         month: { $month: "$date" },
//         id_employe: "$id_employe"
//       },
//       totalHours: { $sum: "$service.hours" },
//       totalMinutes: { $sum: "$service.minutes" },
//       count: { $sum: 1 }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       year: "$_id.year",
//       month: "$_id.month",
//       id_employe: "$_id.id_employe",
//       totalHours: 1,
//       totalMinutes: 1,
//       count: 1
//     }
//   }
// ]);

db.rendez_vous_summary_view.find();
  

 
  
// db.offre_specials.insertOne({
//     id_service: ObjectId('65d0f90a3cd07c5568619719'),
//     date_debut: new Date('2024-02-27'),
//     date_fin: new Date('2024-02-29'),
//     offre:15
// })  

// db.rendez_vous.find();

// db.createView("total_gain_par_mois_vw", "chiffre_affaire_mois_vw", [
//     {
//       $group: {
//         _id: {
//           year: "$year",
//           month: "$month"
//         },
//         total_price: { $sum: "$totalPrice" }
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         year: "$_id.year",
//         month: "$_id.month",
//         total_price: 1
//       }
//     }
//   ]);
  
  
// db.createView("benefice_par_mois_vw", "total_gain_par_mois_vw", [
//   {
//     $lookup: {
//       from: "total_depense_par_mois_vw",
//       let: { year: "$year", month: "$month" },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ["$_id.year", "$$year"] },
//                 { $eq: ["$_id.month", "$$month"] }
//               ]
//             }
//           }
//         }
//       ],
//       as: "depense"
//     }
//   },
//   {
//     $unwind: { path: "$depense", preserveNullAndEmptyArrays: true }
//   },
//   {
//     $project: {
//       _id: 0,
//       year: 1,
//       month: 1,
//       benefice: {
//         $subtract: [
//           "$total_price",
//           { $ifNull: ["$depense.total", 0] } // Si $depense.total est null, utilisez 0
//         ]
//       }
//     }
//   }
// ]);

// db.rendez_vous.find();