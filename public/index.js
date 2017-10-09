var app = angular.module('app',['ui.router','ui.bootstrap','bootstrapLightbox']);

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
            templateUrl:'template/info.html',
            controller:'infoController'
        })
        .state('info.user',{
            url:'/user',
            templateUrl:'template/info_user.html',
            controller:'userController'
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
app.controller('infoController', function ($scope,$interval,$timeout,$state) {

    var lastTime = new Date();
    var time = 10000;
    $scope.time3 = 30;
    function operate(){
        var thisOperaTime = lastTime = new Date();
        $timeout(function(){
            if(thisOperaTime === lastTime){
                $scope.isZero = function(num){
                    return true;
                }
                var time2 = $timeout(function(){
                     $state.go('index')
                },30000)
                $scope.time3 =30
                $interval(function(){
                    $scope.time3--
                },1000)
            }else{
                $scope.isZero = function(num){
                    return false;
                }
            }
        },time)
    }
    operate();
    document.onmousedown = operate;
    document.onkeypress = operate;
    document.onscroll = operate;
 
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
