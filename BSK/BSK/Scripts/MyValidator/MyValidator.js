    /* Author = Muzafar Khan*/  

  /* initialize All scope variables */
angular.element(document).ready(function () {
    var appElement = document.querySelector('[ng-app="BSK"]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function () {
        debugger;

        $scope.validemailonlyErrormsg = true;
        $scope.onlynumberErrormsg = true;
        $scope.passwordstrengthResult = true;
        $scope.passwordstrengthErrormsg = true;
        $scope.confirmpasswordErrormsg = true;
        $scope.onlystringErrormsg = true;
        $scope.validcontactErrormsg = true;

        angular.element('[ng-show="validemailonlyErrormsg"]').hide();
        angular.element('[ng-show="onlynumberErrormsg"]').hide();
        angular.element('[ng-show="passwordstrengthResult"]').hide();
        angular.element('[ng-show="passwordstrengthErrormsg"]').hide();
        angular.element('[ng-show="confirmpasswordErrormsg"]').hide();
        angular.element('[ng-show="onlystringErrormsg"]').hide();
        angular.element('[ng-show="validcontactErrormsg"]').hide();

        var myElements = angular.element(":input[data-required]");
        for (var i = 1; i < myElements.length + 1; i++) {
            var requiredErrormsgid = "requiredErrormsgid" + i;
            $scope[requiredErrormsgid] = true;

            var el = angular.element('[ng-show="requiredErrormsgid' + i + '"]');
            for (var j = 1; j < el.length + 1; j++) {
                angular.element('[ng-show="requiredErrormsgid' + i + '"]').hide();
            }
            var el1 = angular.element('[ng-show="!requiredErrormsgid' + i + '"]');
            for (var k = 1; k < el1.length + 1; k++) {
                angular.element('[ng-show="!requiredErrormsgid' + i + '"]').hide();
            }
        }

       
    });
});

    /* User to allow number only in input text field*/
    /* For using set data-numberonly="yes" of input attribute*/
    /* <input type="text" data-numberonly="yes" />*/

    $(document).ready(function () {
        var myElements = $('[data-onlynumber^="yes"]');
        for (var i = 0; i < myElements.length; i++) {
            myElements.keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: Ctrl+C
                    (e.keyCode == 67 && e.ctrlKey === true) ||
                    // Allow: Ctrl+X
                    (e.keyCode == 88 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything

                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }
    });


    /* User to allow valid email only in input text field*/
    /* For using set data-validemailonly="yes" of input attribute*/
    /* <input type="text" data-validemailonly="yes" />*/

    angular.element(document).ready(function () {
        debugger;
        var myElements = angular.element('[data-validemailonly^="yes"]');
        for (var i = 0; i < myElements.length; i++) {
            debugger;
            myElements.blur(function () {
                debugger;
                var testEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                if (testEmail.test(this.value)) {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.validemailonlyErrormsg = false;
                        myElements.after('<a href="#" data-toggle="popover" data-placement="right" data-content="Email Already Exist"> <i class="glyphicon-remove glyphicon text-danger"></i> </a>');
                        $('[data-toggle="popover"]').popover();
                       
                    });
                }
                else {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.validemailonlyErrormsg = true;
                        myElements.after('<i class="glyphicon-ok-circle glyphicon text-success"></i');
                        
                        angular.element('[ng-show="validemailonlyErrormsg"]').show();
                    });
                }
            });
        }
    });

    /* User to allow valid email only in input password field*/
    /* For using set data-passwordstrength="yes" of input attribute*/
    /* <input type="password" data-passwordstrength="yes" />*/

    /*
    jQuery document ready.
    */
    $(document).ready(function () {
        /*
        assigning keyup event to password field
        so everytime user type code will execute
        */

        $('[data-passwordstrength="yes"]').keyup(function () {
            $('[ng-show="passwordstrengthErrormsg"]').html(checkStrength($('#password').val()))
        })

        /*
        checkStrength is function which will do the
        main password strength checking for us
        */

        function checkStrength(password) {
            //initial strength
            var strength = 0
            //if the password length is less than 6, return message.
            if (password.length < 6) {
                $('[ng-show="passwordstrengthErrormsg"]').removeClass()
                $('[ng-show="passwordstrengthErrormsg"]').addClass('alert-danger')
                var appElement = document.querySelector('[ng-app="BSK"]');
                var $scope = angular.element(appElement).scope();
                $scope.$apply(function () {
                    $scope.passwordstrengthErrormsg = true;
                    //angular.element('[ng-show="passwordstrengthErrormsg"]').text(angular.element('[ng-show="passwordstrengthErrormsg"]').text());
                    angular.element('[ng-show="passwordstrengthErrormsg"]').show();
                });
                return 'Too short'
            }

            //length is ok, lets continue.

            //if length is 8 characters or more, increase strength value
            if (password.length > 7) strength += 1

            //if password contains both lower and uppercase characters, increase strength value
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1

            //if it has numbers and characters, increase strength value
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1

            //if it has one special character, increase strength value
            if (password.match(/([!,%,&,@@,#,$,^,*,?,_,~])/)) strength += 1

            //if it has two special characters, increase strength value
            if (password.match(/(.*[!,%,&,@@,#,$,^,*,?,_,~].*[!,%,&,@@,#,$,^,*,?,_,~])/)) strength += 1

            //now we have calculated strength value, we can return messages

            //if value is less than 2
            if (strength < 2) {
                debugger;
                $('[ng-show="passwordstrengthErrormsg"]').removeClass()
                $('[ng-show="passwordstrengthErrormsg"]').addClass('alert-danger')
                var appElement = document.querySelector('[ng-app="BSK"]');
                var $scope = angular.element(appElement).scope();
                $scope.$apply(function () {
                    $scope.passwordstrengthErrormsg = true;
                    //angular.element('[ng-show="passwordstrengthErrormsg"]').text(angular.element('[ng-show="passwordstrengthErrormsg"]').text());
                    angular.element('[ng-show="passwordstrengthErrormsg"]').show();
                });
                return 'Weak'
            }
            else if (strength == 2) {
                debugger;
                $('[ng-show="passwordstrengthErrormsg"]').removeClass()
                $('[ng-show="passwordstrengthErrormsg"]').addClass('alert-info')
                var appElement = document.querySelector('[ng-app="BSK"]');
                var $scope = angular.element(appElement).scope();
                $scope.$apply(function () {
                    $scope.passwordstrengthErrormsg = false;
                });
                return 'Good'
            }
            else {
                debugger;

                $('[ng-show="passwordstrengthErrormsg"]').removeClass()
                $('[ng-show="passwordstrengthErrormsg"]').addClass('alert-success')
                var appElement = document.querySelector('[ng-app="BSK"]');
                var $scope = angular.element(appElement).scope();
                $scope.$apply(function () {
                    $scope.passwordstrengthErrormsg = false;
                });
               
                return ''
            }
        }
    });


    angular.element(document).ready(function () {
        var myElements = angular.element('[data-confirmpassword^="yes"]');
        var myElementsconfirm = angular.element('[data-password^="yes"]');
        for (var i = 0; i < myElements.length; i++) {
            myElements.keyup(function () {
                debugger;
                if(myElements[0].value != myElementsconfirm[0].value)
                {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.confirmpasswordErrormsg = true;
                        //angular.element('[ng-show="confirmpasswordErrormsg"]').text(angular.element('[ng-show="confirmpasswordErrormsg"]').text());
                        angular.element('[ng-show="confirmpasswordErrormsg"]').show();
                    });
                }
                else
                {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.confirmpasswordErrormsg = false;
                    });
                }
            })
        }
    });



    /* User to allow number only in input text field*/
    /* For using set data-onlystring="yes" of input attribute*/
    /* <input type="text" data-onlystring="yes" />*/

    $(document).ready(function () {
        var myElements = $('[data-onlystring^="yes"]');
        for (var i = 0; i < myElements.length; i++) {
            myElements.keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                // Allow controls such as backspace
                var arr = [8, 16, 9 , 17, 20, 32, 35, 36, 37, 38, 39, 40, 45, 46];

                // Allow letters
                for (var i = 65; i <= 90; i++) {
                    arr.push(i);
                }

                // Prevent default if not in array
                if (jQuery.inArray(event.which, arr) === -1) {
                    event.preventDefault();
                }

                var ctrlKey = [17,87,67];
                // Prevent ctrl + c
                if (jQuery.inArray(event.which, ctrlKey) === -1 && e.ctrlKey === true) {
                    event.preventDefault();
                }

            });
        }
    });



    /* User to allow valid email only in input text field*/
    /* For using set data-validemailonly="yes" of input attribute*/
    /* <input type="text" data-validemailonly="yes" />*/

    angular.element(document).ready(function () {
        debugger;
        var myElements = angular.element('[data-validcontact^="yes"]');
        for (var i = 0; i < myElements.length; i++) {
            myElements.keyup(function () {
                debugger;
                var testEmail = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
                if (testEmail.test(this.value)) {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.validcontactErrormsg = false;
                        
                    });
                }
                else {
                    var appElement = document.querySelector('[ng-app="BSK"]');
                    var $scope = angular.element(appElement).scope();
                    $scope.$apply(function () {
                        $scope.validcontactErrormsg = true;
                        //angular.element('[ng-show="validcontactErrormsg"]').text(angular.element('[ng-show="validcontactErrormsg"]').text());
                        angular.element('[ng-show="validcontactErrormsg"]').show();
                    });
                }
            });
        }
    });


    $(document).ready(function () {
        $(":input[data-watermark]").each(function () {
            $(this).val($(this).attr("data-watermark"));
            debugger;
           
            $(this).bind('keydown', function () {
                if ($(this).val() == $(this).attr("data-watermark")) $(this).val('');
                debugger;
                debugger;
            });
            $(this).bind('blur', function () {
                if ($(this).val() == '') $(this).val($(this).attr("data-watermark"));
                debugger;
                //$(this).css('color', '#a8a8a8');
            });
            $(this).bind('keyup', function (e) {
                if ($(this).val() == '' && e.keyCode == 8) $(this).val($(this).attr("data-watermark"));
                debugger;
            });
        });
    });


    /* User to allow valid email only in input text field*/
    /* For using set data-required="data-requiredid1" of input attribute*/
    /* <input type="text" data-required="data-requiredid1" />*/

    angular.element(document).ready(function () {
        
        var myElements = angular.element(":input[data-required]");

            for (var i = 1; i < myElements.length + 1; i++) {
                myElements.blur(function (e1) {

                    debugger;
                    var _this = e1.currentTarget.attributes["data-required"].value;
                    if (e1.currentTarget.attributes["data-watermark"] !== undefined)
                        var datamarkvalue = e1.currentTarget.attributes["data-watermark"].value;
                    else
                        var datamarkvalue = "";
                    
                    if (e1.currentTarget.value == "" || e1.currentTarget.value == datamarkvalue) {
                        var appElement = document.querySelector('[ng-app="BSK"]');
                        var $scope = angular.element(appElement).scope();
                        $scope.$apply(function () {
                            $scope[_this] = true;
                            angular.element('[ng-show="' + _this + '"]').show();
                            angular.element('[ng-show="!' + _this + '"]').show();
                        });
                    }
                    else {
                        var appElement = document.querySelector('[ng-app="BSK"]');
                        var $scope = angular.element(appElement).scope();
                        $scope.$apply(function () {
                            angular.element('[ng-show="' + _this + '"]').show();
                            angular.element('[ng-show="!' + _this + '"]').show();
                            $scope[_this] = false;
                        });
                    }
                });
            }
    });