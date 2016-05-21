angular.module('starter.controllers', ['ionic', 'ngCordova', 'starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  })
  .controller('booklistsCtrl', function($scope, $cordovaSQLite,DBA,bookshelfDB) {
    $scope.selectAll = function() {
      $scope.bookLists = [];
      // var query = "SELECT * from bookshelf";
      // DBA.query(query)
      // .then(function(result){
      //   alert(result.length)
      //   $scope.bookLists = result;
      // })
      var query = "select id, title,author,publisher,summary from bookshelf";
      $cordovaSQLite.execute(db, query).then(function(result) {
        $scope.bookLists = [];
        for (var i = 0; i < result.rows.length; i++) {
          $scope.bookLists.push(result.rows.item(i));
        }

      })
      
    }
    $scope.delete = function(id){
      bookshelfDB.remove({id:id});
      $scope.selectAll();
    }

  })
  .controller('BookDetailCtrl',function($scope,$stateParams,bookshelfDB){
    bookshelfDB.get($stateParams.id).then(function(result){
      $scope.booklist = result;
    })

  })
  .controller('PlaylistCtrl', function($scope, $stateParams) {})
  .controller('scanCtrl', function($scope, $cordovaBarcodeScanner, $http, $cordovaSQLite, bookshelfDB) {
    $scope.insert = function(bookData) {
      // var query = "INSERT INTO bookshelf(title,author,publisher,summary) values(?,?,?,?)";
      // $cordovaSQLite.execute(db, query, [bookData.title, bookData.author, bookData.publisher, bookData.summary])
      bookshelfDB.add(bookData)
        .then(function(result) {
          alert("成功" + result.insertId);
        }, function(err) {
          alert(err);
        })
    }
    $scope.scan = function() {
      $cordovaBarcodeScanner
        .scan()
        .then(function(barcodeData) {
          $http.get("https://api.douban.com/v2/book/isbn/" + barcodeData.text)
            .success(function(data) {
              $scope.insert(data);

            });
        })


    }


  })
  .controller('browseCtrl', function($scope, $cordovaSQLite, bookshelfDB) {
    $scope.bookData = {};
    $scope.addBook = function() {

      var query = "INSERT INTO bookshelf(title,author,publisher,summary) values(?,?,?,?)";
      $cordovaSQLite.execute(db, query, [$scope.bookData.title, $scope.bookData.author, $scope.bookData.publisher, $scope.bookData.summary])
        .then(function(result) {
          alert($scope.bookData.title + "添加成功！");
        }, function(err) {
          alert(err);
        })
    }
    $scope.reset = function(){
      $scope.bookData = {}
    }
  })