exports.logError = (title, message) => {
    console.log(`\x1b[31m[${title}] Error: ${message}\x1b[0m`);
}

exports.logWarning = (title, message) => {
    console.log(`\x1b[33m[${title}] ${message}\x1b[0m`);
}

exports.logInfo = (title, message) => {
    console.log(`\x1b[34m[${title}] ${message}\x1b[0m`);
}

exports.logSuccess = (title, message) => {
    console.log(`\x1b[32m[${title}] ${message}\x1b[0m`);
}

exports.logImportant = (title, message) => {
    console.log(`\x1b[36m[${title}] ${message}\x1b[0m`);
}