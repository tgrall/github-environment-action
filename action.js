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
    console.log("data:", deploymentPayload)

    const deployment = await octokit.rest.repos.createDeployment(deploymentPayload);

    console.log(
        "deployment",

        JSON.stringify(deployment)

    );


    await octokit.rest.repos.createDeploymentStatus({
        owner: owner,
        repo: repo,
        deployment_id: parseInt(deploymentID, 10),
        state: "in_progress",
        auto_inactive: args.autoInactive,
        log_url: args.logsURL,
        description: args.description,
      });



}

module.exports = action;