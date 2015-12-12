app.service('UserService', function ($http) {
    debugger;
    //this.post = function (User) {
    //    var request = $http({
    //        method: "post",
    //        url: "/api/User",
    //        data: User
    //    });
    //    return request;
    //},

    this.getUsers = function () {
        debugger;
        return $http.get("/api/User/GetUsersList");
    }
    //,
    //this.chageStatus = function (id, action) {
    //    var request = $http({
    //        method: "post",
    //        url: "/api/User/EnableDisableUser?id=" + id + "&action=" + action,

    //    });
    //    return request;
    //},
    //this.EditUserByid = function (id) {
    //    return $http.get("/api/User/GetUserById?id=" + id);
    //},
    //this.LoginValidate = function (loginname) {
    //    return $http.get("/api/User/GetLoginName?Login=" + loginname);
    //}
    //this.EmailValidate = function (Email) {
    //    return $http.get("/api/User/GetEmailValidate?Email=" + Email);
    //}
});