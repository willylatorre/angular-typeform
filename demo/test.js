/**
 * Created by glovoadrian on 29/10/16.
 */
angular
	.module('app', ['angularTypeform'])
	.config(function (typeformConfigProvider) {
		typeformConfigProvider.setAccount('glovoapp1');
	});

angular.module('app')
	.controller('TypeformCtrl', function($scope) {

});