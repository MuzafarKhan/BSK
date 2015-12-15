app.service('UserService', function ($http) {

    this.getUsers = function () {
        return $http.get("/api/User/GetUsersList");
    },
    this.Login = function (Email, Password) {
        return $http.get("/api/User/Login?Email=" + Email + "&Password=" + encodeURIComponent(Password));
    }
    
});