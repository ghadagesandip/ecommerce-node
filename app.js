import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from './config/index';
import * as errorHandlers from './utils/errorHandlers';

const app = express();

app.set('case sensitive routing', true);
app.set('env', config.env);
app.set('port', config.port);
app.set('host', config.host);

const swaggerDocument = YAML.load('./doc/swagger/swagger.yaml');
swaggerDocument.host = config.SWAGGER_URL;

const swagOptions = {
	explorer: false,
	customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swagOptions));


app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1024mb' }));


// importing all routes
import userRoute from './modules/user/router';
import categoryRoute from './modules/category/router';
import productsRoute from './modules/products/router';

app.use('/api', userRoute, categoryRoute, productsRoute);


// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.validationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

export default app;
