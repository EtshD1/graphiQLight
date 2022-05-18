import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { authors, books } from "./data";
import BookType from "./schemas/Book";
import AuthorType from "./schemas/Author";
import cors from "cors";

const app = express();

app.use(cors());

const RootQueryType = new GraphQLObjectType({
	name: "query",
	fields: () => ({
		book: {
			type: BookType,
			description: "A single Book",
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (parent, args) =>
				books.find((book) => book.id === args.id),
		},
		books: {
			type: new GraphQLList(BookType),
			description: "List of Books",
			resolve: () => books,
		},
		author: {
			type: AuthorType,
			description: "A single Author",
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (parent, args) => authors.find((a) => a.id === args.id),
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: "List of Authors",
			resolve: () => authors,
		},
	}),
});

const RootMutationType = new GraphQLObjectType({
	name: "mutation",
	fields: () => ({
		addBook: {
			type: BookType,
			description: "Add a Book",
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const book = {
					id: books.length + 1,
					name: args.name,
					authorId: args.authorId,
				};
				books.push(book);
				return book;
			},
		},
		addAuthor: {
			type: AuthorType,
			description: "Add a Author",
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const author = {
					id: authors.length + 1,
					name: args.name,
				};
				authors.push(author);
				return author;
			},
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType,
});

app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema,
	})
);

app.listen(8080, () => {
	console.log("Server Running at http://localhost:8080");
});
