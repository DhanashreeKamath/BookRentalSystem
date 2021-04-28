const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {


    const getparams = {
        TableName: "books",
        FilterExpression:  '#expressionValue = :expressionName',
        ExpressionAttributeNames: {
            '#expressionValue':"active",

        },
        ExpressionAttributeValues: {
            ':expressionName': Boolean(true),

        },
    };

    console.log("added by anu: " + event.rentedby);
    docClient.scan(getparams, onScan);

    function onScan(err, data) {

        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }


        const response = {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods" : "OPTIONS,POST,GET",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                "X-Requested-With" : "*"
            },

            body: data,
        };

        callback(null, response);
    }

};