function Deal() {

}

Deal.prototype = {

    Init: function () {
        Validation.prototype.AllowNumbersOnly("#txtPrice");
        Validation.prototype.AllowKeyboard("#txtPrice");
    }
}


$(function () {
    var DealObj = new Deal();
    DealObj.Init();
});