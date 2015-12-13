app.service('SharedService', function ($http) {

    this.GetCitiesByStateId = function (StateId) {

        return $http.get("/api/Shared/GetCitiesByStateId?StateId=" + StateId);
    }
    this.GetSubCategoryByMainCategoryId = function (MainCategoryId) {
        return $http.get("/api/Shared/GetSubCategoryByMainCategoryId?MainCategoryId=" + MainCategoryId);
    }
});