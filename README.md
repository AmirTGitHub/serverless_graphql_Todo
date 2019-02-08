# serverless graphql Todo
This is just a test too see how graphql works. I used `serverless`, `DynamoDB` and `gql` library to just create a Todo api using graphql.

### Installation

you have to run the instalation in the main folder also run it on the api folder too
```
 npm install 
```

to paly with the api I use `postman` and here is the lists of the different queries and mutations that you can paly with
here is the endpoint :https://wz06nc4tol.execute-api.us-east-1.amazonaws.com/dev/create

#Query

### Query list of todos

```
   query{
      taskList{
      	taskText,
      	checked, id
      }
    }

```

### Query one Todo

```
query {
      task (id:"<you need to pass an id>") {
      taskText, checked
      
      }
    }
```

#Mutation

### update a text of a todo

```
mutation{
  updateTaskText(id:"<pas an id >" , taskText:"<pass the text you wanted to update>"){
    id, taskText, checked
      }
  }
```

### update the state of the todo (make it compelet of incompelet)
```
mutation{
  makeTaskComplete(id : "<pas an id>" , checked:<true/false>){
    checked, taskText
    }
  }
```

### delete an item
```
mutation{
  delete(id:"ebfc3160-287c-11e9-99ef-55287fba1c73"){
    textTask
    }
  }
```
