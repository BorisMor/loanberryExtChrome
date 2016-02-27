/// <reference path="def/chrome/chrome.d.ts"/>
/// <reference path="def/jquery.d.ts"/>
/// <reference path="def/underscore.d.ts"/>
var PopupClass = (function () {
    function PopupClass() {
        this.self = this;
        this.DOM = {
            'update': null,
            'filterActive': null
        };
        this.filter = {
            'active': false
        };
        this.initDOM();
        this.windownBack = chrome.extension.getBackgroundPage();
        this.backgroud = this.windownBack.mainObject;
        this.loadSettings(this.render);
    }
    PopupClass.prototype.render = function () {
        var htmlTempItems = $('#tmp_item').html();
        $('.table.proposals tbody').empty();
        var tmp = this.backgroud.getTemplate('tmp_item', htmlTempItems);
        for (var i = 0, len = this.backgroud.itemsProposal.length; i < len; i++) {
            var item = this.backgroud.itemsProposal[i];
            if (typeof item.deal == "undefined") {
                item.deal = {};
            }
            if (this.filter.active && item.status !== "active") {
                continue;
            }
            // URL Просомтра
            item.url_view = (item.status === "active") ?
                'https://www.loanberry.ru/credit-requests/' :
                'https://www.loanberry.ru/dealpublic/';
            item.url_view += item.id + "/";
            var trItem = tmp(item);
            $('.table.proposals tbody').append(trItem);
        }
    };
    PopupClass.prototype.saveSettings = function () {
        chrome.storage.sync.set(this.filter, function () {
            console.log("saved");
        });
    };
    PopupClass.prototype.loadSettings = function (callback) {
        var self = this;
        chrome.storage.sync.get(this.filter, function (items) {
            for (var nameValue in self.filter) {
                self.filter[nameValue] = items[nameValue];
            }
            self.DOM.filterActive.prop('checked', self.filter.active);
            callback.call(self);
        });
    };
    /**
     * Поставить фильтр только по активныым
     */
    PopupClass.prototype.changeFilterActive = function (event) {
        this.filter.active = this.DOM.filterActive.prop('checked');
        this.saveSettings();
        this.render();
    };
    /**
     * Обновить список  заявок
     * @param event
     */
    PopupClass.prototype.clickUpdate = function (event) {
        var _this = this;
        event.preventDefault();
        this.backgroud.readBorrower(function () { return _this.render(); });
        return false;
    };
    /**
     * Иницилизируем DOM элементы
     */
    PopupClass.prototype.initDOM = function () {
        var _this = this;
        this.DOM.filterActive = $('input[name="filterActive"]');
        this.DOM.filterActive.on('change', function (event) { return _this.changeFilterActive(event); });
        this.DOM.update = $('.update');
        this.DOM.update.on('click', function (event) { return _this.clickUpdate(event); });
    };
    return PopupClass;
})();
$(function () {
    function test() {
        debugger;
    }
    var objPopup = new PopupClass();
});
//# sourceMappingURL=popup.js.map