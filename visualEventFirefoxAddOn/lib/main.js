var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon16.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.activeTab.attach({
      contentScriptFile: self.data.url("visualEvent.js")
    });
}
