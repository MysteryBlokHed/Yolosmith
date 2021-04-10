// ==UserScript==
// @name         Yolosmith
// @description  A YOLO spammer.
// @version      0.1.0
// @homepage     https://github.com/MysteryBlokHed/Yolosmith
// @author       MysteryBlokHed
// @match        http://onyolo.com/m/*
// @downloadURL  https://github.com/MysteryBlokHed/Yolosmith/raw/stable/src/yolosmith.user.js
// @supportURL   https://github.com/MysteryBlokHed/Yolosmith/issues
// @grant        none
// ==/UserScript==
/*
 *  Yolosmith - A YOLO spammer.
 *  Copyright (C) 2021  Adam Thompson-Sharpe
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

(function () {
  // Function for POSTs
  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      redirect: 'follow',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Get cookies from document.cookie (used for popshow-temp-id)
  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      .split('=')[1];
  }

  function startSpamLoop(url, question, answer, delay, instances, counter) {
    for (let i = 0; i < instances; i++) {
      setInterval(() => {
        // Get reCAPTCHA token
        grecaptcha.ready(() => {
          grecaptcha
            .execute('6Lc8pbEUAAAAAH1vRl91BAwIZruc_awYoPLL_9p1', {
              action: 'message',
            })
            .then((token) => {
              // Prepare request data once the token is received
              let requestData = {
                cookie: getCookie('popshow-temp-id'),
                text: answer,
                token: token,
                wording: question,
              };

              // POST
              postData(url, requestData).then((data) => {
                // Increment counter
                if (data.code)
                  counter.innerText = parseInt(counter.innerText) + 1;
              });
            });
        });
      }, delay);
    }
  }

  function buildUi() {
    let ui = `<style>
  @font-face {
    font-family: 'Matter';
    src: url('https://d33e26whxge87.cloudfront.net/Matter-Medium.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: url('https://d33e26whxge87.cloudfront.net/Matter-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: url('https://d33e26whxge87.cloudfront.net/Matter-Bold.ttf') format('truetype');
    font-weight: bold;
    font-display: swap;
  }
</style>
<div align="center" style="font-family: 'Matter';">
  <h1>Yolosmith</h1>
  <h2>by MysteryBlokHed</h2>
  <h2><a href="https://github.com/MysteryBlokHed/Yolosmith">GitHub</a></h2>
  <div>
    <table>
      <tbody>
        <tr>
          <td>
            <label for="question">Question:</label>
          </td>
          <td>
            <input type="text" id="question" placeholder="What does Yolosmith do?">
          </td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td>
            <label for="answer">Answer:</label>
          </td>
          <td>
            <input type="text" id="answer" placeholder="Spam">
          </td>
        </tr>
        <tr>
          <td>
            <label for="rate">Rate (in ms):</label>
          </td>
          <td>
            <input type="number" id="rate" min="1" value="500">
          </td>
        </tr>
        <tr>
          <td>
            <label for="instances">Spam Instances:</label>
          </td>
          <td>
            <input type="number" id="instances" min="1" value="1">
          </td>
        </tr>
      </tbody>
    </table>
    <button id="go-spam">Spam</button>
  </div>
  <b>Messages Sent:</b>
  <span id="sent">0</span>
</div>`;

    let popup = window.open('', '', 'width=350, height=350, scrollbars=no');
    popup.document.body.innerHTML = ui;

    let goSpam = popup.document.querySelector('#go-spam');
    let question = popup.document.querySelector('#question');
    let answer = popup.document.querySelector('#answer');
    let rate = popup.document.querySelector('#rate');
    let instances = popup.document.querySelector('#instances');
    let sent = popup.document.querySelector('#sent');

    return [goSpam, question, answer, rate, instances, sent];
  }

  let postUrl =
    'http://onyolo.com/api/v2/messages/' +
    window.location.pathname.substring(3);

  let ui = buildUi();

  // Set spam question to current question by default
  const search = new URLSearchParams(location.search);
  ui[1].value = search.get('w');

  ui[0].onclick = () => {
    console.log('[Yolosmith] Beginning spam...');
    startSpamLoop(
      postUrl,
      ui[1].value,
      ui[2].value,
      ui[3].value,
      ui[4].value,
      ui[5]
    );
  };
})();
