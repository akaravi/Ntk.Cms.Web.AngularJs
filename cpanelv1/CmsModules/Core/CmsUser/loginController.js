app.controller("loginCtrl", ["$scope", "$http", "ajax", "rashaErManage", "$state", "$translate", "$filter", function ($scope, $http, ajax, rashaErManage, $state, $translate, $filter) {

 
    var login = this;

    login.captchaModel={
        Expire: "",
        Key: "",
        image: ""
    }
    //For Show Loading Indicator
    login.loginBusyIndicator = {
        isActive: false,
        message: "لطفا منتظر بمانید ..."
    }
    login.language = "fa_IR";
    login.emailPattern = "^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$";

    login.init = function () {
        var savedLang = localStorage.getItem("userLanguage");
        if (!savedLang) {
            localStorage.setItem("userLanguage", login.language);
            $translate.use(login.language);
        } else {
            login.language = savedLang;
            $translate.use(savedLang);
        }
        login.Captcha();
    }
login.Captcha=function(){
    login.loginRequest = true;
    login.loginBusyIndicator.isActive = true;
    ajax.call(cmsServerConfig.configApiServerPath+"Auth/captcha", "", "GET").success(function (response) {
        login.captchaModel= response.Item;
        login.loginRequest = false;
        login.loginBusyIndicator.isActive = false;
    }).error(function (data, errCode, c, d) {
        login.loginRequest = false;
        login.loginBusyIndicator.isActive = false;

        rashaErManage.checkAction(data, errCode);
    });

}
    login.loginRequest = false;
    login.verifyLogin = function () {
        login.loginRequest = true;
        login.loginBusyIndicator.isActive = true;
        var modelDto={
            captchaKey: login.captchaModel.Key,
            captchaText: login.captchaText,
             email: login.emailData, 
             password: login.passwordData, 
             lang: login.language 
            };
        ajax.call(cmsServerConfig.configApiServerPath+"Auth/signIn", modelDto, "POST").success(function (response) {
            rashaErManage.checkAction(response);
            login.loginRequest = false;
            login.loginBusyIndicator.isActive = false;
            if (response.IsSuccess && response.Item) {
                localStorage.setItem("userToken", response.Item.Token);
                $state.go("siteSelector", {});
            }
            else
            {
                login.emailData ="";
                login.passwordData ="";
                login.captchaText ="";
                login.Captcha();
            }

        }).error(function (data, errCode, c, d) {
            login.loginRequest = false;
            login.loginBusyIndicator.isActive = false;
            login.emailData ="";
            login.passwordData ="";
            login.captchaText ="";
            //login.init();
            rashaErManage.checkAction(data, errCode);
        });
    }

    login.goToNewSite = function () {
        $state.go("newSiteWizard", {});
    }

    login.goToNewUser = function () {
        $state.go("newUserWizard", {});
    }

    login.changeLang = function () {
        $translate.use(login.language);
        localStorage.setItem("userLanguage", login.language);   //#help# Save User language in localStorage
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };


}]);