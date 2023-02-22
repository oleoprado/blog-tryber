module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/api/services",
    "src/api/controllers"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "all": true
}