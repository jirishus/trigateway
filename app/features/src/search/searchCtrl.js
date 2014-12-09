app.controller('searchCtrl', function($scope,$http,$filter,baseUrl,$state) {

  $scope.oneAtATime = false;

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

  /////////////
  // ACCORDION
  /////////////
  


  /////////////
  // MOMENT JS
  /////////////

  //$scope.Yesterday = $moment().subtract(1, 'days').format('L');

  //$scope.lastWeek = $moment().subtract(7, 'days').format('L');
  //$scope.lastMonth = $moment().subtract(30, 'days').format('L');
  //$scope.lastQuar = $moment().subtract(90, 'days').format('L');
  //$scope.lastYear = $moment().subtract(365, 'days').format('L');

  //$scope.past3Days = $moment().subtract(3, 'days').format('L');
  //$scope.past7Days = $moment().subtract(7, 'days').format('L');
  //$scope.past90Days = $moment().subtract(90, 'days').format('L');
  //$scope.past180Days = $moment().subtract(180, 'days').format('L');
  //$scope.past360Days = $moment().subtract(365, 'days').format('L');

  /////////////////////
  // TRANS FORM SUBMIT
  /////////////////////

  // cache form to clear input fields
  $scope.transForm = {};

  $scope.transFormSubmit = function() {

    //set todays date if dates not defined
    if ($scope.transForm.fromDate == undefined){$scope.transForm.fromDate = new Date();}
    if ($scope.transForm.toDate == undefined){$scope.transForm.toDate = new Date();}

    // Convert Date Format
    var datefilter = $filter('date'),
        formatDate = datefilter($scope.transForm.fromDate,'MM/dd/yy'),
        formatDate2 = datefilter($scope.transForm.toDate, 'MM/dd/yy');

    // QUERY OBJECT
    transQuery = {
      "FromDate":formatDate,
      "ToDate":formatDate2,
      "TransactionType":+$scope.transForm.transType || undefined,
      "Status":+$scope.transForm.Status || undefined,
      "TransactionId":$scope.transForm.transId,
      "GatewayId":$scope.transForm.gateway,
      "MidId":$scope.transForm.MID,
      "CcLast4":$scope.transForm.CcLast4,
      "ReferenceNumber":$scope.transForm.refNumber,
      "FirstName":$scope.transForm.fname
    }

    console.log(transQuery);

    // QUERY POST REQUEST
    $http({
      method:'POST',
      url:'https://api.tripayments.com/transactions/v2',
      data:transQuery
    }).success(function(data) {

      // SETUP NESTED TRANSACTIONS
      $scope.getNestedApiUser = function(tran) {
         $scope.nestedTrans = tran.RelatedTransactions;
      }

      // CREATE STATUS TOOLTIP
      $scope.returnStatus = function(tran) {
          var result = tran.ResultCode;
              var info = tran.ResponseDescription;
              var ui;
              
              

              var check = result === 0;
              check ? ui = 'Success' : errorCheck();

              function errorCheck() {

                var regex = /declined/i;
                var tester = regex.test(info);

                if(tester) {
                  ui = 'Declined';
                } else {
                  ui = 'Failed';
                }

              };
            return ui;
      }; // END RETURN STATUS

      // CREATE NESTED STATUS
      $scope.getNestedStatus = function(thing) {
         var result = thing.ResultCode;
         var info = thing.ResponseDescription;
         var ui;

         var check = result === 0;
         check ? ui = 'Success' : errorChecker();

         function errorChecker() {
            var regex = /declined/i;
            var tester = regex.test(info);

            if(tester) {
              ui = 'Declinded';
            } else {
              ui = 'Failed';
            }

         };
         return ui;
      };

      // BIND DATA
      $scope.transData = data;
      $scope.dataLen = data.length;

      // LINK SMART-TABLE SAFE COPY
      $scope.shownData = $scope.transData;

      // CSV EXPORT
      $scope.transactionCSV = data;

      // OPEN ACCORDION BY DEFAULT


      $('.form_wrapper').slideUp(300);
      $('.transForm_feedback').slideDown(300);

    });

  };  // END SUBMIT


  ///////////////
  // NEW SEARCH
  ///////////////
  $scope.new_search = function() {
    $state.go($state.$current, null, { reload: true });     
  };

  /////////////////
  // MODIFY SEARCH
  /////////////////
  $scope.modify_search = function() {
    $('.form_wrapper').slideToggle(300);
  };

 
  
}); // END SEARCH CTRL


/////////////////////////
// DATE PICKER CONTROLS
/////////////////////////

app.controller('snapstartDateCtrl', function($scope){

  // GET TODAY DATE
  $scope.today = function() {
    $scope.fromDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.fromDate = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.initDate = new Date('2013-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

});


app.controller('snapendDateCtrl', function($scope){

  $scope.today = function() {
    $scope.toDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.fromDate = null;
  };


  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.initDate = new Date('2013-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

});

app.controller('transfromDateCtrl', function($scope) {

  // GET TODAY DATE
  $scope.today = function() {
    $scope.fromDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.fromDate = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.initDate = new Date('2013-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[3];

});

app.controller('transendDateCtrl', function($scope) {
  $scope.today = function() {
    $scope.toDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.fromDate = null;
  };


  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.initDate = new Date('2013-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[3];
});

// TRANSACTION MODAL
app.controller('transModalCtrl', function($scope,$modal,$log) {

  $scope.open = function(trans) {
     var modalInstance = $modal.open({
        templateUrl:'transModalContent.html',
        controller:transModalInstanceCtrl,
        size:'lg',
        resolve: {
          trans:function() {
            return trans;
          }
        }
     });
  }

}); // transModalCtrl


var transModalInstanceCtrl = function($scope,$modalInstance,trans,$http) {
    $scope.trans = trans;

    $scope.cancel = function() {
       $modalInstance.close();
    }
};

// REFUND MODAL
app.controller('refundModalCtrl', function($scope,$modal,$log) {

  $scope.open = function(trans) {
     var modalInstance = $modal.open({
        templateUrl:'refundModalContent.html',
        controller:refundModalInstanceCtrl,
        size:'lg',
        resolve: {
          trans:function() {
            return trans;
          }
        }
     });
  }

}); // refundModalCtrl

var refundModalInstanceCtrl = function($scope,$modalInstance,trans,$http,$timeout,Notify,baseUrl) {
    $scope.trans = trans;

    // CANCEL REFUND
    $scope.cancelRefund = function() {
       $modalInstance.close();
    }


    // PROCESS REFUND
    $scope.processRefund = function(amount,transId) {


      var refundAmount = document.getElementById('refundAmount').value;
      $scope.refundAmount = refundAmount;

      if(refundAmount != '' && $scope.refundAmount < amount) {

      $('.MID_feedback').slideDown(300);
      $('#refundBtn').addClass('hidden');

      $scope.confirmRefund = function() {

      
      $http.post(baseUrl + 'transactions/' + transId + '/refund/' + refundAmount)
           .success(function(data,status) {
               
              //console.log(data);

              if(data.ApiResponse.ResultCode != 0) {

                  $scope.voidStatus = 'Refund Failed';

                  $('.MID_feedback').hide();
                  $('.userError').slideDown(300);
                  $('.refundFailReason').append( "<i class='fa fa-exclamation-triangle'></i> Refund failed." );
                  $timeout(function() {
                    $('.userError').slideUp(300);
                    $('.refundFailReason').empty();
                    $('#refundBtn').removeClass('hidden');
                  },2000);

                  Notify.sendMsg('RefundProcess', data);
                  
              } else {
              
              Notify.sendMsg('RefundProcess', data);
              // set status
              $scope.voidStatus = 'success';
              //$('.modal-body .action_btn').hide(); 
              //$('.refund-panel').hide();
              //$('.voidFeedback').show();
              $('.MID_feedback').slideUp(300);
              $('.userCreateSuccess').show();

              $timeout(function() {
                  $modalInstance.close();
               },1500);
              

              }

           }).error(function(data,status) {

              $('.MID_feedback').hide();
              $('.userError').slideDown(300);
              $('.refundFailReason').append( "<i class='fa fa-exclamation-triangle'></i> Refund failed." );
              $timeout(function() {
                $('.userError').slideUp(300);
                $('.refundFailReason').empty();
                $('#refundBtn').removeClass('hidden');
              },3500);


              // set status
              $scope.voidStatus = 'failed';

           });
      
      } // confirmRefund
    // refund greater than amount 
    } else if ($scope.refundAmount > amount){
        $('.userError').slideDown(300);
        $('.refundFailReason').append( "<i class='fa fa-exclamation-triangle'></i> Amount entered may not exceed than initial transaction." );
        $timeout(function() {
           $('.userError').slideUp(300);
           $('.refundFailReason').empty();
           $('#refundAmount').val('');
           $('#refundAmount' ).focus();
        },3500);
    // refund greater than amount close   
    } else {
        $('.userError').slideDown(300);
        $('.refundFailReason').append( "<i class='fa fa-exclamation-triangle'></i> Please enter a refund amount." );
        $timeout(function() {
           $('.userError').slideUp(300);
           $('.refundFailReason').empty();
           $('#refundAmount' ).focus();
        },2500);
    }

    } // processRefund
}


// VOID CONFIRMATION MODAL
app.controller('voidModalCtrl', function($scope,$modal,$log) {

  $scope.open = function(trans) {
    var modalInstance = $modal.open({
      templateUrl:'voidModalContent.html',
      controller:voidModalInstanceCtrl,
      size:'lg',
      resolve: {
        trans:function() {
           return trans;
        }
      }
    });

  } // function open

}); // end voidModalCtrl

var voidModalInstanceCtrl = function($scope,$modalInstance,trans,$http,$timeout,baseUrl) {
    $scope.trans = trans;
  console.log(trans);
  
  $scope.cancelVoid = function() {
    $modalInstance.close();
  }


  $scope.processVoid = function(transId) {
    
    $('.MID_feedback').slideDown(300);
    $('#voidBtn').addClass('hidden');

    
    $scope.confirmVoid = function() {
       
      $http.post(baseUrl + 'transactions/'+ transId + '/void')
           .success(function(data,status) {
               
               // Set Void Status
               $scope.voidStatus = 'success';

               $('.MID_feedback').slideUp(300);
               $('.userCreateSuccess').show();
               $timeout(function() {
                  $modalInstance.close();
               },1500);

        }).error(function(data,status) {
          console.log(data + ' ' + status);

            $('.MID_feedback').slideUp(300);
            $('.userError').slideDown(300);
            $('.voidFailReason').append( "<i class='fa fa-exclamation-triangle'></i> Void failed." );
            $timeout(function() {
              $('.userError').slideUp(300);
              $('.voidFailReason').empty();
              $('#voidBtn').removeClass('hidden');
            },2000);

          // Set Void Status
          $scope.voidStatus = 'failed';
         
        });
    
     }

  } // process void 
};