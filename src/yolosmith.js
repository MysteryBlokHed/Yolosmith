// ==UserScript==
// @name         Yolosmith
// @source       http://github.com/MysteryBlokHed/Yolosmith
// @version      v0.1.0
// @description  A YOLO spammer.
// @author       MysteryBlokHed
// @match        http://onyolo.com/m/*
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

(function() {
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
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == ' ')
      c = c.substring(1);

      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  }

  function getTokenAndSend(url, question, answer, delay, counter) {
    setInterval(function() {
      // Get reCAPTCHA token
      grecaptcha.ready(() => {
        grecaptcha.execute('6Lc8pbEUAAAAAH1vRl91BAwIZruc_awYoPLL_9p1', { action: 'message' })
        .then(token => {
          // Prepare request data once the token is received
          let requestData = {
            cookie: getCookie('popshow-temp-id'),
            text: answer,
            token: token,
            wording: question,
          }
          
          // POST
          postData(url, requestData)
          .then(data => {
            // Increment counter
            if(data.code) counter.innerText = parseInt(counter.innerText) + 1;
          });
        });
      });
    }, delay);
  }

  function buildUi() {
    let ui =
`<style>
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
<div style="text-align: center; font-family: 'Matter';">
  <h1>Yolosmith</h1>
  <h2>by MysteryBlokHed</h2>
  <h2><a href="https://github.com/MysteryBlokHed/Yolosmith">GitHub</a></h2>
  <div>
      <table style="margin-left: auto; margin-right: auto;">
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
                      <input type="number" id="rate" value="500">
                  </td>
              </tr>
          </tbody>
      </table>
      <button id="go-spam">Spam</button>
  </div>
  <b>Messages Sent:</b>
  <span id="sent">0</span>
</div>`;

    var popup = window.open('', "", "width=300, height=300, scrollbars=yes");
    popup.document.body.innerHTML = ui;

    let goSpam = popup.document.querySelector('#go-spam');
    let question = popup.document.querySelector('#question');
    let answer = popup.document.querySelector('#answer');
    let rate = popup.document.querySelector('#rate');
    let sent = popup.document.querySelector("#sent");

    return [goSpam, question, answer, rate, sent];
  }

  let postUrl = 'http://onyolo.com/api/v2/messages/' + window.location.pathname.substring(3);

  let ui = buildUi();

  ui[0].onclick = () => {
    console.log("[Yolosmith] Beginning spam...");
    getTokenAndSend(postUrl, ui[1].value, ui[2].value, ui[3].value, ui[4]);
  }
})();
