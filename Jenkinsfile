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
                sh 'docker --version'
            }
        }
    }
}