import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLList,
} from "graphql";
import { books } from "../data";
import BookType from "./Book";

const AuthorType: GraphQLObjectType<any, any> = new GraphQLObjectType({
	name: "Author",
	description: "Author of many books",
	fields: () => ({
		id: {
			type: GraphQLNonNull(GraphQLInt),
		},
		name: {
			type: GraphQLNonNull(GraphQLString),
		},
		books: {
			type: GraphQLNonNull(GraphQLList(BookType)),
			resolve: (a) => books.filter((book) => a.id === book.authorId),
		},
	}),
});

export default AuthorType;
