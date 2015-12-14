var app;
(function () {
    app = angular.module("BSK", ['angularFileUpload']);
})();
app.factory('PagingService', function () {

    var paging = {};
    paging.PagingDom = function (startIndex, endIndex) {
        var start = startIndex;
        var end = start + 4;
        if (end >= endIndex) { end = endIndex; start = end - 4 > 1 ? end - 4 : 1; }
        var ret = [];
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    };
    return paging;

});