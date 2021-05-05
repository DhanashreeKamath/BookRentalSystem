const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


exports.handler = (event, context, callback) => {
    var count = 0 ;
    const getparams = {
        TableName: "users",
        Key:"id"
    };

    docClient.scan(getparams, onScan);

    function onScan(err, data) {

        if(event.username)
        {   var found =false;
            data.Items.forEach(function(users) {
                if(event.username===users.username)
                {   found=true; }
            });
            if(found)
            {
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
                    body: JSON.stringify('user already exist'),
                };
                callback(null, response);
            }
            else{
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Scan succeeded.");
                    data.Items.forEach(function(users) {
                        console.log("displaying ID"+count);
                        count++;

                    });

                    count = count + 1 ;
                }
                console.log("id in D in on scanB" + count);

                const params = {
                    Item: {
                        id : count,
                        username: event.username,
                        firstname: event.firstname,
                        lastname: event.lastname,
                        email: event.email,
                        password : event.password,
                        role : event.role,
                        address : event.address + " " + event.pincode
                    },
                    TableName: "users"
                };
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
                    body: JSON.stringify('User added Successfully'),
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
        }

    }

};