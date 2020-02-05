pipeline {
    agent {
        dockerfile {
            filename 'docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        API = "http://localhost:8000/api/v1"
    }

    stages {
        stage('Configure') {
            steps {
                sh "echo -n '${API}' > config/api-url.txt"
            }
        }
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run pb'
            }
        }
    }
}
