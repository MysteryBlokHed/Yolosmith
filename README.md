<h1 align="center">Yolosmith</h1>
<!-- Shields.io Badges -->
<p align="center">
    <a href="https://github.com/MysteryBlokHed/Yolosmith/releases"><img src="https://img.shields.io/github/v/release/MysteryBlokHed/Yolosmith?style=flat-square"></a>
    <a href="#license"><img src="https://img.shields.io/github/license/MysteryBlokHed/Yolosmith?style=flat-square"></a>
</p>
<!-- End of Badges -->
<p align="center">A YOLO spammer.</p>

## How to Use

### UserScript Extensions (eg. [Tampermonkey](https://www.tampermonkey.net/))

If you have a UserScript extension installed,
simply go to the [script](src/yolosmith.user.js) and press the "Raw" button.

### Paste Into Console

If you don't want to install an extension or you just want to run the code once,
then you can just paste the code into console:

1. Go to the [script](src/yolosmith.user.js) and press the "Raw" button

2. Copy the contents

3. Go to someone's YOLO page (eg. `http://onyolo.com/m/3M5k2AbD7l`)

4. Open the inspector (Ctrl + Shift + I or F12)

5. Go to the "Console" tab

6. Paste the contents and press enter

A popup will open once you're on someone's YOLO page. A counter below the button will
update while messages are sent.

Note: If you enter too low of a rate, you will be rate-limited by YOLO. You can tell
when this happens if the sent message ocunter stops update. If this occurs, just wait
5-10 minutes before trying again.

## UI Fields

| Field          | Explanation                                                            |
| -------------- | ---------------------------------------------------------------------- |
| Question       | Changing the question will change what it looks like your target asked |
| Answer         | The response to spam                                                   |
| Rate           | The delay between sent messages                                        |
| Spam Instances | How many spam instances to run at the same time                        |

## License

This project is licensed under the GNU General Public License, Version 3.0
([LICENSE](LICENSE) or <https://www.gnu.org/licenses/gpl-3.0.en.html>).
