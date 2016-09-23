module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "plugins": [
        "eslintCustomRules"
    ] , 
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eslintCustomRules/if-curly-formatting": "warn",
        "eslintCustomRules/var-length":"warn"
    }
};