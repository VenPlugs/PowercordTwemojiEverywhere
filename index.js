/* TwemojiEverywhere, a Powercord plugin to apply twemoji to places not usually affected by it
 * Copyright (C) 2021 Vendicated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

const { Plugin } = require("powercord/entities");
const twemoji = require("./twemoji.js");

module.exports = class TwemojiEverywhere extends Plugin {
  async startPlugin() {
    this.observer = new MutationObserver(record => {
      if (record[0].target.classList === null) return;
      this.init();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    this.loadStylesheet("style.css");
  }

  pluginWillUnload() {
    if (this.observer) this.observer.disconnect();
  }

  init() {
    twemoji(document.body);
  }
};
