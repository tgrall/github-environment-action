const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');


    const octokit = github.getOctokit(gitHubToken);



    const environment = core.getInput('environment');
    const state = core.getInput('state');

    console.log("ENV : ", environment);

    x = {        
        owner: github.context.owner,
        repo: github.context.repo,
        ref: github.context.ref,
        required_contexts: [],
        environment: environment,
        auto_merge: false,
        transient_environment: true,
    };
    console.log("data:", x)

    const deployment = await octokit.rest.repos.createDeployment({
        owner: owner,
        repo: repo,
        ref: github.context.ref,
        required_contexts: [],
        environment: environment,
        auto_merge: false,
        transient_environment: true,
      });

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