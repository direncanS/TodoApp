pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials-id')
        SONARQUBE_SERVER = 'SonarQubeServerName'
        SONARQUBE_CREDENTIALS = credentials('sonar-token-id')
        CODECOV_TOKEN = credentials('codecov-token-id')
        AWS_ACCESS_KEY = credentials('aws-access-key-id')
        AWS_SECRET_KEY = credentials('aws-secret-key-id')
    }

    stages {
        stage('Lint Frontend') {
            when {
                branch 'main'
            }
            steps {
                dir('frontend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }

        stage('Lint Backend') {
            when {
                branch 'main'
            }
            steps {
                dir('backend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }

        stage('Static Code Analysis Frontend') {
            when {
                branch 'main'
            }
            steps {
                dir('frontend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            withSonarQubeEnv('SonarQubeServerName') {
                                sh 'npm run sonar'
                            }
                        }
                    }
                }
            }
        }

        stage('Static Code Analysis Backend') {
            when {
                branch 'main'
            }
            steps {
                dir('backend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            withSonarQubeEnv('SonarQubeServerName') {
                                sh 'npm run sonar'
                            }
                        }
                    }
                }
            }
        }

        stage('Test Frontend') {
            when {
                branch 'main'
            }
            steps {
                dir('frontend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            sh 'npm test -- --coverage'
                            withCredentials([string(credentialsId: 'codecov-token-id', variable: 'CODECOV_TOKEN')]) {
                                sh 'npx codecov'
                            }
                        }
                    }
                }
            }
        }

        stage('Test Backend') {
            when {
                branch 'main'
            }
            steps {
                dir('backend') {
                    script {
                        withNodeJS(nodeJSInstallationName: 'NodeJS 14') {
                            sh 'npm install'
                            sh 'npm test -- --coverage'
                            withCredentials([string(credentialsId: 'codecov-token-id', variable: 'CODECOV_TOKEN')]) {
                                sh 'npx codecov'
                            }
                        }
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            when {
                branch 'deploy/production'
            }
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t my-frontend .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            when {
                branch 'deploy/production'
            }
            steps {
                dir('backend') {
                    script {
                        sh 'docker build -t my-backend .'
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            when {
                branch 'deploy/production'
            }
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials-id') {
                        sh 'docker tag my-frontend ${DOCKER_HUB_CREDENTIALS_USR}/my-frontend'
                        sh 'docker push ${DOCKER_HUB_CREDENTIALS_USR}/my-frontend'
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            when {
                branch 'deploy/production'
            }
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials-id') {
                        sh 'docker tag my-backend ${DOCKER_HUB_CREDENTIALS_USR}/my-backend'
                        sh 'docker push ${DOCKER_HUB_CREDENTIALS_USR}/my-backend'
                    }
                }
            }
        }

        stage('Deploy to AWS ECS') {
            when {
                branch 'deploy/production'
            }
            steps {
                script {
                    withAWS(region: 'us-east-1', credentials: 'aws-credentials-id') {
                        sh '''
                        aws ecs update-service --cluster my-cluster --service frontend-service --force-new-deployment
                        aws ecs update-service --cluster my-cluster --service backend-service --force-new-deployment
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
