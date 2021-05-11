/* TwemojiEverywhere, a Powercord plugin to apply twemoji to places not usually affected by it
 * Copyright (C) 2021 Vendicated
 *
 * TwemojiEveryhwere is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TwemojiEverywhere is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with TwemojiEverywhere.  If not, see <https://www.gnu.org/licenses/>.
 */

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
