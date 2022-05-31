// Requirements
const helpers = {};

helpers.code403 = () => {
    return {
        errorCode: 'Code 403',
        description: 'Yo do not have the permissions to access to this site'
    };
}

helpers.code404 = () => {
    return {
        errorCode: 'Code 404',
        description: 'The link does not exists or it is broken'
    };
}

helpers.code500 = () => {
    return {
        errorCode: 'Code 500',
        description: "Oh! We didn't expect this to happen"
    }
}

// Export
module.exports = helpers;