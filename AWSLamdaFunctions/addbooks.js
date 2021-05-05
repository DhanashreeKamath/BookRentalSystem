const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {


    var count = 0 ;
    const getparams = {
        TableName: "books",
        Key:"id"
    };

    docClient.scan(getparams, onScan);

    function onScan(err, data) {


        if(event.title != "" && event.author !="")
        {

            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {

                console.log("Scan succeeded.");
                data.Items.forEach(function(users) {
                    count++;
                    console.log("displaying ID"+count);
                });

                count = count + 1 ;
            }
            const params = {
                Item: {
                    id : count,
                    active: Boolean(true),
                    rentedby: "admin",
                    title: event.title,
                    author: docClient.createSet(event.author),
                    status: "available"
                },
                TableName: "books"
            };
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
                body: JSON.stringify('Book added successfully!'),
            };

            docClient.put(params, function(err, data) {
                if(err){
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            });

            callback(null, response);

        }
        else{

            console.log("Inside if check");
            const response = {
                statusCode: 200,
                headers: {
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Methods" : "OPTIONS,POST",
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Credentials": true,
                    "X-Requested-With" : "*"
                },
                body: JSON.stringify('input is empty'),
            };
            callback(null, response);

        }
    }


};