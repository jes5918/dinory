pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        mattermostSend (
                            color: "#2A42EE", 
                            message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                        ) 
                        sh 'sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                        sh 'sudo chmod +x /usr/local/bin/docker-compose'
                        sh 'docker-compose build'
                    } catch(e) {
                        currentBuild.result = "FAILURE"
                    } finally {
                        if(currentBuild.result != "FAILURE") {
                            mattermostSend (
                                color: "good", 
                                message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                            )
                        } else {
                            mattermostSend (
                                color: "danger", 
                                message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                            )
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}