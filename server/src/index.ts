import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Answer {
    id: ID!
    text: String
    correct: Boolean
  }

  type Question {
    id: ID!
    title: String
    answers: [Answer]
  }

  type Quiz {
    id: ID!
    title: String
    questions: [Question]
  }

  type Query {
    quizzes: [Quiz]
  }
`;

const quizzes = [
  {
    id: 1,
    title: "Git test",
    questions: [
      {
        id: 11,
        title: "How to create a new branch with Git?",
        answers: [
          {
            id: 21,
            text: "git checkout -b <branch>",
            correct: true,
          },
          {
            id: 22,
            text: "git create <branch>",
            correct: false,
          },
          {
            id: 23,
            text: "git branch <branch>",
            correct: true,
          },
          {
            id: 24,
            text: "git switch -c <branch>",
            correct: true,
          },
        ],
      },
      {
        id: 12,
        title: "How to rename a branch?",
        answers: [
          {
            id: 25,
            text: "git rename <oldbranch> <newbranch>",
            correct: false,
          },
          {
            id: 26,
            text: "git branch -m <newbranch>",
            correct: true,
          },
        ],
      },
    ],
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    quizzes: () => quizzes,
  },
};


(async () => {
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
})();
