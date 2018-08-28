import dev_config_default from './dev_config.default';
import dev_config from './dev_config';
var config = {};
//import test_config from './test_config.js';

const environment = process.env.env || 'dev';


switch (environment) {
	
case 'prod':
	//config = prod_config;
	break;

case 'test':
	//config = test_config;
	break;

default:
	config = Object.assign(dev_config_default, dev_config);
	break;
}

export default config;

