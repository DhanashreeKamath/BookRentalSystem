const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {
    var found = "Username or password is incorrect" ;
    const getparams = {
        TableName: "users",
        Key:"id"
    };

    docClient.scan(getparams, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {

            console.log("Scan succeeded.");

            data.Items.forEach(function(users) {


                if(event.username===users.username  && (event.password===users.password))
                {
                    console.log("Inside If.");
                    found = users ;

                }

            });

        }
        const response = {
            statusCode: 200,
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods" : "OPTIONS,GET",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                "X-Requested-With" : "*"
            },
            body: found,
        };

        callback(null, response);
    }
};