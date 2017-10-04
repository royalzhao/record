var app = angular.module('app',['ui.router','ng-layer','ui.bootstrap','bootstrapLightbox']);

app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            templateUrl:'template/search.html',
            controller:'appController'
        })
        .state('info',{
            url:'/info',
            templateUrl:'template/info.html'
        })
        .state('info.user',{
            url:'/user',
            templateUrl:'template/info_user.html',
            controller:'infoController'
        })
        .state('info.page',{
            url:'/page',
            templateUrl:'template/info_page.html',
            controller:'pageController'
        })
});

app.controller('appController',function ($scope, $uibModal, $log){
       
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'template/password.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'vm',
            backdrop: "static",
            size: size,
            resolve: {
                userId: function () {
                    return $scope.userId;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


})
app.controller('ModalInstanceCtrl', function ($uibModalInstance, userId,$state) {
    
    this.ok = function () {
       // console.log(userId)
        $state.go('info.user');
        $uibModalInstance.close(userId);
    };

    this.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
app.controller('pageController', function ($scope, Lightbox) {
    $scope.images = [
        {
          'url': 'img/img1.jpg',
          'caption': 'Optional caption',
          'thumbUrl': 'img/img1.jpg' // used only for this example
        },
        {
          'url': 'img/img2.jpg',
          'thumbUrl': 'img/img2.jpg'
        },
        {
          'url': 'img/img3.jpg',
          'thumbUrl': 'img/img3.jpg'
        }
      ];
    
      $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
      };
});