const graphql = require('graphql');
const _= require('lodash');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt
} = graphql;

//dummy data
const books = [
	{name: 'king david', genre: 'gospel', id:'1'},
	{name: 'queen faith', genre: 'drama', id:'2'},
	{name: 'queen marvey', genre: 'drama', id:'3'},
]

const authors = [
	{name: 'David Essien', age: '30', id:'1'},
	{name: 'Faith Obeten', age: '28', id:'2'},
	{name: 'Marvelous Ikpi', age: '21', id:'3'},
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:  {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args){
				//code to get data from db
				return _.find(books, {id: args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args){
				//code to get data from db
				return _.find(authors, {id: args.id});
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
});
