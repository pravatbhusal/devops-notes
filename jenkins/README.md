# Jenkins
Jenkins is an automation server to build, test, and deploy software. It allows for continuous integration/continuous deployment (CI/CD) pipelines to automate testing and deploying software. This guide is based on the YouTube tutorial from https://www.youtube.com/watch?v=7KCS70sCoK0&t=1703s.

1. Download Jenkins here https://www.jenkins.io/download/  
2. Once jenkins is installed and the service is started, head on over to http://localhost:8080 to view the Jenkins service.

## CI/CD Pipelines
Continuous integration/Continuous deployment (CI/CD) is great because it allow developers to ship software quickly and efficiently. This is because the pipeline will build the app, test the application using a combination of unit, integration, and E2E tests, and deploy it once all of the stages of the pipeline pass.

Before CI/CD, developers had to manually build and test their applications before releasing it to production. They also had to wait weeks or even months before releasing a new build to the public, using concepts such as "nightly builds" to build at the end of the workday when no one is working.

## Creating your first Jenkins pipeline
1. Go to http://localhost:8080/view/all/newJob, enter a name, choose the "Multibranch Pipeline" option, and press OK.  
2. Now choose the Branch Source to be "GitHub", and provide this repo's URL.
3. You don't need to use a credential for this because the repo is public, but if it was private then you would need to provide a GitHub credential.
4. Under the "Build Configuration" -> "Script Path" type `jenkins/Jenkinsfile` since that's local directory where the Jenkinsfile is located for this repository.
5. Now click Save and view the "Scan Repository Log" to see it scanning the repo for Jenkinfiles. Jenkins will periodically scan your GitHub repository to check for any changes, and if any changes are detected it will build and execute the commands in the Jenkinsfile!
6. Once the scan is complete, head over to "Status" to see the pipeline has been built!

## Jenkinsfile
A Jenkinsfile is a file that defines the pipeline structure using code. Instead of using the Jenkins GUI to create the pipeline, you can create infrastructure as a code.

### Scripted vs Declarative
A Jenkinsfile supports two types of syntax: scripted and declarative. Scripted used to be the only way to code a pipeline, but recently declarative syntax was introduced. Because it's most common, the example Jenkinsfile in this repository uses scripted syntax.

Scripted allows for you to create more complex pipeline tasks using custom logic with the groovy engine, so there's a lot more flexibility. However, this makes it difficult to learn how to use.

Declarative has a more pre-defined structure, but it makes it easier to get started because you don't need to learn to use groovy.

### Jenkins Environmental Variables
Jenkins provides environmental variables to use in your Jenkinsfile. They are documented in here http://localhost:8080/env-vars.html/. You can specify custom environment variables using the `environment` section in your Jenkinsfile.

### Jenkins Tools
Jenkins tools are build tools used to build your application. Define your tools at http://localhost:8080/configureTools/. You can specify which tools your Jenkinsfile needs using the `tools` section in your Jenkinsfile.

### Jenkins Parameters
Jenkins parameters allow us to pass data into our Jenkins jobs as variables. You can specify a `parameters` section in your Jenkinsfile to define parameters. After Jenkins detects the new Jenkinsfile with the parameters, you can see the option to "Build with parameters" on the pipeline http://localhost:8080/job/my-app-pipeline/job/jenkins/build?delay=0sec.

### External Groovy Scripts
Jenkinsfile supports creating more complex logic using Groovy scripts. You can specify Groovy code using a `script` section in your Jenkinsfile.

### Test Jenkinsfile using Replay
If you want to test the Jenkinsfile without having to make git commits, you can use the Replay feature in Jenkins. Click the build version of the branch from the "Build History" that you want to replay, click the "Replay" button, then you can modify the Jenkinsfile used for the build. Once you're done modifying the Jenkinsfile, then click Run to see the new build.

Here is an example of replaying the 5th build http://localhost:8080/job/my-app-pipeline/job/jenkins/5/replay/.

## Ideal CI/CD Pipeline
Now that we know how to create a CI/CD pipeline using Jenkins, what does the ideal pipeline look like? I'm going to base it off of this video https://www.youtube.com/watch?v=OPwU3UWCxhw.

### Source
This is where we have reviewers for the code's pull request. Ideally, we need at least one reviewer but having two is best.

### Build Stage
1. Compile source and dependencies
2. Run unit tests
3. Check and enforce code coverage of tests (e.g. 90% of code should be covered by tests)

### Test Stage
1. Run integration/E2E tests on the regions (e.g. US, UK, China, etc.) that your app will be deployed onto

### One-Box Prod Stage
There will be a single host called one-box that will deploy your change. If the one-box host detects that there are failures, then it can help mitigate damage before deploying your code to all of the prod hosts.

1. Alarms on errors, latency, and key business metrics do not occur
2. Bake period (24 hours) that test if the change is OK
3. Anomaly detection OR monitor error counts + latency breaches
4. Canary that tests your prod workflow on a consistent basis (e.g. a cronjob executed every minute) with an expected input and outcome

### Prod Stage
Deploys all of the production hosts with the new code change. The same kind of checks in the one-box prod environment should also be in the prod environment.