const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');

    const environment = core.getInput('environment');
    const state = core.getInput('state');

    console.log("ENV : ", environment);


    console.log(
    github.repos.createDeploymentStatus({
        ...context.repo,
        deployment_id: environment,
        state: state,
        mediaType: { previews: ['flash', 'ant-man'] }
      })
    );



}

module.exports = action;