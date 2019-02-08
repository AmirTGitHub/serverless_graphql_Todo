const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const resolver = require("../resolvers/resolvers");

const taskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLString },
    taskText: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
    editedAt: { type: GraphQLInt },
    checked: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    taskList: {
      type: GraphQLList(taskType),
      resolve: (parent, args) => {
        return resolver.list();
      }
    },
    task: {
      type: taskType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        return resolver.item(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createNewTask: {
      type: taskType,
      args: {
        taskText: { type: GraphQLString },
        checked: { type: GraphQLBoolean }
      },
      resolve: (parent, args) => {
        return resolver.create(args);
      }
    },
    delete: {
      type: taskType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        resolver.delete(args.id);
        return resolver.item(args.id);
      }
    },
    updateTaskText: {
      type: taskType,
      args: {
        id: { type: GraphQLString },
        taskText: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        resolver.updateTodoText(args);
        return resolver.item(args.id);
      }
    },

    makeTaskComplete: {
      type: taskType,
      args: {
        id: { type: GraphQLString },
        checked: { type: GraphQLBoolean }
      },
      resolve: (parent, args) => {
        console.log("parent", parent);
        resolver.completeTask(args);
        return resolver.item(args.id);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
