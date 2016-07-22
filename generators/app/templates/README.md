# <%= appname %>
<% if (badges.indexOf('travis-build') !== -1) { %>
[![travis build](https://img.shields.io/travis/<%= githubuser %>/<%= appname %>.svg?style=flat-square)](https://travis-ci.org/<%= githubuser %>/<%= appname %>/)<% } %><% if (badges.indexOf('codecov') !== -1) { %>
[![codecov coverage](https://img.shields.io/codecov/c/github/<%= githubuser %>/<%= appname %>.svg?style=flat-square)](https://codecov.io/gh/<%= githubuser %>/<%= appname %>)<% } %><% if (badges.indexOf('npmv') !== -1) { %>
[![version](https://img.shields.io/npm/v/<%= appname %>.svg?style=flat-square)](http://npm.im/<%= appname %>)<% } %><% if (badges.indexOf('npmd') !== -1) { %>
[![downloads](https://img.shields.io/npm/dt/<%= appname %>.svg?style=flat-square)](http://npm-stat.com/charts.html?package=<%= appname %>)<% } %><% if (badges.indexOf('npml') !== -1) { %>
[![MIT license](https://img.shields.io/npm/l/<%= appname %>.svg?style=flat-square)](https://opensource.org/licenses/<%= license %>)<% } %><% if (badges.indexOf('gforks') !== -1) { %>
[![GitHub forks](https://img.shields.io/github/forks/badges/shields.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/<%= githubuser %>/<%= appname %>)<% } %><% if (badges.indexOf('gstars') !== -1) { %>
[![GitHub stars](https://img.shields.io/github/stars/badges/shields.svg?style=social&label=Star&maxAge=2592000)](https://github.com/<%= githubuser %>/<%= appname %>)<% } %><% if (badges.indexOf('gwatchers') !== -1) { %>
[![GitHub watchers](https://img.shields.io/github/watchers/badges/shields.svg?style=social&label=Watch&maxAge=2592000)](https://github.com/<%= githubuser %>/<%= appname %>)<% } %><% if (badges.indexOf('gfollowers') !== -1) { %>
[![GitHub followers](https://img.shields.io/github/followers/espadrine.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/<%= githubuser %>/<%= appname %>)<% } %>

<%= description %>
