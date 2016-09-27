module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "plugins": [
        "eslintCustomRules"
    ] , 
    "rules": {
        "eslintCustomRules/testSameJqueryReference": "warn"
    }
};