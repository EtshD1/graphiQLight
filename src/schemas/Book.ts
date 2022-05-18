import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
} from "graphql";
import { authors } from "../data";
import AuthorType from "./Author";

const BookType: GraphQLObjectType<any, any> = new GraphQLObjectType({
	name: "Book",
	description: "A book written by a specific author",
	fields: () => ({
		id: {
			type: GraphQLNonNull(GraphQLInt),
		},
		name: {
			type: GraphQLNonNull(GraphQLString),
		},
		authorId: {
			type: GraphQLNonNull(GraphQLInt),
		},
		author: {
			type: GraphQLNonNull(AuthorType),
			resolve: (book) => ({
				...authors.find((a) => book.authorId === a.id),
			}),
		},
	}),
});

export default BookType;
