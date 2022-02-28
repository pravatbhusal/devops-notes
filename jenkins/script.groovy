def buildApp() {
    echo 'groovy script is now building the app'
}

def testApp() {
    echo 'groovy script is now testing the app'
}

def deployApp() {
    echo "groovy script is now deploying version ${params.VERSION}"
}

return this