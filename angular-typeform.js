(function (){
	'use strict';
	/**
	 * @ngdoc overview
	 * @name angularTypeform
	 * @description This module contains a directive that allows you easily embed a typeform in your angular 1.x app taking
	 * care about state changes
	 */

	angular.module('angularTypeform', []);


	angular.module('angularTypeform')
		.provider('typeformConfig', typeformProvider)
		.directive('typeformEmbed', typeformEmbed)
		.directive('typeformLink', typeformLink);

	/**
	 * @ngdoc directive
	 * @name angularTypeform.provider:typeformConfig
	 * @description Provide your accountId so you don't have to do it everytime
	 * @element typeformConfig.setAccount(ACCOUNT_ID)
	 */
	function typeformProvider() {

		this.accountId = "";
		this.setAccount = function setAccount(value) {
			this.accountId = value;
		};

		this.$get = function () {
			return this;
		};
	}

	/**
	 * @ngdoc directive
	 * @name angularTypeform.directive:typeform-embed
	 * @description This directive makes it super simple embed a typeform with your params solving the problems of the form not
	 * reloading in angular apps
	 * @element <typeform-embed tf-id="tfId" tf-text="tfText" tf-width="tfWidth" tf-height="tfHeight"></typeform>
	 */
	function typeformEmbed() {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				tfId: '@',
				tfText: '@',
				tfStyle: '@'
			},
			template: '<div class="typeform-widget" data-url="https://{{accountId}}.typeform.com/to/{{tfId}}" data-text="{{tfText}}" ng-attr-style="{{style}}"></div>',
			controller: function($scope, typeformConfig) {

				if (!typeformConfig.accountId) {
					throw new EvalError('Account ID not set in config');
				} else {
					$scope.accountId = typeformConfig.accountId;
				}

				/**
				 * Start of typeform script
				 */

				function initTypeformScript() {
					var qs,
						js,
						q,
						s,
						d = document,
						gi = d.getElementById,
						ce = d.createElement,
						gt = d.getElementsByTagName,
						id = 'typef_orm_widget',
						b = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/';

					if (!gi.call(d, id)) {
						js = ce.call(d, 'script');
						js.id = id;
						js.src = b + 'widget.js';
						q = gt.call(d, 'script')[0];
						q.parentNode.insertBefore(js, q)
					} else {
						//For angular apps
						new Typeform.Widget
					}
				}
				initTypeformScript();

			},
			link: function (scope, element, attrs) {

				var defaultStyle = "height:100%; margin:0;";
				scope.style= scope.tfStyle ? scope.tfStyle : defaultStyle;
			}
		};
	}
	function typeformLink() {
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				tfMode:'@',
				tfType:'@',
				tfId: '@',
				tfText: '@',
				tfStyle: '@'
			},
			template: '<a class="typeform-share {{type}}" href="https://{{accountId}}.typeform.com/to/{{tfId}}" data-mode="{{mode}}" ng-attr-style="{{style}}" target="_blank">{{tfText}}</a>',
			controller: function($scope, typeformConfig) {

				var MODE_POPUP = "popup", MODE_BANNER = "banner";
				var TYPE_LINK = "link", TYPE_BUTTON = "button";

				if (!typeformConfig.accountId) {
					throw new EvalError('Account ID not set in config');
				} else {
					$scope.accountId = typeformConfig.accountId;
				}

				var _type = getTypeFromDirective($scope.tfType);
				$scope.type = _type;
				$scope.mode =  getModeFromDirective($scope.tfMode);
				initTypeformLinkScript(_type);


				//Helpers
				function getTypeFromDirective(type) {
					if (!type) {
						return TYPE_LINK;
					}

					switch (type) {
						case TYPE_BUTTON:
							return TYPE_BUTTON;
						case TYPE_LINK:
						default:
							return TYPE_LINK;
					}

				}
				/**
				 * Start of typeform script
				 */

				function initTypeformLinkScript(type){
					var qs,
						js,
						q,
						s,
						d=document,
						gi=d.getElementById,
						ce=d.createElement,
						gt=d.getElementsByTagName,
						id='typef_orm_share',
						b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';
					if(!gi.call(d,id)){
						js=ce.call(d,'script');
						js.id=id;
						js.src=b+'share.js';
						q=gt.call(d,'script')[0];
						q.parentNode.insertBefore(js,q)
					}
					id=id+'_';

					if(type == TYPE_BUTTON && !gi.call(d,id)){
						qs=ce.call(d,'link');
						qs.rel='stylesheet';
						qs.id=id;
						qs.href=b+'share-button.css';
						s=gt.call(d,'head')[0];
						s.appendChild(qs,s)
					}
				}

				function getModeFromDirective(mode) {
					if (!mode) {
						return "1";
					}

					switch (mode) {
						case MODE_BANNER:
							return "2";
						case MODE_POPUP:
						default:
							return "1";
					}
				}
			},
			link: function (scope, element, attrs) {
				var defaultStyle = "height:100%; margin:0;";
				scope.style = scope.tfStyle ? scope.tfStyle : defaultStyle;
			}
		};
	}


})();
