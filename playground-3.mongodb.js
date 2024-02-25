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
//         }
//     }
// ]);


db.createView("nbre_reservation_jour_vw", "rendez_vous", [
    {
        $group: {
            _id: {
                service: "$id_service",
                year: { $year: "$date" },
                month: { $month: "$date" },
                day: { $dayOfMonth: "$date" }
            },
            count: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "services",
            localField: "_id.service",
            foreignField: "_id",
            as: "serviceInfo"
        }
    },
    {
        $unwind: "$serviceInfo"
    },
    {
        $project: {
            _id: 0,
            service: "$serviceInfo.name",
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day",
            count: 1
        }
    }
]);

db.nbre_reservation_jour_vw.find();