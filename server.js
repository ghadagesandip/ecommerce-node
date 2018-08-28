// Start our app!
import mongoose from 'mongoose';
import config from './config';
import app from './app';
import logger from './utils/logger';

const databaseConfig = config.mongo;

mongoose.Promise = global.Promise;

//connect mongodb database
mongoose.connect(databaseConfig.url,{ useNewUrlParser: true } ); 

// Handle connected event
/* mongoose.connection.on('connected', function(){
	console.info('Mongoose connected to : '+ mongoURL);
}); */

// Handle error event
mongoose.connection.on('error', function(err){
	logger.info('Mongoose connection error : ', err);
	process.exit(0);
});

// Handle disconnected event
mongoose.connection.on('disconnected', function(){
	logger.info('Mongoose disconnected.');
});

// Handle application termination event
process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		logger.info('MongoDB disconnected through application termination.');
		process.exit(0);
	});
});

const server = app.listen(app.get('port'), () => {
	/* eslint-disable-next-line no-console */
	console.log(`Express running at → ${app.get('host')}:${app.get('port')}`);
});