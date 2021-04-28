const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {

    var found = 0 ;
    const getparams = {
        TableName: "books",
        Key:"id"
    };


    docClient.scan(getparams, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else
        {

            console.log("Books Scan succeeded.");
            console.log(event.title);

            data.Items.forEach(function(books)
            {
                if((books.id === event.id) && (books.active===Boolean(true) && (books.status==="available")))
                {    console.log("Inside If of books");
                    found = books.id ;
                }
            });

            console.log("Inside else : found id is" + found);

        }

        console.log("Inside onScan : found id is" + found);

        console.log("Inside onScan : found id is username is " + event.username);
        const getparams = {
            "TableName": "books",
            Key: {
                id : found
            },
            UpdateExpression: "set #expressionValue = :val1",

            ExpressionAttributeNames: {
                '#expressionValue': 'active'
            },
            ConditionExpression: "id = :val3",
            ExpressionAttributeValues: {
                ":val1": Boolean(false),
                ":val3" : event.id
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

    }
};