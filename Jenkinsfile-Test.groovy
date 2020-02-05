pipeline {
    agent {
        dockerfile {
            filename 'docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

        API = "https://api.gamification.beacon.testingmachine.eu/api/v1"
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
        stage('Build') {
            steps {
                sh 'yarn run pb'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: 'test-gamification-web', acl: 'PublicRead', file: './build/es5prod')
            }
        }
    }
}
