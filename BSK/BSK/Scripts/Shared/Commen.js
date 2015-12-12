

function Common() {

}

Common.prototype = {

    Init: function () {
        this.SubmitForm();
        this.ShowValidationSummary();
        //this.ClearFormOnModalClose();
        this.TagListClick();
        this.RangeSlider();
        this.ValidateTextInput();
    },
    SubmitForm: function () {
        $('form').submit(function () {
            if (!$(this).valid()) { // checks form is valid.
                $(".alert").show(); // hides it       
            }
            //else {
            //    $('[type="submit"]').prop("disabled", "disabled");
            //}
        });

    },
    ShowValidationSummary: function () {
        if ($(".alert").text().length > 1) {
            $(".alert").show();
        }

    },

    ConfirmDialog: function (message, elem) {
        try {

            bootbox.confirm(message, function (result) {
                if (result)
                    window.location.href = elem;
            });

            return false;
        }
        catch (error) {
            ;
        }
    },

    ConfirmDialogForAngular: function (message) {
        try {
            var value = false;
            bootbox.confirm(message, function (result) {



            });

            return value;
        }
        catch (error) {
            ;
        }
    },
    AlertDialog: function (message) {
        try {

            bootbox.alert(message, function () {
            });
        }
        catch (error) {
            ;
        }
    },

    AlertDialog: function (message) {
        try {
            bootbox.alert(message, function () {
            });
        }
        catch (error) {
            ;
        }
    },


    AlertDialogHtml: function (Message, title) {

        try {
            bootbox.dialog({
                title: title,
                message: Message
            });
        }
        catch (error) {
            ;
        }
    },
    ClearFormOnModalClose: function () {
        $('[data-dismiss=modal]').on('click', function (e) {
            var $t = $(this),
                target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];

            $(target)
              .find("input,textarea,select")
                 .val('')
                 .end()
              .find("input[type=checkbox], input[type=radio]")
                 .prop("checked", "")
                 .end();
        })
    },

    ShowErrorMessage: function (message) {
        try {
            if (message != undefined && message != "") {
                $('#divError').fadeIn();
                $('#divError').text(message);
                setTimeout(function () { $('#divError').fadeOut() }, 3000);
            }
        }
        catch (error) {

        }
    },
    FormatNumericValue: function (value, Currency, Percent, Commas, Precision) {
        var pre = "";
        var post = "";
        var StringValue = "";
        var PrecisionString = "";
        var neg = false;

        if (parseInt(value) < 0) {
            neg = true
            value = Math.abs(value);
        }

        //if at this point the value is not a number, then just clear out the current value	
        if (isNaN(value)) {
            return "";
        }

        value = parseFloat(value).toFixed(2);
        var IntegerPart
        var DecimalPart

        var iIndex = value.indexOf(".")
        if (iIndex < 0) {

            value = Math.abs(value)

            IntegerPart = String(parseInt(value))

            if (isNaN(IntegerPart)) { return '' }

            if (Precision >= 1) {
                DecimalPart = "."
                for (var d = 0; d < Precision; d++) {
                    DecimalPart = DecimalPart + "0"
                }
            } else {
                DecimalPart = ''
            }
        }
        else {
            if (iIndex == 0) {
                IntegerPart = "0"
            } else {
                IntegerPart = String(value).substr(0, iIndex)
                IntegerPart = Math.abs(IntegerPart)
            }
            if (isNaN(IntegerPart)) {
                IntegerPart = "0"
            } else {

                IntegerPart = parseInt(Math.abs(IntegerPart))
            }

            if (Precision >= 1) {
                DecimalPart = String(value).substr(iIndex, parseInt(Precision) + 1);

                if (DecimalPart.length < Precision + 1) {
                    for (var d = DecimalPart.length - 1; d < Precision; d++) {
                        DecimalPart = DecimalPart + "0"
                    }
                }
            } else {
                DecimalPart = ''
            }
        }

        PrecisionString = DecimalPart
        if (Currency) pre = "$";
        if (Percent) post = "%";
        //alert(Commas)
        if (Commas && Commas != 0) {
            var NumberLength = String(IntegerPart).length;

            var startpo = 0;
            var currentpo = NumberLength % 3;
            if (currentpo == 0) currentpo += 3;

            var CommaString = ""

            if (NumberLength > 3) {
                for (; currentpo < NumberLength; currentpo += 3) {
                    CommaString += String(IntegerPart).substring(startpo, currentpo) + ","

                    startpo = currentpo;
                }
                CommaString += String(IntegerPart).substring(startpo, currentpo)

            } else {
                CommaString = String(IntegerPart)
            }
            StringValue = CommaString;
        } else {
            StringValue = IntegerPart;
        }
        if (neg) {
            pre = "- " + pre
        }

        StringValue = pre + StringValue + PrecisionString + post;
        return StringValue

    },

    ShowSuccessMessage: function (message) {
        try {
            if (message != undefined && message != "") {
                $('#divSuccess').fadeIn();
                $('#divSuccess').text(message);
                setTimeout(function () { $('#divSuccess').fadeOut() }, 3000);
            }
        }
        catch (error) {

        }
    },

    goToByScroll: function (id) {
        id = id.replace("link", "");
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top - ($("#subFixedHeader").outerHeight() + 60)
        },
            1500);
    },

    TagListClick: function () {
        $(".tag-list > li > a").click(function (e) {
            if ($(this).attr("id") != "adminlink") {
                e.preventDefault();
                Common.prototype.goToByScroll($(this).attr("id"));
            }
        });
    },

    RangeSlider: function () {
        try {
            $("#range_slider, #range_slider1").noUiSlider({
                start: [0, 100],
                connect: true,
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        } catch (error) {

        }
    },


    ValidateTextInput: function () {

        $('input[type="text"], textarea,input[type="password"]').each(function () {
            $(this).blur(function () {

                if ($(this).val() != "" && $(this).val() != undefined) {
                    if ($(this).val().toLowerCase().indexOf("<") >= 0 || $(this).val().toLowerCase().indexOf(">") >= 0 || $(this).val().toLowerCase().indexOf("<script>") >= 0 || $(this).val().toLowerCase().indexOf("<frameset>") >= 0 || $(this).val().toLowerCase().indexOf("<div>") >= 0 || $(this).val().toLowerCase().indexOf("<iframe>") >= 0 || $(this).val().toLowerCase().indexOf("<meta>") >= 0 || $(this).val().toLowerCase().indexOf("<link>") >= 0 || $(this).val().toLowerCase().indexOf("<style>") >= 0 || $(this).val().toLowerCase().indexOf("<body>") >= 0) {

                        Common.prototype.AlertDialog("Input field contains restricted content.");
                        $(this).val('');
                    }
                }
            });
        });
    },

    //Validate uploaded file for images only
    ValidateMIMEType: function (element) {
        try {

            if (element.files[0].type == "image/jpeg" || element.files[0].type == "image/png" || element.files[0].type == "image/gif") {
                return true;
            }
            else {
                return false;
            }
        }
        catch (ex) {

        }
    },

    SearchProperty: function (fromPage) {
        if (fromPage == "Search") {
            window.location.href = "/Research/Search?s=" + $("#txtPropSearch").val();
        }
        else {
            window.location.href = "/Property/index?s=" + $("#txtSearch").val();
        }
    },

    getQuerystringValue: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

};

// Map
$(function () {
    $(".map_outer").appendTo("body");
});


$(function () {
    var commObj = new Common();
    commObj.Init();
});

// Sorting Script
$('a[ng-click*=sortGrid]').click(function () {
    $('a[ng-click]').toggleClass('sort-show');
});
// Script for Makinf "XRC capital in whole application"

//$(window).load(function () {
//    $('table tr td a').each(function () {
//        var text = $(this).text();
//        $(this).text(text.replace('  Xrc', 'XRC'));
//    });
//});
