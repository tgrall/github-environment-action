# GitHub Environment Action

This action allows you to configure the environment from your workflow.


## Start Deployment

```
    - name: '🚢  - Start deployment'
      uses: tgrall/github-environment-action@main
      with:
        environment: development
        state: in_progress
```

State : `error|failure|inactive|in_progress|queued|pending|success`

If the `environment` does not exist it is created.


## Deployment done with a URL

```
    - name: '🚀  - Deployment Done'
      uses: tgrall/github-environment-action@main
      with:
        environment: development
        state: success
        url: http://github.com
```