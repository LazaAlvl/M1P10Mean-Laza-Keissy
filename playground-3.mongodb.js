use('test')
// db.users.insertMany(
//     [
//         {
//             "firstname": "Laza",
//             "lastname": "Alvl",
//             "password": "987654321",
//             "email": "laza@gmail.com",
//             "role": "Employee",
//             "number": "0320444423",
//         },  

//     ]
// )

// db.rendez_vous.find()

// db.rendez_vous.aggregate([
//     {
//         $group: {
//             _id: {
//                 service: "$id_service",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" },
//                 day: { $dayOfMonth: "$date" }
//             },
//             count: { $sum: 1 }
//         }
//     },
//     {
//         $lookup: {
//             from: "services", // Le nom de la collection des services
//             localField: "_id.service",
// db.createView("chiffre_affaire_mois_vw", "rendez_vous", [
//     {
//         $lookup: {
//             from: "services",
//             localField: "id_service",
//             foreignField: "_id",
//             as: "serviceInfo"
//         }
//     },
//     {
//         $unwind: "$serviceInfo"
//     },
//     {

//         $project: {
//             _id: 0,
//             service: "$serviceInfo.name", // Le champ "name" de la collection des services
//             year: "$_id.year",
//             month: "$_id.month",
//             day: "$_id.day",
//             count: 1
//         $match: {
//             etat: true,
//             effectué: true
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 service: "$serviceInfo.name",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" }
//             },
//             totalPrice: { $sum: "$serviceInfo.price" }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             service: "$_id.service",
//             year: "$_id.year",
//             month: "$_id.month",
//             totalPrice: 1
//         }
//     }
// ]);

// db.nbre_reservation_jour_vw.drop();
// db.nbre_reservation_mois_vw.drop();


// db.createView(
//     "nbre_reservation_mois_vw",
//     "rendez_vous",
//     [
//        {
//           $match: {
//              etat: true
//           }
//        },
//        {
//           $group: {
//              _id: {
//                 service: "$id_service",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" }
//              },
//              count: { $sum: 1 }
//           }
//        },
//        {
//           $lookup: {
//              from: "services",
//              localField: "_id.service",
//              foreignField: "_id",
//              as: "serviceInfo"
//           }
//        },
//        {
//           $unwind: "$serviceInfo"
//        },
//        {
//           $project: {
//              _id: 0,
//              service: "$serviceInfo.name",
//              year: "$_id.year",
//              month: "$_id.month",
//              count: 1
//           }
//        }
//     ]
//  )
 


// db.createView("chiffre_affaire_jour_vw", "rendez_vous", [
//     {
//         $lookup: {
//             from: "services",
//             localField: "id_service",
//             foreignField: "_id",
//             as: "serviceInfo"
//         }
//     },
//     {
//         $unwind: "$serviceInfo"
//     },
//     {
//         $match: {
//             etat: true,
//             effectue: true
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 service: "$serviceInfo.name",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" },
//                 day: { $dayOfMonth: "$date" }
//             },
//             totalPrice: { $sum: "$serviceInfo.price" }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             service: "$_id.service",
//             year: "$_id.year",
//             month: "$_id.month",
//             day: "$_id.day",
//             totalPrice: 1
//         }
//     }
// ]);

// db.createView("nbre_reservation_jour_vw", "rendez_vous", [
//     {
//         $group: {
//             _id: {
//                 service: "$id_service",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" },
//                 day: { $dayOfMonth: "$date" }
//             },
//             count: { $sum: 1 }
//         }
//     },
//     {
//         $lookup: {
//             from: "services",
//             localField: "_id.service",
//             foreignField: "_id",
//             as: "serviceInfo"
//         }
//     },
//     {
//         $unwind: "$serviceInfo"
//     },
//     {
//         $project: {
//             _id: 0,
//             service: "$serviceInfo.name",
//             year: "$_id.year",
//             month: "$_id.month",
//             day: "$_id.day",
//             count: 1
//         }
//     }
// ]);

// db.nbre_reservation_jour_vw.find();


db.chiffre_affaire_mois_vw.find();
// db.createView("chiffre_affaire_mois_vw", "rendez_vous", [
//     {
//         $lookup: {
//             from: "services",
//             localField: "id_service",
//             foreignField: "_id",
//             as: "serviceInfo"
//         }
//     },
//     {
//         $unwind: "$serviceInfo"
//     },
//     {
//         $match: {
//             etat: true,
//             effectue: true // Utilisez "effectue" au lieu de "effectué"
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 service: "$serviceInfo.name",
//                 year: { $year: "$date" },
//                 month: { $month: "$date" }
//             },
//             totalPrice: { $sum: "$serviceInfo.price" }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             service: "$_id.service",
//             year: "$_id.year",
//             month: "$_id.month",
//             day: "$_id.day",
//             totalPrice: 1
//         }
//     }
// ]);
