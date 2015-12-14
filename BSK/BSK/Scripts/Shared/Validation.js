
function Validation() {

}

//Evene.Which== 0 for Tab on FF

Validation.prototype = {
    AllowNumbersOnly: function (ctrl) {
        $(ctrl).keypress(function (e) {

            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

                return false;
            }
        });
    },
    ValidateFloorValue: function (ctrl) {
        if ($(ctrl).val() != undefined && $(ctrl).val() != "") {
            if ($(ctrl).val() > 200) {
                Common.prototype.AlertDialog('Floor Value is invalid.');
                $(ctrl).val('');
            }
        }
    },

    AllowDecimalOnly: function (ctrl) {
        $(ctrl).keypress(function (event) {

            if ((event.which == 45 && $(this).val() == '')) {
                return;
            }

            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57) && (event.which != 8 && event.which != 0)) {
                event.preventDefault();
            }

        });
    },

    SetInitialValue: function (ctrl) {
        $(ctrl).blur(function (event) {

            if ($(this).val() == '') {
                $(this).val('0');
            }
        });
    },
    AllowedAlphaNumericOnly: function (ctrl) {
        $(ctrl).keypress(function (ev) {
            if ((ev.which > 64 && ev.which < 91) || (ev.which > 96 && ev.which < 123) || (ev.which == 32 || (ev.which >= 48 && ev.which <= 57) || ev.which == 8 || ev.which == 0)) {
                return true;
            }
            else {
                ev.preventDefault();
            }
        });
    },

    AllowAlphabetsOnly: function (ctrl) {
        $(ctrl).keypress(function (event) {
            if ((event.which >= 65 && event.which < 91) || (event.which > 96 && event.which < 123 || event.which == 0)) {
                return true;
            }
            else {
                event.preventDefault();
            }
        });
    },
    //Disable Paste 
    AllowKeyboard: function (ctrl) {
        $(ctrl).bind("paste", function (e) {
            e.preventDefault();
        });
    },
    //Disable Cut copy Paste 
    DisableCutCopyPast: function (ctrlid) {
        $(ctrlid).bind("cut copy paste", function (e) {
            e.preventDefault();
        });
    },

    AllowAlphabetsWithSpace: function (ctrl) {
        $(ctrl).keypress(function (event) {
            if ((event.which >= 65 && event.which < 91) || (event.which > 96 && event.which < 123) || event.which == 32 || event.which == 0 || event.which == 8) {
                return true;
            }
            else {
                event.preventDefault();
            }
        });
    },

    FormatDate: function (date) {
        if (date == null) return;
        var date = new Date(date);
        return ((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
    },
    ValidateDateFormat: function (input) {
        //Basic check for format validity
        var validformat = /^\d{1,2}\/\d{1,2}\/\d{4}$/
        if (!validformat.test(input.value)) {
            bootbox.alert('Enter the correct Date Format');
            input.value = "";
            return false;
        }
    },
    //validate date in 1/1/0000 show infalid
    ValidateDate: function (input) {
        var matches = /(\d{2})[-\/](\d{2})[-\/](\d{4})/.exec(input.value);
        if (matches == null) return false;
        var m = parseInt(matches[1]);
        var d = parseInt(matches[2]);
        var y = parseInt(matches[3]);
        /// To Check input value length not grater than 10
        if (m < 1 || m > 12 || d < 1 || d > 31 || y == 0 || y < 1900 || y > 2100 || input.value.length > 10) {
            bootbox.alert('Enter the correct Date');
            input.value = "";
            return false;
        }
    },
    AllowTimeOnly: function (e) {
        //$(e).timepicker();
        $(e).keypress(function (e) {
            var regex = ["[0-2]",
            "[0-4]",
            ":",
            "[0-5]",
            "[0-9]",
            "(A|P)",
            "M"],
            string = $(this).val() + String.fromCharCode(e.which),
            b = true;
            for (var i = 0; i < string.length; i++) {
                if (!new RegExp("^" + regex[i] + "$").test(string[i])) {
                    b = false;
                }
            }
            return b;
        });
    },
    ValidateTimeFormat: function (input) {
        //Basic check for format validity
        if (input.value != "") {
            var validformat = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/
            if (!validformat.test(input.value)) {
                bootbox.alert('Enter the correct Time Format');
                input.value = "";
                return false;
            }
        }
    },
    AllowOnlyCurrency: function (input) {
        //Basic check for currency format restricted to 2 decimal places
        $(input).keyup(function (e) {
            if (this.value != null || this.value != "") {
                var val = this.value;
                var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
                var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
                if (re.test(val)) {
                    //do something here

                } else {
                    val = re1.exec(val);
                    if (val) {
                        this.value = val[0];
                    } else {
                        this.value = "";
                    }
                }
            }
        })
    },
    CompareDate: function (firstDate, secondDate) {
        //Basic Date comparer takes two arguments and returns true if firstDate param is greater
        var d1 = new Date(firstDate);
        var d2 = new Date(secondDate);
        if (d1 > d2)
            return true;
        else
            return false;
    },
    MaskUSPhoneNumber: function (obj) {
        $(obj).on('keydown', function (e) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                if ($(obj).val().length == 3)
                    $(obj).val($(obj).val() + "-");
                else if ($(this).val().length == 7)
                    $(obj).val($(obj).val() + "-");
            }
        });
    },


    confimPassBlur: function () {
        try {
            if ($("#Password").val() != "" && $("#Confirmpassword").val() != "") {
                if ($("#Password").val() != $("#Confirmpassword").val()) {
                    $("#Password").val("");
                    $("#Confirmpassword").val("");
                    Common.prototype.ShowSuccessMessage(Messages.PasswordMisMatch);
                }
            }

        }
        catch (error) {

        }
    },
    MaskDateOfBirth: function (obj) {
        $(obj).on('keydown', function (e) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                if ($(obj).val().length == 2)
                    $(obj).val($(obj).val() + "/");
                else if ($(this).val().length == 5)
                    $(obj).val($(obj).val() + "/");
                else if ($(this).val().length > 9)
                    e.preventDefault();
            }
        });
    },

    TruncateSpacesInTextBox: function (input) {
        $(input).on('change', function () {
            $(this).val($(this).val().replace(/\s+/g, " ").replace(/^\s|\s$/g, ""));
        });


    },


}