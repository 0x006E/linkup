import swaggerAutogen from "swagger-autogen"

const doc = {
  info: {
    title: "LinkUp REST API", // by default: 'REST API'
    description: "A simple api for a social media website" // by default: ''
  },
  securityDefinitions: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "connect-sid"
    }
  } // by default: empty object
}

const outputFile = "./path/swagger-output.json"
const endpointsFiles = ["./src/routes/index.ts"]

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc)
