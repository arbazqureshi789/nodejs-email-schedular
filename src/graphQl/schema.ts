import { buildSchema } from 'graphql';

export const querySchema = buildSchema(`

    type RegisteredEmail{
        id: String!
        email: String!
    }

    type rootQueries{
        registerEmail(email:String!):RegisteredEmail!
        allRegisteredEmail:[RegisteredEmail]!
    }

    schema {
        query: rootQueries
    }
`);
