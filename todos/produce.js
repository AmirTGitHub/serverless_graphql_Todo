const { graphql } = require('graphql')
const schema = require('../schema/schema')



module.exports.task =(event , context, callback) =>{
    const getData = graphql(schema , event.body).then(result => {
        const response = {
          statusCode:200,
          body: JSON.stringify(result)
        }
        callback(null ,response )
    })
   
   }