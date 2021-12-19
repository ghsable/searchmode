/*
 This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.
*/

const json = {
    "Yahoo!": "https://search.yahoo.co.jp/search?p=",
    "Bing": "https://www.bing.com/search?q=",
    "Wikipedia": "https://ja.wikipedia.org/wiki/",
    "DuckDuckGo": "https://duckduckgo.com/?q=",
    "Google": "https://www.google.com/search?q=",
    "Ecosia": "https://www.ecosia.org/search?q=",
    "YouTube": "https://www.youtube.com/results?search_query=",
    "Twitter": "https://twitter.com/search?q=",
    "Amazon": "https://www.amazon.co.jp/s?k=",
    "Filmarks": "https://filmarks.com/search/movies?q=",
    "Netflix": "https://www.netflix.com/search?q=",
    "Prime Video": "https://www.amazon.co.jp/s?i=instant-video&k=",
    "Translate": "https://translate.google.com/?source=osdd#auto|auto|"
};

window.addEventListener('keydown', event => {
  if (event.isComposing || event.defaultPrevented || !event.isTrusted) {
    return;
  }

  if (event.code === 'Tab') {
    event.preventDefault();

    if (document.activeElement.id === 'search-input') {
      document.getElementById('search-select').focus();
    } else {
      document.getElementById('search-input').focus();
    }
  }

  if (event.code === 'Enter') {
    event.preventDefault();

    const searchSelectValue = document.getElementById('search-select')['value'];
    const searchInputValue = document.getElementById('search-input')['value'];

    if (json[searchSelectValue] === undefined || json[searchSelectValue] === null ||
       searchInputValue.length < 1) {
        return;
    }

    const url = new URL(json[searchSelectValue] + searchInputValue);

    if (event.shiftKey) { window.open(url, '_blank');  }
    else                { window.location.assign(url); }
  }
}, true);
