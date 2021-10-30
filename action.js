const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');

    const environment = core.getInput('environment');


    console.log("ENV : ", environment);

}

module.exports = action;