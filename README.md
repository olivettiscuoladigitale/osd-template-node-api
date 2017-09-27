NODEJS TEMPLATE
=========

API backend Template

## Requirements
API backend in nodeJS and Typescript, it use express with a minimal set of vendors.  

- nodeJS 6 (https://nodejs.org/it/)    
- npm  5.x. 


## Quickstart
- clone repo  
- npm install (only on first start)  
- npm run dev  
- call the server on port 3000 => http:localhost:3000. 


## Commands
- `npm run dev` run as development with reloading on port 3000
- `npm run dev --yourEnvironment` start server with custom env: `npm run dev --stage`
- `npm start` run ./build code (production mode)
- `npm run build` create build files in ./build
- `npm run build:release` lint, create build and docs for release, use this command before release
- `npm lint` run lint code, auto executed before build
- `npm run doc` generate typedoc docs in ./doc, executed on build release

## Directory Structure





DIRECTORY STRUCTURE
-------------------
	.nyc_output				output for test and coverage. 
	 build					build directory, js transpiled file => npn run build
	 config					application envirnment configuration file
     routes					routes
	  src					application source
        api							controllers/services/models data
        interfaces					generic interfaces
        lib							globsl library
        bootstrap.ts				bootstrap file, server instance
        server.ts					entry point file
     swagger-ui				swagger ui web interface
     swaggerDef				swagger doc definition
     test					e2e test file 
     Dockerfile				Docker file definition
     licence.md				lincese file
     package.json			npm package
     readme.md				this file
     tsconfig.json			typescript configuration
     tslint.json			ts-lint configuration
    
    
    
    
## Swaggerd
Rest api are waggerred standard:  
- `/api-doc`  swagger json data definition;    
- `/doc`  swagger explorer documentation;  
  
For more info check: http://swagger.io/

## Typedoc
Typedoc is autogenerated in `/docs` and served (not production) in `/td`.


## Routing and structure
Look at json-routing for complete guide: 
[https://github.com/gimox/json-routing](https://github.com/gimox/json-routin)


## Docker
Inside directory:   

- install & run docker
- `npm run docker` -> create the container  
- http://localhost:49160 -> copy and paste in browser


## Environment
Add your config in `config/yourconfigname`.  
`default.json` config will be overwrite with your environment vars.  
To start server with custom var:  

    - start npm run dev with node_env=yourenv. 
    - start npm run dev --yourenvironment. 


## Production / Build
Set your environment NODE_ENV= production | stage | yourenvironment.  
To start build version `npm start` -> start server from `./build` folder.  
Before start server create a build: `npm run build` or `npm run build:release`.  
If you use forever or pm2 point to file: `./build/server.js`





## TEST
Change package.json key prepush in `"pre-push": ["test"]`. Enjoy with tests.
