const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');
    const octokit = github.getOctokit(
                            gitHubToken, 
                            {
                                previews: ["ant-man-preview", "flash-preview"],
                            }
    );


    const environment = core.getInput('environment');
    const state = core.getInput('state');

    console.log("ENV : ", environment);

    await octokit.rest.repos.createDeploymentStatus({
        ...github.context.repo,
        deployment_id: environment,
        state: state,
    });



}

module.exports = action;