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
                        sh 'docker-compose up -d --build'
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
                script {
                    mattermostSend (
                        color: "good", 
                        message: "여러분 기도하세요 빌드가 되었기를"
                    )
                }
            }
        }
    }
}