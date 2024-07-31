pipeline {

    agent any

    stages {
        stage('Clone'){
            steps {
                git branch: 'main', credentialsId: 'github-h2t', url: 'https://github.com/tien00113/Ecommerce_TASC_FE.git'
            }
        }
        stage('Check docker') {
            steps {
                // This step should not normally be used in your script. Consult the inline help for details.
                withDockerRegistry(credentialsId: 'dockerhub-h2t', url: '') {
                    sh label: '', script: 'docker --version'
                }
            }
        }
    }
}