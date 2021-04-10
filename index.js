const { Plugin } = require("powercord/entities");
const twemoji = require("./twemoji.min.js");

module.exports = class TwemojiEverywhere extends Plugin {
  async startPlugin() {
    this.observer = new MutationObserver(record => {
      if (record[0].target.classList === null) return;
      this.init();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    this.loadStylesheet("style.css");
  }
  
  pluginWillUnload() {
    if (this.observer) this.observer.disconnect();
  }

  init() {
    if (typeof this.timeout !== "undefined") return;
    this.timeout = setTimeout(() => delete this.timeout, 1000);
    // this.log("Detected change, reapplying twemoji");
    twemoji.parse(document.body);
  }
};
