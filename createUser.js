const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const buildResponse = (status, body) => {
    return {
        statusCode: status,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    };
  };
  
  const normalizeEvent = event => {
    return {
        method: event['requestContext']['http']['method'],
        data: event['body'] ? JSON.parse(event['body']) : {},
        querystring: event['queryStringParameters'] || {},
        pathParameters: event['pathParameters'] || {},
    };
  };

exports.handle = async event => {
    if (process.env.DEBUG) {
        console.log({
            message: 'Received event',
            data: JSON.stringify(event),
        });
    }

    const tableName = process.env.USERS_TABLE;
    if (!tableName) {
        throw new Error('No table name defined.');
    }

    const { data } = normalizeEvent(event);

    if (!data.name) {
        return buildResponse(400, 'Name is required.');
    }

    const params = {
        TableName: tableName,
        Item: {
            ...data,
            userId: String(Date.now()),
            created_at: new Date().toISOString(),
        },
    };

    try {
        await dynamo.put(params).promise();

        console.log({
            message: 'User has been created',
            data: JSON.stringify(params),
        });

        return buildResponse(201, `User ${data.name} has been created`);
    } catch (err) {
        console.error(err);
        return buildResponse(500, 'Somenthing went wrong');
    }
};