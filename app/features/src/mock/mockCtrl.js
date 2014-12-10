app.controller('mockCtrl', function($scope,$http,baseUrl) {
	

	// LOAD DATA
	$http.get('http://blooming-headland-9730.herokuapp.com:80/api/workers').success(function(data) {
		// BIND TO LOCAL COLLECTION
		$scope.workers = data;

		// SET SELECTED OPTION
		$scope.selectedItem = $scope.workers[2];

	});

	// EDIT ACTION
	$scope.doEdit = function(worker) {
		
		//$scope.selectedItem = worker;
		console.log('processing update');

	};

});



