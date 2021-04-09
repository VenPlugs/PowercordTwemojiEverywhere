const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");
const { runInThisContext } = require("vm");

module.exports = class Reacter extends Plugin {
  async startPlugin() {
    await get(
      "https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
    ).then((res) => runInThisContext(res.raw));
    this.twemoji = twemoji;

    this.observer = new MutationObserver(() => this.init());
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
    this.twemoji.parse(document.body);
  }
};
