pipeline {
    agent {
        docker {
            image 'pdmlab/jenkins-node-docker-agent:6.11.1'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        // mattermostSend (
                        //     color: "#2A42EE", 
                        //     message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                        // ) 
                        sh 'docker-compose build'
                    } catch(e) {
                        currentBuild.result = "FAILURE"
                    } finally {
                        // if(currentBuild.result != "FAILURE") {
                        //     mattermostSend (
                        //         color: "good", 
                        //         message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                        //     )
                        // } else {
                        //     mattermostSend (
                        //         color: "danger", 
                        //         message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
                        //     )
                        // }
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