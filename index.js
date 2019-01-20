const Botkit                = require('botkit');
const getSecrets            = require('./services/secrets');

(async() => {
    try {

        // Load the secrets into the environment if they are not present
        if(!process.env.slackToken){
            let secrets = await getSecrets();
            let keys = Object.keys(secrets);

            keys.forEach(key => {
                process.env[key] = secrets[key]
            });
        }


        // Create the Botkit controller
        let controller = Botkit.slackbot({
            debug: false,
            retry: 10
        });


        // Spawn a single instance of the bot and connect Slack
        controller.spawn({ token: process.env.slackToken }).startRTM();


        // Load the skills
        let normalizedPath = require('path').join(__dirname, 'skills');

        require('fs').readdirSync(normalizedPath).forEach(function (file) {
            require('./skills/' + file)(controller);
        });

    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
})();
