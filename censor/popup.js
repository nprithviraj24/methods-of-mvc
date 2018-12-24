// function myFunction() {
//     var checkBox = document.getElementById("myCheck");
//     var text = document.getElementById("text");
    
// }

$(function(){
    
   $('#myCheck').click(function(){
    // if (checkBox.checked == true){
        // chrome.browserAction.onClicked.addListener(toggleStatus);
        // chrome.runtime.onMessage.addListener(contentScriptMessageHandler);
        // chrome.tabs.onActivated.addListener(function (activeInfo) {
	    //     ensureTabStatus(activeInfo.tabId);
        // });
        
        $('#text').css("display","block");
        // $("#text").toggle(this.checked);
        // browser.browserAction.onClicked.addListener(toggleStatus);
    // } else {
    //     $('#text').css("display","none");
    // }
   });
});

