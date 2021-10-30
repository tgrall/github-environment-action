const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');

    const octokit = github.getOctokit(
                            gitHubToken, 
                            {
                                previews: ["ant-man-preview", "flash-preview"],
                            }
    );


    const environment = core.getInput('environment');
    const state = core.getInput('state');

    console.log("ENV : ", environment);

    const deployment = await github.rest.repos.createDeployment({
        owner: owner,
        repo: repo,
        ref: args.gitRef,
        required_contexts: [],
        environment: args.environment,
        auto_merge: false,
        transient_environment: args.transient,
      });

    console.log(
        "deployment",

        JSON.stringify(deployment)

    );


    await github.rest.repos.createDeploymentStatus({
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