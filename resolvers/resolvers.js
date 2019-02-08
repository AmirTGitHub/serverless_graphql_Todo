const AWS = require("aws-sdk");
const uuid = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.create = async data => {
  console.log("data", data);
  const timeStamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      taskText: data.taskText,
      id: uuid.v1(),
      createdAt: timeStamp,
      editedAt: timeStamp,
      checked: data.checked
    }
  };
  try {
    const data = await dynamoDb.put(params).promise();
    return params.Item;
  } catch (error) {
    return { error: `couldn't post the data. you have this` };
  }
};

exports.list = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };
  try {
    const data = await dynamoDb.scan(params).promise();
    const finalData = await data.Items;
    console.log("DATA FROM finalLIST", finalData);
    return finalData;
  } catch (error) {
    return { error: `couldn't get the list of tasks` };
  }
};

exports.item = async id => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id }
  };
  try {
    const data = await dynamoDb.get(params).promise();
    const retrievedData = await data.Item;
    console.log("ReTRIVED", retrievedData);
    return retrievedData;
  } catch (error) {
    return { error: `couldn't get the Item` };
  }
};

exports.delete = async id => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id }
  };
  try {
    const data = await dynamoDb.delete(params).promise();
    console.log("DELETED DATA", data);
    return data;
  } catch (error) {
    return { error: `couldn't delete the Item` };
  }
};

exports.updateTodoText = async data => {
  const timeStamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: data.id },
    UpdateExpression: "set taskText = :taskText , editedAt = :editedAt",
    ExpressionAttributeValues: {
      ":taskText": data.taskText,
      ":editedAt": timeStamp
    },
    ReturnValues:"UPDATED_NEW"
  };
  try {
    const promiseData = await dynamoDb.update(params).promise();
    const editedData = await promiseData.Attributes
    return editedData;
  } catch (error) {
      console.log(error)
    return { error: `couldn't update the todo text` };
  }
};

exports.completeTask = async data => {
  const timeStamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: data.id },
    UpdateExpression: "set checked =:checked  , editedAt = :editedAt",
    ExpressionAttributeValues: {
      ":checked":data.checked,
      ":editedAt": timeStamp
    },
    ReturnValues:"UPDATED_NEW"
  };
  try {
    const promiseData = await dynamoDb.update(params).promise();
    const editedData = await promiseData.Attributes;
    return editedData;
  } catch (error) {
    return { error: `couldn't mark the task completed` };
  }
};
