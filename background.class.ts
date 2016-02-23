/// <reference path="def/jquery.d.ts" />
/// <reference path="def/underscore.d.ts" />

class BackgroundClass {
    private url = {
        loadPropsal: 'https://api.loanberry.ru/proposal/listForPublic?expand=1&page=1&pageSize=100&sort=rating'
    };

    public itemsProposal = [];
    private _templates = {};

    /**
     * Запросить шаблон
     * @param templateName
     * @param templateContent
     * @returns {any}
     */
    private getTemplate (templateName, templateContent){
        if(typeof this._templates[templateName] == "undefined") {
            this._templates[templateName] = _.template(templateContent)
        }

        return this._templates[templateName];
    }

    public test(){
        debugger;
    }

    /**
     * Загрзуить данные по заявкам
     * @param callback Успешно
     * @param callbackError С ошибкой
     */
    private loadProposal(callback, callbackError){
        this.itemsProposal = [];
        var self = this;
        $.ajax({
            'url': this.url.loadPropsal,
            'success': function(ret){
                debugger;
                self.itemsProposal = ret.content.proposals;
                callback();
            },
            'error': function(XHR){
                console.log(XHR);
                callbackError();
            }
        });
    }


    public readBorrower(callback?){
        this.loadProposal(function(){
            if(typeof callback == "function"){
                callback();
            }
        }, function(){

        });
    }
}