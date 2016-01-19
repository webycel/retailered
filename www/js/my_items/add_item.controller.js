'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:AddItemCtrl
 * @description
 * # AddItemCtrl
 * Controller of the retailered app
 */
retaileredApp.controller('AddItemCtrl', AddItemCtrl);

AddItemCtrl.$inject = [];

function AddItemCtrl() {

	var vm = this;

	vm.addItem = {
		product: '',
		productSrc: 'ID',
		notifySales: true,
		notifyStock: false,
		retailer: 'mns'
	};

	vm.addItem = addItem;

	function addItem() {
		console.log('popo');
	}

}
