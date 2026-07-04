// ==UserScript==
// @name         YouTube Shorts: Restore Thumbs Up & Dislike
// @namespace    https://github.com/garbhj
// @version      3.1
// @description  Reverts the heart button to a thumbs-up and re-adds the dislike button independently. Double-tapping Dislike also triggers "Don't recommend this channel". Fixes state and UI glitches after scroll.
// @author       Garbhj
// @match        *.youtube.com/shorts/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// ==/UserScript==

(function() {
    'use strict';

    const THUMBS_UP_PATH = "M9.221 1.795a1 1 0 011.109-.656l1.04.173a4 4 0 013.252 4.784L14 9h4.061a3.664 3.664 0 013.576 2.868A3.68 3.68 0 0121 14.85l.02.087A3.815 3.815 0 0120 18.5v.043l-.01.227a2.82 2.82 0 01-.135.663l-.106.282A3.754 3.754 0 0116.295 22h-3.606l-.392-.007a12.002 12.002 0 01-5.223-1.388l-.343-.189-.27-.154a2.005 2.005 0 00-.863-.26l-.13-.004H3.5a1.5 1.5 0 01-1.5-1.5V12.5A1.5 1.5 0 013.5 11h1.79l.157-.013a1 1 0 00.724-.512l.063-.145 2.987-8.535Zm-1.1 9.196A3 3 0 015.29 13H4v4.998h1.468a4 4 0 011.986.528l.27.155.285.157A10 10 0 0012.69 20h3.606c.754 0 1.424-.483 1.663-1.2l.03-.126a.819.819 0 00.012-.131v-.872l.587-.586c.388-.388.577-.927.523-1.465l-.038-.23-.02-.087-.21-.9.55-.744A1.663 1.663 0 0018.061 11H14a2.002 2.002 0 01-1.956-2.418l.623-2.904a2 2 0 00-1.626-2.392l-.21-.035-2.71 7.741Z";
    const THUMBS_UP_FILLED_PATH = "M10.72 2.18a3.263 3.263 0 012.352 4.063l-.708 2.476a1 1 0 00.962 1.275h5.29c.848 0 1.624.48 2.003 1.238l.179.359a1.785 1.785 0 01-.6 2.279.446.446 0 00-.198.37v.07c0 .124.041.246.116.346a2.375 2.375 0 01-.41 3.278l-.5.399a.38.38 0 00-.123.416l.07.206c.217.653.1 1.372-.313 1.923a2.8 2.8 0 01-2.24 1.12l-3.914-.002a12 12 0 01-5.952-1.584l-.272-.155a2.002 2.002 0 00-.993-.265H3a1 1 0 01-1-1v-5.996a1 1 0 011.002-1L5.789 12a1 1 0 00.945-.67l3.02-8.628a.816.816 0 01.967-.523Z";

    const THUMBS_DOWN_PATH = "m11.31 2 .392.007c1.824.06 3.61.534 5.223 1.388l.343.189.27.154c.264.152.56.24.863.26l.13.004H20.5a1.5 1.5 0 011.5 1.5V11.5a1.5 1.5 0 01-1.5 1.5h-1.79l-.158.013a1 1 0 00-.723.512l-.064.145-2.987 8.535a1 1 0 01-1.109.656l-1.04-.174a4 4 0 01-3.251-4.783L10 15H5.938a3.664 3.664 0 01-3.576-2.868A3.682 3.682 0 013 9.15l-.02-.088A3.816 3.816 0 014 5.5v-.043l.008-.227a2.86 2.86 0 01.136-.664l.107-.28A3.754 3.754 0 017.705 2h3.605ZM7.705 4c-.755 0-1.425.483-1.663 1.2l-.032.126a.818.818 0 00-.01.131v.872l-.587.586a1.816 1.816 0 00-.524 1.465l.038.23.02.087.21.9-.55.744a1.686 1.686 0 00-.321 1.18l.029.177c.17.76.844 1.302 1.623 1.302H10a2.002 2.002 0 011.956 2.419l-.623 2.904-.034.208a2.002 2.002 0 001.454 2.139l.206.045.21.035 2.708-7.741A3.001 3.001 0 0118.71 11H20V6.002h-1.47c-.696 0-1.38-.183-1.985-.528l-.27-.155-.285-.157A10.002 10.002 0 0011.31 4H7.705Z";
    const THUMBS_DOWN_FILLED_PATH = "M11.313 2.002c2.088 0 4.14.546 5.953 1.583l.273.156a2 2 0 00.993.264H21a1 1 0 011 1V11a1 1 0 01-1.002 1l-2.787-.005a1 1 0 00-.946.67l-3.02 8.628a.815.815 0 01-.966.522 3.262 3.262 0 01-2.35-4.062l.707-2.477a1 1 0 00-.961-1.274h-5.29a2.24 2.24 0 01-2.004-1.238l-.18-.359a1.784 1.784 0 01.601-2.278.446.446 0 00.198-.37v-.07a.578.578 0 00-.116-.347 2.374 2.374 0 01.412-3.278l.498-.399a.379.379 0 00.123-.415l-.07-.207a2.1 2.1 0 01.313-1.923A2.798 2.798 0 017.4 2l3.913.002Z";

    const DONT_RECOMMEND_SVG_PATH = "M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 018.246 12.605L4.755 6.661A8.99 8.99 0 0112 3ZM3.754 8.393l15.491 8.944A9 9 0 013.754 8.393Z";

    const createBaseSvgElement = () => {
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.style.pointerEvents = "none";
        svg.style.display = "inherit";
        svg.style.width = "100%";
        svg.style.height = "100%";

        // Inject blank path; CSS rules will instantly fill it with the correct data string
        const path = document.createElementNS(ns, "path");
        path.setAttribute("fill", "currentColor");
        svg.appendChild(path);

        return svg;
    };

    // The menu may have delay, so poll for the "Don't recommend" item and click it once it exists.
    const clickDontRecommend = (attempts = 0) => {
        const items = document.querySelectorAll('yt-list-item-view-model');
        for (const item of items) {
            const pathEl = item.querySelector('svg path');
            const pathData = pathEl?.getAttribute('d');
            if (pathData && pathData == DONT_RECOMMEND_SVG_PATH) {
                (item.querySelector('button') || item).click();
                return;
            }
        }
        if (attempts < 20) { // ~20 frames (~1/3s) is plenty for the popup to render
            requestAnimationFrame(() => clickDontRecommend(attempts + 1));
        }
    };

    // Open the "More actions" menu for this Short and select "Don't recommend this channel"
    const triggerDontRecommend = () => {
        const moreBtn = document.querySelector('#right-controls button[aria-label="More actions"]');
        //console.log("Found button:", moreBtn);
        if (!moreBtn) {
            console.error("Failed to find the More Actions button.");
            return;
        }
        moreBtn.click();
        requestAnimationFrame(() => clickDontRecommend());
        console.log("To view and edit your 'Don't recommend this channel' settings, visit: https://myactivity.google.com/page?hl=en&page=youtube_user_feedback")
    };

    // Override button graphics using Native CSS (Instant)
    const style = document.createElement('style');
    style.textContent = `
        /* Overrides for Like Button */
        like-button-view-model:not(.custom-dislike-btn) button[aria-pressed="false"] svg path { d: path("${THUMBS_UP_PATH}") !important; }
        like-button-view-model:not(.custom-dislike-btn) button[aria-pressed="true"] svg path { d: path("${THUMBS_UP_FILLED_PATH}") !important; }

        /* Overrides for Dislike Button */
        .custom-dislike-btn button[aria-pressed="false"] svg path { d: path("${THUMBS_DOWN_PATH}") !important; }
        .custom-dislike-btn button[aria-pressed="true"] svg path { d: path("${THUMBS_DOWN_FILLED_PATH}") !important; }

        /* Disable YouTube's pop-in heart animation layer */
        like-button-view-model yt-animated-icon { display: none !important; }
        like-button-view-model yt-icon { display: block !important; }
    `;
    document.head.appendChild(style);

    let currentUrl = window.location.href;

    const updateButtons = () => {
        if (!window.location.pathname.startsWith('/shorts/')) return;

        // Reset Dislike button states if we just scrolled to a new Short (URL change)
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            document.querySelectorAll('.custom-dislike-btn button').forEach(btn => {
                btn.setAttribute('aria-pressed', 'false');
                btn.className = btn.className.replace(/--filled/gi, '--tonal');
            });
        }

        document.querySelectorAll('reel-action-bar-view-model').forEach(bar => {
            const likeBtnWrapper = bar.querySelector('like-button-view-model:not(.custom-dislike-btn)');
            if (!likeBtnWrapper) return;

            let dislikeWrapper = bar.querySelector('.custom-dislike-btn');

            if (!dislikeWrapper) {
                // Ensure YouTube has fully injected the button data before cloning
                const likeLabelSpan = likeBtnWrapper.querySelector(".ytSpecButtonShapeWithLabelLabel span");
                if (!likeLabelSpan || !likeLabelSpan.textContent.trim()) return;

                // Clone the entire like button wrapper
                dislikeWrapper = likeBtnWrapper.cloneNode(true);
                dislikeWrapper.classList.add("custom-dislike-btn");

                const label = dislikeWrapper.querySelector(".ytSpecButtonShapeWithLabelLabel span");
                if (label) label.textContent = "Dislike";

                const btn = dislikeWrapper.querySelector("button");
                if (btn) {
                    btn.setAttribute("aria-label", "Dislike this video");
                    btn.setAttribute("aria-pressed", "false");

                    // Reset the newly cloned button back to unpressed (--tonal format) visually
                    btn.classList.replace('--filled', '--tonal');

                    const iconContainer = btn.querySelector('.ytSpecButtonShapeNextIcon');
                    if (iconContainer) {
                        iconContainer.replaceChildren(createBaseSvgElement());
                    }

                    // Bind isolated click and double-click logic for Dislike
                    let lastTap = 0;

                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const currentTime = new Date().getTime();
                        const tapLength = currentTime - lastTap;
                        //console.log(`Current Time: ${new Date(currentTime).toLocaleString()}`);
                        //console.log(`Time Since Last Tap: ${tapLength}ms`);

                        lastTap = currentTime;
                        // Check for Double-click/Double-tap
                        if (tapLength < 300 && tapLength > 0) {
                            triggerDontRecommend();
                            return; // Prevent double-click from flipping state
                        }
                        // Handle Single-click Logic
                        const isCurrentlyPressed = btn.getAttribute('aria-pressed') === 'true';
                        const newState = !isCurrentlyPressed;
                        btn.setAttribute('aria-pressed', newState.toString());
                        if (newState) {
                            // Handle logic to un-press like button if dislike is pressed
                            btn.classList.replace('--tonal', '--filled');
                            const realLikeBtn = likeBtnWrapper.querySelector('button');
                            if (realLikeBtn && realLikeBtn.getAttribute('aria-pressed') === 'true') {
                                realLikeBtn.click();
                            }
                        } else {
                            btn.classList.replace('--filled', '--tonal');
                        }
                    });
                }

                likeBtnWrapper.insertAdjacentElement('afterend', dislikeWrapper);

                // Handle logic to un-press dislike button if like is pressed
                const realLikeBtn = likeBtnWrapper.querySelector("button");
                realLikeBtn.addEventListener("click", () => {
                    requestAnimationFrame(() => {
                        if (realLikeBtn.getAttribute("aria-pressed") === "true") {
                            const dislikeBtn = dislikeWrapper.querySelector("button");
                            dislikeBtn.setAttribute("aria-pressed", "false");
                            dislikeBtn.classList.replace("--filled", "--tonal");
                        }
                    });
                });

            } else {
                // Sync Classes: Keep cloned UI dynamic classes from going stale when YouTube recycles elements
                const syncClasses = (selector) => {
                    const src = likeBtnWrapper.querySelector(selector);
                    const tgt = dislikeWrapper.querySelector(selector);
                    if (src && tgt) {
                        if (selector === 'button') {
                            const isPressed = tgt.getAttribute('aria-pressed') === 'true';
                            let targetClassName = src.classList.value;

                            // Adjust the class logic safely so our cloned button retains its independent toggle state
                            if (isPressed) {
                                targetClassName = targetClassName.replace(/--tonal/gi, '--filled');
                            } else {
                                targetClassName = targetClassName.replace(/--filled/gi, '--tonal');
                            }

                            if (tgt.className !== targetClassName) {
                                tgt.className = targetClassName;
                            }
                        } else {
                            if (tgt.className !== src.className) {
                                tgt.className = src.className;
                            }
                        }
                    }
                };

                syncClasses('label');
                syncClasses('button');
                syncClasses('yt-touch-feedback-shape');

                // Enforce the text (In case YouTube's recycler engine accidentally wiped it)
                const labelText = dislikeWrapper.querySelector(".ytSpecButtonShapeWithLabelLabel span");
                if (labelText && labelText.textContent !== "Dislike") {
                    labelText.textContent = "Dislike";
                }
            }
        });
    };

    updateButtons();

    let isThrottled = false;
    const observer = new MutationObserver(() => {
        if (isThrottled) return;
        isThrottled = true;
        window.requestAnimationFrame(() => {
            updateButtons();
            isThrottled = false;
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'aria-pressed', 'd']
    });

})();
