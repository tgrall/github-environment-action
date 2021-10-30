# GitHub Environment Action

This action allows you to configure the environment from your workflow.


## Start Deployment

```
    - name: '🚢  - Start deployment'
      uses: tgrall/github-environment-action@main
      with:
        environment: development
        state: start
```

If the `environment` does not exist it is created.


## Delete an environment

```
    - name: '🚢  - Start deployment'
      uses: tgrall/github-environment-action@main
      with:
        environment: development
        state: delete
```