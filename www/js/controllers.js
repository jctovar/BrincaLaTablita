var product_id = "";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('DeviceCtrl', function($scope, $ionicPlatform, $cordovaDevice) {
	
	$ionicPlatform.ready(function() {
    	// inicia plugin
    	$scope.deviceUUID = $cordovaDevice.getUUID();
    	$scope.deviceVersion = $cordovaDevice.getVersion();
    	$scope.deviceModelo = $cordovaDevice.getModel();
    	$scope.devicePlataforma = $cordovaDevice.getPlatform();
  });
})

.controller("BarcodeCtrl", function($scope, $http, $cordovaBarcodeScanner) {
    // Declara var myData
    $scope.myData = {};
    
    // funcion de inicar el scanner de codigos
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            console.log("Barcode Text -> " + imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            searchProduct(imageData.text);
            
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    }
    
    // funcion de buscar producto en el servidor
	function searchProduct(BarCode){
		var responsePromise = $http.get("http://brincalatablita.com/mobile/product/" + BarCode);
	
	        responsePromise.success(function(data, status, headers, config) {
	            $scope.myData.Code = data.product_code;
	            $scope.myData.Product = data.product_name;
	            $scope.myData.Description = data.product_description;
	            $scope.myData.Price = data.lot_price;
	            $scope.myData.Qty = data.lot_qty;
	            $scope.card_visible = true;
	        });
	        responsePromise.error(function(data, status, headers, config) {
	            alert("Sin conexion...!");
	    });
	}
})

.controller("CatalogCtrl", function($scope, $http) {
	
	listProducts();
	
	// funcion de listar productos del servidor
	function listProducts(){
		var responsePromise = $http.get("http://brincalatablita.com/mobile/all");
	
	        responsePromise.success(function(data, status, headers, config) {
	            $scope.Products = data;
	        });
	        responsePromise.error(function(data, status, headers, config) {
	            alert("Sin conexion...!");
	    });
	}
})

.controller("productCtrl", function($scope, $stateParams, $http) {
	// Declara var myData
    $scope.myData = {};
	
	searchProduct($stateParams.productId);
	
	// funcion de buscar producto en el servidor
	function searchProduct(id){
		var responsePromise = $http.get("http://brincalatablita.com/mobile/by_id/" + id);
	
	        responsePromise.success(function(data, status, headers, config) {
	            $scope.myData.Code = data.product_code;
	            $scope.myData.Product = data.product_name;
	            $scope.myData.Description = data.product_description;
	            $scope.myData.Price = data.lot_price;
	            $scope.myData.Qty = data.lot_qty;
	        });
	        responsePromise.error(function(data, status, headers, config) {
	            alert("Sin conexion...!");
	    });
	}
	
})

.controller("cartCtrl", function($scope, $stateParams, $http) {

})