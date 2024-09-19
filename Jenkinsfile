node {
    def commit_id

    stage('Prep'){
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
    }
    // stage('SonarCloud') {
    //     SCANNER_HOME = tool 'SonarQubeScanner'
    //     ORGANIZATION = "BiCS"
    //     PROJECT_NAME = "wg_be"
    //     exclusions= "**/*.java"
    //     withSonarQubeEnv('SonarCloudOne') {
    //         sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.organization=${ORGANIZATION} -Dsonar.projectKey=${PROJECT_NAME} -Dsonar.sources=. -Dsonar.exclusions=${exclusions}"
    //     }
    // }
    // stage("Quality Gate"){
    //     sleep(30)
    //     timeout(time: 10, unit: 'MINUTES') {
    //         def qg = waitForQualityGate()
    //         print "Finished QG waiting"
    //         if (qg.status != 'OK') {
    //             error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //         }
    //     }
    // }
    stage('Build'){
        sh "cd /var/lib/jenkins/workspace/wg-fe"                
        //sh 'bash -l -c "nvm use v20.11.1 || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash  && nvm install v20.11.1 && nvm use v20.11.1 "' 
        sh "node -v "
        sh "npm i && npm run build"
        print "Finished Build"
    }
    stage('Deploy'){
        sh "cd /var/lib/jenkins/workspace/wg-fe"
        sh "ssh -i /var/lib/jenkins/wg-internal.pem -o StrictHostKeyChecking=no ubuntu@13.127.85.20 mkdir -p /home/ubuntu/temp_deploy/woodfield-fe"
        sh "scp -i /var/lib/jenkins/wg-internal.pem -o StrictHostKeyChecking=no -r .next ubuntu@13.127.85.20:/home/ubuntu/temp_deploy/woodfield-fe/dist/"
        sh 'ssh -i /var/lib/jenkins/wg-internal.pem -o StrictHostKeyChecking=no ubuntu@13.127.85.20 "rm -rf /home/ubuntu/woodfield-fe/.next/ && mv /home/ubuntu/temp_deploy/woodfield-fe/dist/ /home/ubuntu/woodfield-fe/.next/"'
        sh "ssh -i /var/lib/jenkins/wg-internal.pem -o StrictHostKeyChecking=no ubuntu@13.127.85.20 'source ~/.nvm/nvm.sh && /home/ubuntu/refresh.sh'"
        sh "ssh -i /var/lib/jenkins/wg-internal.pem -o StrictHostKeyChecking=no ubuntu@13.127.85.20 'source ~/.nvm/nvm.sh && pm2 reload all'"
        print "Finished Deployment"
    }
}
