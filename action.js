const core = require('@actions/core');
const github = require('@actions/github');


const action = async () => {    
    const gitHubToken = core.getInput('github_token');


    const octokit = github.getOctokit(gitHubToken);



    const environment = core.getInput('environment');
    const state = core.getInput('state');
    const url = core.getInput('url');
    const description = core.getInput('description');
    const transient_environment = core.getInput('transient_environment');
    const production_environment = core.getInput('production_environment');


    if ( state.toLocaleLowerCase() == "delete" ) {
        await octokit.rest.repos.deleteEnvironment({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            environment_id: environment
        }); 
    } else {    

        // see https://octokit.github.io/rest.js/v18#repos-create-deployment    
        let deploymentPayload = {        
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            ref: github.context.ref,
            required_contexts: [],
            environment: environment,
            transient_environment: (transient_environment.toLocaleLowerCase() == "true"),
            production_environment: (production_environment.toLocaleLowerCase() == "true"),
        };   
        const deployment = await octokit.rest.repos.createDeployment(deploymentPayload);


        let deploymentStatusPayload = {        
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            deployment_id: deployment.data.id,
            state: state,
            description: 'new application !! '+ new Date(),
        };

        if (url) {
            deploymentStatusPayload.log_url = url
        }

        deploymentStatusResult =  await octokit.rest.repos.createDeploymentStatus(deploymentStatusPayload);
        
    }


}

module.exports = action;