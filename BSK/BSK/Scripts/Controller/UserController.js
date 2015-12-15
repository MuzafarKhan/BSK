app.controller('UserController', function ($scope, $upload, UserService) {
    

    $scope.files = [];
    

    $scope.LoadUsers = function () {
        var usersList = UserService.getUsers();
        usersList.then(function (pl) {

            $scope.UsersList = pl.data
            
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

    $scope.SaveUser = function () {

        $scope.ShowError = false;
        $scope.ShowsuccessMesg = false;
        $scope.message = '';
        $scope.errors = [];

        var Userinfo = {
            intUserId : $scope.intUserId? $scope.intUserId : 0,
            vchName : $scope.vchName ? $scope.vchName : '',
            vchPassword : $scope.vchPassword ? $scope.vchPassword : '',
            vchEmail : $scope.vchEmail ? $scope.vchEmail : '',
            vchDateCreated : $scope.vchDateCreated ? $scope.vchDateCreated : '',
            intUserTypeId : $scope.intUserTypeId ? $scope.intUserTypeId : '',
            intContactNumberPrimary : $scope.intContactNumberPrimary ? $scope.intContactNumberPrimary : '',
            intContactNumberSecondary : $scope.intContactNumberSecondary ? $scope.intContactNumberSecondary : '',
            intCityId : $scope.intCityId ? $scope.intCityId : '',
            intBitActive: $scope.intBitActive ? $scope.intBitActive : ''
        }

        $upload.upload({
            url: "/api/User/InsertUpdateUser", // webapi url
            method: "POST",
            data: { fileUploadObj: Userinfo },
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
                $scope.SortExpression = 2;
                angular.element($("#UserModal")).scope().LoadUsers();
                $('#UserModal .close').click();
                Common.prototype.ShowSuccessMessage(Messages.UserSaved);
            }

        }).error(function (data, status, headers, config) {
            // file failed to upload
            console.log(data);
        });
    },
    $scope.LoginUser = function () {
        $scope.ShowError = false;
        $scope.ShowsuccessMesg = false;
        $scope.message = '';
        $scope.errors = [];

        $scope.Email = $scope.Email ? $scope.Email : '';
        $scope.Password = $scope.Password ? $scope.Password : '';

        var Login = UserService.Login($scope.Email, $scope.Password);
        Login.then(function (pl, status, headers, config) {
            if (pl.data.success === false) {
                $scope.errors = pl.data.errors;
                $scope.ShowError = true;
            }

            else {
                $('#UserModalLogin .close').click();
                location.reload();
            }
        }, function (err) {
            console.log("Err" + err);
        });
    }
    
});