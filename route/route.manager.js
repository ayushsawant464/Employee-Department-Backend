const userRoute = require('./v1/user.route');
const authRoute = require('./v1/auth.route');
const helloRoute = require('./v1/hello.route');
const employeeRoute = require('./v1/employee.route');
const departmentRoute = require('./v1/department.route');

const routeManager = (app) => {

    // API V1 Routes
    app.use('/v1/', helloRoute);
    app.use('/v1/auth', authRoute);
    app.use('/v1/user', userRoute);
    
    app.use('/v1/department',departmentRoute);
    app.use('/v1/employee/',employeeRoute);
    
}

module.exports = routeManager;