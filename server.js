const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const indexRoutes = require('./routes/index.routes');
const { notFoundError, errorHandler } = require('./errorhandler/notfound');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const expressEjsLayouts = require('express-ejs-layouts');
const { initialSocket } = require('./utils/initSocket');
const { socketHandler } = require('./socket.io');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const { SECRET_KEY_ACCESS_TOKEN } = require('./utils/constant');
const { clientHelper } = require('./utils/client');



const app = express();
const server = http.createServer(app);
const io = initialSocket(server);
socketHandler(io);
require('./confiq/db');
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', 'resource/views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('layout', './layouts/master');
app.use((req, res, next) => {
    app.locals = clientHelper(req, res)
    next()
})
app.use(cookieParser(SECRET_KEY_ACCESS_TOKEN))
app.use(session({
    secret: SECRET_KEY_ACCESS_TOKEN,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'ali practice',
            version: '1.0.0',
            description: 'تمرین فروشگاه',
            contact: {
                name: 'ali shahidi',
                email: 'alishahidi267@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        components: {
            securirySchemas: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'jwt'
                }
            }
        },
        security: [{ BearerAuth: [] }]
    },
    apis: ['./routes/**/*.js']
}),
    {
        explorer: true
    }

));

app.use(indexRoutes);



app.use(notFoundError);
app.use(errorHandler);



server.listen(3000, () => {
    console.log('server run on port http://localhost:3000');
});

