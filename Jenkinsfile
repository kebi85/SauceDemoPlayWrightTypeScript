pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.56.0-noble'
            args '--ipc=host'
        }
    }

    environment {
        CI = 'true'                              // включва retries/workers/forbidOnly от playwright.config.ts
        npm_config_cache = "${WORKSPACE}/.npm"   // контейнерът няма права да пише в $HOME
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'results/junit.xml'
            publishHTML(target: [
                reportName           : 'Playwright Report',
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                keepAll              : true,
                alwaysLinkToLastBuild: true,
                allowMissing         : true
            ])
        }
    }
}
