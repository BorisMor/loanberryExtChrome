/// <reference path="background.class.ts" />
/// <reference path="def/chrome/chrome.d.ts"/>
var mainObject = new BackgroundClass();
mainObject.readBorrower();
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
});
//# sourceMappingURL=background.js.map