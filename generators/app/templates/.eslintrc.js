module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },
  "env": {
    "node": true,
    "mocha": true,
    "es6": true
  },
  "extends": [
    <% eslintDefaults.forEach(function (value) { %>"<%= value %>",
    <% }); %>
  ],
  "rules": {
  }
}
