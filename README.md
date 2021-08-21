# supreme-octo-palm-tree

## Messages API

- API built on gRPC
- Store all the results in MongoDB
- API endpoints
    - Stream all the messages for the UUID
        - Return all the messages in the first call
        - Stream all changes incrementally after that
    - Sending a text in English with transcript and UUID
        - Check for English in the transcript

## Questions API

- API built on gRPC
- Unary method to get a random question
- Redis cache to store hundreds/thousands of questions as a question bank to return quickly
- Run a cronjob to update the question bank every month (optional)
