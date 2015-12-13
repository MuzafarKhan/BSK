app.controller('DealController', function ($scope, $upload, DealService, SharedService) {

    $scope.files = [];
    $scope.PageId = 1;
    $scope.SortExpression = 0;

    $scope.LoadDeals = function () {
        var DealsList = DealService.getDeals($scope.PageId, $scope.SortExpression,$scope.SortBy);
        DealsList.then(function (pl) {
            angular.element($("#DealGrid")).scope().DealsList = pl.data;            
        },
              function (errorPl) {
                  
              });
    },

     $scope.setFiles = function (element) {

         // On false it will run.
         $scope.files = [];
         if (!Common.prototype.ValidateMIMEType(element)) {
             $("#filePhotoUrl").val('');
             Common.prototype.AlertDialog(Messages.InvalidPhotoFormat);
         }
         else {
             $scope.files.push(element.files[0]);
         }
     };

    $scope.SaveDeal = function () {

        $scope.ShowError = false;
        $scope.ShowsuccessMesg = false;
        $scope.message = '';
        $scope.errors = [];

        var Deal = {
            DealId : $scope.DealId?$scope.DealId:'',
            CategoryId: $scope.SubCategoryId ? $scope.SubCategoryId : '',
            CategoryType : $scope.CategoryType?$scope.CategoryType:'',
            vchTitle : $scope.vchTitle?$scope.vchTitle:'',
            vchDescription : $scope.vchDescription?$scope.vchDescription:'',
            BitActive : $scope.BitActive?$scope.BitActive:'',
            UserId : $scope.UserId?$scope.UserId:'',
            vchDateCreated : $scope.vchDateCreated?$scope.vchDateCreated:'',
            CityId : $scope.CityId?$scope.CityId:'',
            BitNegotiable : $scope.BitNegotiable?$scope.BitNegotiable:'',
            Price : $scope.Price?$scope.Price:'',
        }

        $upload.upload({
            url: "/api/Deal/InsertUpdateDeal", // webapi url
            method: "POST",
            data: { fileUploadObj: Deal },
            file: $scope.files
        }).progress(function (evt) {
            // get upload percentage
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            // file is uploaded successfully

            if (data.errors != undefined && data.errors.length > 0) {
                $scope.errors = [];
                for (var k = 0; k < data.errors.length; k++) {
                    $scope.errors[k] = data.errors[k];
                }
                $scope.ShowError = true;
            }
            else {
                $("#DealModal").toggle();
                $scope.LoadDeals();
                $scope.SortExpression = 2;
                if (angular.element($("#ShowDealGrid")).scope() != undefined)
                    angular.element($("#ShowDealGrid")).scope().LoadDeals();
                $('#DealModal .close').click();
                Common.prototype.ShowSuccessMessage(Messages.DealSaved);
                
            }

        }).error(function (data, status, headers, config) {
            // file failed to upload
            console.log(data);
        });
    }
    $scope.GetCitiesByStateId = function (StateId) {
        var Cities = SharedService.GetCitiesByStateId(StateId);
        Cities.then(function (pl) {
            $scope.CityId = 0;
            $scope.Cities = pl.data;
        });
    };
    $scope.GetSubCategoryByMainCategoryId = function (MainCategoryId) {
        var SubCategories = SharedService.GetSubCategoryByMainCategoryId(MainCategoryId);
        SubCategories.then(function (pl) {
            $scope.SubCategoryId = 0;
            $scope.SubCategories = pl.data;
        });
    };
});