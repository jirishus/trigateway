app.controller('searchCtrl', function($scope) {

    
    // Create Dropdown Hours
  function createHours() {
    $scope.Hours = [];
    // loop to create 00-23 range
    for(var i=0;i<=23;i++) {
      // push numbers to Hours Array
      $scope.Hours.push(i);
    }

  }
  createHours();

  // Create Minutes in 5min Intervals
  function createMins() {
    $scope.Mins = [];
    for(var i=0;i<=55;i++) {
      if(i%5 === 0) {
        $scope.Mins.push(i);
      }
    }
  }
  createMins();

  $scope.transForm = {};

  $scope.transFormSubmit = function() {
    console.log('send it');
  };

}); // END SEARCH CTRL