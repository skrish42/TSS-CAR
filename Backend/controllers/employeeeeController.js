const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employeeee = mongoose.model('Employeeee');

router.get('/', (req, res) => {
    res.render("employeeee/addOrEdit3", {
        viewTitle: "Product Build Lab Booking"
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var employeeee = new Employeeee();
    employeeee.fullName = req.body.fullName;
    employeeee.email = req.body.email;
    employeeee.mobile = req.body.mobile;
    employeeee.department = req.body.department;
    employeeee.equipment = req.body.equipment;
    employeeee.timeslots = req.body.timeslots;
    employeeee.timeslote = req.body.timeslote;

    employeeee.save((err, doc) => {
        if (!err)
            res.redirect('employeeee/list3');
            else{
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employeeee/addOrEdit3", {
                        viewTitle: "Product Build Lab Booking",
                        employeeee: req.body
                    });
                }
                else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list3', (req, res) => {
    Employeeee.find((err, docs) => {
        if (!err) {
            res.render("employeeee/list3", {
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