pipeline {

    agent any

    stages {
        // stage('Clone'){
        //     steps {
        //         git branch: 'main', credentialsId: 'github-h2t', url: 'https://github.com/tien00113/Ecommerce_TASC_FE.git'
        //     }
        // }
        // stage('Check docker') {
        //     steps {
        //         withDockerRegistry(credentialsId: 'dockerhub-h2t', url: '') {
        //             echo "xong xong xong"
        //         }
        //     }
        // }
        stage('Check Docker Access') {
            steps {
                script {
                    try {
                        def dockerVersion = sh(script: 'docker --version', returnStdout: true).trim()
                        echo "Docker Version: ${dockerVersion}"
                    } catch (Exception e) {
                        echo "Docker is not installed or not found in PATH."
                        error("Docker command failed")
                    }
                }
            }
        }
    }
}