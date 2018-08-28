# Picstagraph application

# Prerequisite

1. node js >= 10

# how to setup application?

1. Clone repo
e.g
> git clone http://gitlab.neosofttech.in/JavaScript/picstagraph_backend.git

2. cd in project directory
```bash
cd picstagraph_backend
```

2. Run following command to start application
```bash
npm install
```

3. create configuration files :
    i) create a file config/dev_config.js, config/test_config.js and config/prod_config.js from config/dev_config.default.js and update content based on environment

4. Run following command to start application
```bash
npm run dev
```

5. Mongo version used for now
 3.2.17

6. docker version 
18.06.1-ce

7. swagger 
version 2.0



# Important packages used
1. bcryptjs : for encrypting password
2. joi : for validating request params
3. jsonwebtoken : for creating jwt token
4. winston: for logging 

#  Convert RSA public key and private key to PEM format:
>  openssl rsa -in ~/.ssh/id_rsa -outform pem > id_rsa.pem
>  openssl rsa -in ~/.ssh/id_rsa -pubout -outform pem > id_rsa.pub.pem