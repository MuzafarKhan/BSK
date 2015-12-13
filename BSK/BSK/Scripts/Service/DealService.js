app.service('DealService', function ($http) {
    
    this.getDeals = function (PageId, SortExpression, SortBy) {
        
        return $http.get("/api/Deal/GetDealsList?PageId=" + PageId + "&SortExpression=" + SortExpression + "&SortBy=" + SortBy);
    }
    
});