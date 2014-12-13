/*
app.directive('updateTitle', function($rootScope) {
  return {
    link: function(scope, element) {

      var listener = function(event, toState, toParams, fromState, fromParams) {
        var title = 'Default Title';
        if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
        element.text(title);
      };

      $rootScope.$on('$stateChangeStart', listener);
    }
  }
});
*/

app.directive('triPopover', function() {
  return {
    templateUrl:'pop-content.html'
  };
});



app.directive('sayIt', function() {
  // return definition object
  return {
    restrict:'AE',
    replace:true,
    templateUrl:"/gateway/js/directives/dummy_content.html"
  };
});

// Inserted Nested Tables
app.directive('probIt', function() {
  // return definition obj
  return {
    restrict:'AE',
    link:function(scope,elem,attrs) {
      //console.log(elem);
      var dataset = elem[0];
      var log = [];
      //console.log(angular.isObject(dataset));
      /*
      angular.forEach(dataset, function(value, key) {
        this.push(key + ': ' + value);
      }, log);

      console.log(log); 
      */

    }
  }
});


// POPOVER directive
app.directive('myDir', function() {
  return {
     restrict:'A',
     template:'<p>Group Details</p>' + '<div ng-repeat="thing in things"><ul class="floater"><li>{{thing.name}}</li></ul></div>',
     link:function(scope,el,attrs) {
        //scope.popOver = attrs.popoverContent;

        el.bind('mouseenter', function() {
          
          //var insert = '<ul class="floater">{{groupNames}}</ul>';
          //var popper = el.find('ul');

          //el.append(insert);
          var floater = el.find('ul');
          floater.css('display','block');



        });

        el.bind('mouseleave', function() {

          //var popper = el.find('ul');
          //popper.remove();
          var floater = el.find('ul');
          floater.css('display','none');

        });

     }
  }

}); // END myDir

app.directive('popLister', function() {
  return {
    restrict:'A',
    scope:{clientsArray:'='},
    /*template:'<div ng-repeat="client in clientsArray">{{putGroups()}}</div>' + 'View Groups',*/
    template:'<p>View Groups</p>' + '<ul class="floater"><li ng-repeat="client in clientsArray">{{getStuff(client)}}</li></ul>',
    link:function(scope,el,attrs) {
      // MOUSE ENTER
      el.bind('mouseenter', function() {
        var floater = el.find('ul');
        floater.css('display','block');
      });
      // MOUSE LEAVE
      el.bind('mouseleave', function() {
        var floater = el.find('ul');
        floater.css('display','none');
      });


      scope.getStuff = function(client) {
         return client;
      }

    }
  }
});

// groupAnchor directive
app.directive('popSet', function() {
  return {
    restrict:'A',
    replace:false,
    link:function(scope,el,attrs) {

        el.bind('mouseenter', function() {
          /*
          var infoPop = el.find('div');
          infoPop.css('display','block');      
          */
        });

        el.bind('mouseleave', function() {
          /*
          var infoPop = el.find('div');
          infoPop.css('display','none');
          */
        });

    }
  }
});

// scroll directive
app.directive('testScroll', function($document) {
  return {
    restrict:'E',
    template:'<p>dir temp</p>',
    link:function(scope,el,attrs,ctrl) {
      // declare vars
      var masterView = angular.element($document);
      
      var win = $(window);

      win.scroll(function() {
        var top = $(window).scrollTop();
        console.log(top);
      });
      /*
      masterView.bind('scroll', function() {
        
        //scope.$apply(attrs.testScroll);
        //console.log(scope.$apply(attrs.testScroll));
        
      });
      */

    }
  }
});

///////////////////////
// FILTER PAYMENT TYPE
///////////////////////
/*
app.directive('customSearch', function() {
  return {
    restrict:'A',
    require:'^stTable',
    scope:true,
    link:function(scope,el,attr,ctrl) {

      var tableState = ctrl.tableState();
      scope.$watch('filterValue', function(value) {

        if(value) {
          // reset
          //tableState.search.predicateObject = {};
          if(value === 'Visa') {
             ctrl.search(true,'Visa');
          }
          

        }
      });

    }

  }
});
*/


///////////////////////
// INFINITE SCROLL
///////////////////////