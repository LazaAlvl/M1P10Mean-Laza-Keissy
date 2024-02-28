var express = require('express');
var router = express.Router();

const { RegisterClient, LoginClient, GetEmployeesAndManagers, RegisterEmploye, UpdateEmployeeInfo, DeleteEmployee,getPaginatedUsers,getUserDetails } = require('../controllers/userController');

/* GET users listing. */
router.post('/registerclient', RegisterClient);
router.post('/loginclient', LoginClient)


router.get('/index_employees', GetEmployeesAndManagers);
router.post('/create_employees', RegisterEmploye);
router.put('/update_employees/:id', UpdateEmployeeInfo);
router.delete('/delete_employees/:id', DeleteEmployee);


router.get('/getUserDetails/:id', getUserDetails);
router.get('/paginatedusers', getPaginatedUsers);
module.exports = router;
