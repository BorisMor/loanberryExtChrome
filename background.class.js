/// <reference path="def/jquery.d.ts" />
/// <reference path="def/underscore.d.ts" />
var BackgroundClass = (function () {
    function BackgroundClass() {
        this.url = {
            loadPropsal: 'https://api.loanberry.ru/proposal/listForPublic?expand=1&page=1&pageSize=100&sort=rating'
        };
        this.itemsProposal = [];
        this._templates = {};
    }
    /**
     * Запросить шаблон
     * @param templateName
     * @param templateContent
     * @returns {any}
     */
    BackgroundClass.prototype.getTemplate = function (templateName, templateContent) {
        if (typeof this._templates[templateName] == "undefined") {
            this._templates[templateName] = _.template(templateContent);
        }
        return this._templates[templateName];
    };
    BackgroundClass.prototype.test = function () {
        debugger;
    };
    /**
     * Загрзуить данные по заявкам
     * @param callback Успешно
     * @param callbackError С ошибкой
     */
    BackgroundClass.prototype.loadProposal = function (callback, callbackError) {
        this.itemsProposal = [];
        var self = this;
        $.ajax({
            'url': this.url.loadPropsal,
            'success': function (ret) {
                debugger;
                self.itemsProposal = ret.content.proposals;
                callback();
            },
            'error': function (XHR) {
                console.log(XHR);
                callbackError();
            }
        });
    };
    BackgroundClass.prototype.readBorrower = function (callback) {
        this.loadProposal(function () {
            if (typeof callback == "function") {
                callback();
            }
        }, function () {
        });
    };
    return BackgroundClass;
})();
//# sourceMappingURL=background.class.js.map