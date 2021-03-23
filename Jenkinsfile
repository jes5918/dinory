pipeline {
    agent any
    
    stages {
        stage('Build') {
            echo "Docker Run ..."
            docker.withTool('docker') {
                sh "docker-compose rm -f -s -v"
                sh "docker-compose up -d"
            }
            cleanWs()
        }
    }
}