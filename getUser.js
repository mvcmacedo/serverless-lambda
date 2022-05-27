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

    const { pathParameters } = normalizeEvent(event);

    const params = {
        TableName: tableName,
    };

    try {
        let data = {};
        if (pathParameters && pathParameters['userId']) {
            data = await dynamo
                .get({
                    ...params,
                    Key: {
                        userId: pathParameters['userId'],
                    },
                })
                .promise();
        } else {
            data = await dynamo.scan(params).promise();
        }

        console.log({
            message: 'User found',
            data: JSON.stringify(data),
        });

        return buildResponse(200, data);
    } catch (err) {
        console.error(err);
        return buildResponse(500, 'Somenthing went wrong');
    }
};
