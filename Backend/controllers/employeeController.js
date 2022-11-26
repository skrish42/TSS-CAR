const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Product Relability Lab Booking"
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.department = req.body.department;
    employee.equipment = req.body.equipment;
    employee.timeslots = req.body.timeslots;
    employee.timeslote = req.body.timeslote;

    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
            else{
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employee/addOrEdit", {
                        viewTitle: "Product Relability Lab Booking",
                        employee: req.body
                    });
                }
                else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    }).lean();
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;