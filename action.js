const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');


    const octokit = github.getOctokit(gitHubToken);



    const environment = core.getInput('environment');
    const state = core.getInput('state');

    console.log("ENV : ", environment);

    let deploymentPayload = {        
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: github.context.ref,
        required_contexts: [],
        environment: environment,
        auto_merge: false,
        transient_environment: true,
    };
    
    const deployment = await octokit.rest.repos.createDeployment(deploymentPayload);


    let deploymentStatusPayload = {        
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        deployment_id: deployment.data.id,
        state: state,
        log_url: 'https://windr.org',
        description: 'new application !! '+ new Date(),
    };

    deploymentStatusResult =  await octokit.rest.repos.createDeploymentStatus(deploymentStatusPayload);


}

module.exports = action;