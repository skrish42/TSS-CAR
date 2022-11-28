const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employeee = mongoose.model('Employeee');

router.get('/', (req, res) => {
    res.render("employeee/addOrEdit2", {
        viewTitle: "Product Engineering Lab Booking"
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var employeee = new Employeee();
    employeee.fullName = req.body.fullName;
    employeee.email = req.body.email;
    employeee.mobile = req.body.mobile;
    employeee.department = req.body.department;
    employeee.equipment = req.body.equipment;
    employeee.timeslots = req.body.timeslots;
    employeee.timeslote = req.body.timeslote;

    employeee.save((err, doc) => {
        if (!err)
            res.redirect('employeee/list2');
            else{
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("employeee/addOrEdit2", {
                        viewTitle: "Product Engineering Lab Booking",
                        employeee: req.body
                    });
                }
                else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list2', (req, res) => {
    Employeee.find((err, docs) => {
        if (!err) {
            res.render("employeee/list2", {
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