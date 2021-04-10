const { Plugin } = require("powercord/entities");
const twemoji = require("./twemoji.min.js");

module.exports = class TwemojiEverywhere extends Plugin {
  async startPlugin() {
    this.observer = new MutationObserver(record => {
      if (!record.target.classList) return;
      this.init();
    });
    this.observer.observe(document.head, {
      childList: true,
      subtree: true,
    });
  }

  pluginWillUnload() {
    if (this.observer) this.observer.disconnect();
  }

  init() {
    this.log("Detected change, reapplying twemoji");
    twemoji.parse(document.body);
  }
};
