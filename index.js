/*
 This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.
*/

const searchEngines = {
    "Yahoo!": "https://search.yahoo.com/search?p=",
    "Bing": "https://www.bing.com/search?q=",
    "Wikipedia": "https://wikipedia.org/wiki/",
    "Brave": "https://search.brave.com/search?q=",
    "DuckDuckGo": "https://duckduckgo.com/?q=",
    "Google": "https://www.google.com/search?q=",
    "Ecosia": "https://www.ecosia.org/search?q=",
    "YouTube": "https://www.youtube.com/results?search_query=",
    "Twitter": "https://twitter.com/search?q=",
    "Amazon": "https://www.amazon.com/s?k=",
    "TMDB": "https://www.themoviedb.org/search?query=",
    "Netflix": "https://www.netflix.com/search?q=",
    "Prime Video": "https://www.amazon.com/s?i=instant-video&k=",
    "Translate": "https://translate.google.com/?source=osdd#auto|auto|"
};

function handleSearch(event) {
  if (event.isComposing || event.defaultPrevented || !event.isTrusted) {
    return;
  }

  const {selectEl, inputEl} = getElements();

  if (event.code === 'Tab') {
    event.preventDefault();
    toggleFocus(inputEl, selectEl);
  }

  if (event.code === 'Enter') {
    event.preventDefault();
    const {searchSelectValue, searchInputValue} = getSearchInputValues(selectEl, inputEl);
    if (!searchEngines[searchSelectValue] || searchInputValue.length < 1 || searchInputValue.length > 80) {
      return;
    }

    const baseUrl = searchEngines[searchSelectValue];
    const url = new URL(baseUrl + encodeURIComponent(searchInputValue));

    event.shiftKey ? window.open(url, '_blank') : window.location.assign(url);
  }
}

function getElements() {
  const selectEl = document.querySelector('#search-select');
  const inputEl = document.querySelector('#search-input');
  return {selectEl, inputEl};
}

function getSearchInputValues(selectEl, inputEl) {
  const searchSelectValue = selectEl.value;
  const searchInputValue = inputEl.value.trim();
  return {searchSelectValue, searchInputValue};
}

function toggleFocus(inputEl, selectEl) {
  if (document.activeElement === inputEl) {
    selectEl.focus();
  } else {
    inputEl.focus();
  }
}

window.addEventListener('keydown', handleSearch, true);
