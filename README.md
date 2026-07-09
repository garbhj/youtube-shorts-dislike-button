# Description
**A lightweight userscript that enhances YouTube Shorts:**
  - replaces the new "Heart" icon with the old "Thumbs-up" icon.
  - recreates the Dislike button, and maps a double-click to "Don't recommend this channel".

As of the end of June 2026, Youtube has removed the Dislike button from Youtube Shorts, and is changing the Like button into a Heart icon.
For the few of us who watch Youtube Shorts on desktop for some reason, it's not so hard to revert these changes. 

**NOTE:**
  - **Only in version 4 does the dislike button actually register the action with Youtube (sends POST request to /youtubei/v1/like/dislike)**
  - In versions 3 and 4, a **double-tap of the dislike button** maps to "Don't recommend this channel" in the top-right menu.
    - To manage your "Not Interested" settings, go to the [Google My Activity YouTube user feedback page](https://myactivity.google.com/page?hl=en&page=youtube_user_feedback).
  - In version 2, the dislike button is cosmetic only.

# Instructions
To use this, you'll need to:
  1. Install a userscript manager (such as [Tampermonkey from the Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)).
  2. Click "create a new script".
  3. Download or copy and paste the code from [this repo](https://github.com/garbhj/youtube-shorts-dislike-button).
  4. Click save, and enable it when you visit Youtube (it should be enabled by default after saving).

Note: Always verify that a userscript is safe before running it. Malicious scripts can be used to steal session data and perform unauthorized actions, among other things.

Verify permissions (@grant) and scope (@match) in the header, and scan the code for any suspicious network connections. Be especially careful with obfuscated scripts (meaning scripts intentionally modified to be unreadable). Or just ask ChatGPT.

Also uploaded to GreasyFork for easier installation [here](https://greasyfork.org/en/scripts/585643-youtube-shorts-restore-thumbs-up-dislike).

# Demo
https://github.com/user-attachments/assets/a96f7c25-a7f7-4ef8-919d-c2b875f176d4

# Other Notes
If you have feedback or encounter any problems, feel free to open an issue, and I may or may not ever get around to looking at it (who knows how long this script will even be relevant for).
