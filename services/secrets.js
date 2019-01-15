const AWS = require('aws-sdk');

let secretsManager = new AWS.SecretsManager({ region: 'us-east-1' || process.env.AWS_REGION });

async function getSecrets(){
    try {
        let results = await secretsManager.getSecretValue({ SecretId: "botkit" }).promise();
        return JSON.parse(results.SecretString);
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = getSecrets;