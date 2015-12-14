function Deal() {

}

Deal.prototype = {

    Init: function () {
        Validation.prototype.AllowNumbersOnly("#Price");
        Validation.prototype.AllowKeyboard("#Price");
    }
}


$(function () {
    var DealObj = new Deal();
    DealObj.Init();
});