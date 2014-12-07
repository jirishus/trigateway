app.controller("appCtrl", function($rootScope,$scope,$state,$timeout,$http) {

  /*
  $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");      
  });
  */

  ////////////////////
  // LOAD MID-GROUPS
  ////////////////////
  $http.get('http://api.testing.tripayments.com/midgroups').success(function(data) {
    console.log(data);
  });


  ////////////
  // SIDENAV
  ////////////
  $scope.isCollapsed = true;

  var currentState = $state.current.name;

  //console.log(currentState);

  if(currentState === 'app.merchants.mids') {
    $scope.isCollapsed = false;
  }

  if(currentState === 'app.merchants.groups') {
    $scope.isCollapsed = false;
  }
  
  $scope.checkState = function() {
    $timeout(function() {
      var curState = $state.$current.name;

      console.log(curState);
      if(curState === 'app.merchants.mids') {
         $scope.isCollapsed = false;
      } else if(curState === 'app.search' || 'app.usermananger' || 'app.virtual_terminal') {
         $scope.isCollapsed = true;
      }

    },100);
  }
  
   

   $scope.noteState1 = function() {
      return $state.current.name + 'daddy';
   }

   $scope.noteState2 = function() {
      return $state.current.name + 'mids';
   }

   $scope.noteState3 = function() {
      return $state.current.name + 'groups';
   }

   $scope.setDefault = function() {
      $state.go('app.merchants.mids');
   }
});

////////////////
// INDEX CTRL
////////////////
app.controller('indexCtrl', ['$scope', '$location', 'authService','$http', function ($scope, $location, authService,$http) {
 

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }
 
    $scope.authentication = authService.authentication;

}]); // end indexCtrl