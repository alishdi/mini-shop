const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const indexRoutes = require('./routes/index.routes');
const { notFoundError, errorHandler } = require('./errorhandler/notfound');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express()
const server = http.createServer(app)
require('./confiq/db');
app.use(cors());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

))

app.use(indexRoutes)



app.use(notFoundError)
app.use(errorHandler)



server.listen(3000, () => {
    console.log('server run on port http://localhost:3000');
})

