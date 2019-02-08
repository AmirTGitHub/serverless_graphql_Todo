'use strict';
const { graphql } = require('graphql')
const schema = require('./schema/schema')



module.exports.create = async(event , context) =>{
 const getData = await graphql(schema , event.body)
 const data = await getData.json()
 const response = {
   statusCode:200,
   body: data
 }
 return response
}