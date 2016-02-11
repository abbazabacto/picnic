import angular from 'angular';

export default angular.module('picnic.core', [])
  .constant('picnicApiBaseUrl', 'http://localhost:8080/api/v1/');