require('./models/db');
require('./models/db2');
require('./models/db3');
require('./models/db4');
require('./models/db5');
require('./models/db6');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');
const employeeeController = require('./controllers/employeeeController');
const employeeeeController = require('./controllers/employeeeeController');
const employeeeeeController = require('./controllers/employeeeeeController');
const employeeeeeeController = require('./controllers/employeeeeeeController');
const employaController = require('./controllers/employaController');

var app = express(); 
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout2', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout3', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout4', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout5', layoutsDir: __dirname + '/views/layouts/' }));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout6', layoutsDir: __dirname + '/views/layouts/' }));


app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee', employeeController);
app.use('/employeee', employeeeController);
app.use('/employeeee', employeeeeController);
app.use('/employeeeee', employeeeeeController);
app.use('/employeeeeee', employeeeeeeController);
app.use('/employa', employaController);