# nodejs-email-schedule-exercise

An express server which takes emails and sends them "Hello" mail using a scheduler.

## Steps to run

-   Create a .env file using .example-env
-   Configure .env variables if any change is required.
-   Install all packages using 'npm install'
-   Start server with 'npm start'

## Steps to register email

-   Perform a POST call on http://localhost:5000/graphql with graphQl query registerEmail.
-   Example {
    registerEmail(email:"example@example.com"){
    id
    email
    }
    }

-   Your email will be registered if it's not already registered. And the registerd id and email will be returned in response. Also a preview link will be logged by server to view 'hello' mail sent to user when using ethereal mail.

## Steps to retrieve register email

-   A list of all registered email can be found by performing a post operation on http://localhost:5000/graphql with graphQl query allRegisteredEmail.

-   Example {
    allRegisteredEmail{
    id
    email
    }
    }

### Uses

-   express
-   typeorm
-   nodemailer
-   node-schedule
-   postgres
