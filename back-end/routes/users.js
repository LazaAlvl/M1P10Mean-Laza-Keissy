var express = require('express');
var router = express.Router();

const { RegisterClient, LoginClient, GetEmployeesAndManagers, RegisterEmploye, UpdateEmployeeInfo, DeleteEmployee } = require('../controllers/userController');

/* GET users listing. */
router.post('/registerclient', RegisterClient);
router.post('/loginclient', LoginClient)


router.get('/index_employees', GetEmployeesAndManagers);
router.post('/create_employee', RegisterEmploye);
router.put('/update_employee/:id', UpdateEmployeeInfo);
router.delete('/delete_employee/:id', DeleteEmployee);
module.exports = router;
