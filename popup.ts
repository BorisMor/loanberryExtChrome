/// <reference path="def/chrome/chrome.d.ts"/>
/// <reference path="def/jquery.d.ts"/>
/// <reference path="def/underscore.d.ts"/>

class PopupClass {
    self = this;
    private windownBack;
    private backgroud;

    public DOM = {
        'update': null,
        'filterActive': null
    };

    public filter = {
        'active': false
    };

    public render(){
        var htmlTempItems = $('#tmp_item').html();
        $('.table.proposals tbody').empty();

        var tmp = this.backgroud.getTemplate('tmp_item',htmlTempItems);

        for(var i= 0, len = this.backgroud.itemsProposal.length; i < len; i++) {
            var item = this.backgroud.itemsProposal[i];
            if(typeof item.deal == "undefined") {
                item.deal = {};
            }

            if(this.filter.active && item.status !== "active") {
                continue;
            }

            // URL Просомтра
            item.url_view = (item.status === "active") ?
                'https://www.loanberry.ru/credit-requests/':
                'https://www.loanberry.ru/dealpublic/';
            item.url_view += item.id + "/";


            var trItem = tmp(item);
            $('.table.proposals tbody').append(trItem)
        }
    }

    public saveSettings(){
        chrome.storage.sync.set(this.filter, function(){
            console.log("saved");
        });
    }

    public loadSettings(callback:() => any){
        var self = this;
        chrome.storage.sync.get(this.filter, function(items){
            for(var nameValue in self.filter) {
                self.filter[nameValue] = items[nameValue];
            }

            self.DOM.filterActive.prop('checked', self.filter.active);
            callback.call(self);
        });
    }

    /**
     * Поставить фильтр только по активныым
     */
    public changeFilterActive(event){
        this.filter.active = this.DOM.filterActive.prop('checked');
        this.saveSettings();
        this.render();
    }

    /**
     * Обновить список  заявок
     * @param event
     */
    public clickUpdate(event){
        event.preventDefault();
        this.backgroud.readBorrower(() => this.render());
        return false;
    }

    /**
     * Иницилизируем DOM элементы
     */
    public initDOM(){
        this.DOM.filterActive = $('input[name="filterActive"]');
        this.DOM.filterActive.on('change', (event) => this.changeFilterActive(event))

        this.DOM.update = $('.update');
        this.DOM.update.on('click', (event) => this.clickUpdate(event))
    }

    constructor(){
        this.initDOM();
        this.windownBack = chrome.extension.getBackgroundPage();
        this.backgroud = this.windownBack.mainObject;
        this.loadSettings(this.render);
    }


}

$(function(){
    function test(){
        debugger;
    }
    var objPopup = new PopupClass();
});


