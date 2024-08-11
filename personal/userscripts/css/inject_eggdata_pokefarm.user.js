// ==UserScript==
// @name         Add Pokefarm Egg Labels
// @description  https://pokefarm.com/forum/thread/387659/CSS-One-Button-Fields-Egg-Labels-Typeless-Field-Variants - Egg Labels but as a userscript for me to use on phone.
// @match        *://pokefarm.com/*
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/Winterbraid/pokefarm-custom-css/main/egg-labels.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
/// ==/UserScript==

(function() {
    'use strict';
    const my_css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(my_css);
