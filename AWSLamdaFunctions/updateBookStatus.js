const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {

    const getparams = {
        "TableName": "books",
        Key: {
            id : event.id
        },
        UpdateExpression: "set #expressionValue = :val1 , #expressionValue1 = :val2",
        ExpressionAttributeNames: {
            '#expressionValue': 'status',
            '#expressionValue1':'rentedby'
        },
        ConditionExpression: "id = :val3",
        ExpressionAttributeValues: {
            ":val1":event.statusupdateto,
            ":val2":event.rentedby,
            ":val3":event.id
        },
        "ReturnValues": "ALL_NEW"
    };

    console.log("Updating the item...");

    docClient.update(getparams, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }


        const response = {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods" : "OPTIONS,POST",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                "X-Requested-With" : "*"
            },
            body: data,
        };

        callback(null, response);
    });

};