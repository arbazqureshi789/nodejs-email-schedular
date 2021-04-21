import { graphqlHTTP } from 'express-graphql';
import { request, response } from 'express';

import { queryResolver } from '../graphQl/resolver';
import { querySchema } from '../graphQl/schema';

export const graphqlController = graphqlHTTP({
    schema: querySchema,
    rootValue: queryResolver,
    graphiql: true,
    context: {
        req: request,
        es: response,
    },
});
