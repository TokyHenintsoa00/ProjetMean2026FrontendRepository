import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    template: `
        <footer class="footer">

            <!-- Glow line — mirrors topbar -->
            <div class="footer-glow"></div>

            <div class="footer-inner">

                <!-- Brand column -->
                <div class="footer-brand">
                    <a (click)="router.navigate(['/pages/landing'], { fragment: 'home' })" class="logo cursor-pointer">
                        <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                                fill="white"
                            />
                            <mask id="mask0_footer" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">
                                <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_footer)">
                                <path
                                    d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z"
                                    fill="white"
                                />
                            </g>
                        </svg>
                        <span class="logo-name">ShopMall</span>
                    </a>
                    <p class="brand-tagline">Votre destination shopping,<br/>repensée pour l'essentiel.</p>
                    <div class="social-row">
                        <a class="social-btn" href="#" aria-label="Discord">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                            </svg>
                        </a>
                        <a class="social-btn" href="#" aria-label="Instagram">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a class="social-btn" href="#" aria-label="Twitter / X">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Link columns -->
                <div class="footer-cols">

                    <div class="footer-col">
                        <h5 class="col-heading">Company</h5>
                        <ul>
                            <li><a class="col-link cursor-pointer">About Us</a></li>
                            <li><a class="col-link cursor-pointer">News</a></li>
                            <li><a class="col-link cursor-pointer">Investor Relations</a></li>
                            <li><a class="col-link cursor-pointer">Careers</a></li>
                            <li><a class="col-link cursor-pointer">Media Kit</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h5 class="col-heading">Resources</h5>
                        <ul>
                            <li><a class="col-link cursor-pointer">Get Started</a></li>
                            <li><a class="col-link cursor-pointer">Learn</a></li>
                            <li><a class="col-link cursor-pointer">Case Studies</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h5 class="col-heading">Community</h5>
                        <ul>
                            <li><a class="col-link cursor-pointer">Discord</a></li>
                            <li>
                                <a class="col-link cursor-pointer">
                                    Events
                                    <span class="link-badge">New</span>
                                </a>
                            </li>
                            <li><a class="col-link cursor-pointer">FAQ</a></li>
                            <li><a class="col-link cursor-pointer">Blog</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h5 class="col-heading">Legal</h5>
                        <ul>
                            <li><a class="col-link cursor-pointer">Brand Policy</a></li>
                            <li><a class="col-link cursor-pointer">Privacy Policy</a></li>
                            <li><a class="col-link cursor-pointer">Terms of Service</a></li>
                        </ul>
                    </div>

                </div>

            </div>

            <!-- Bottom bar -->
            <div class="footer-bottom">
                <span class="footer-copy">© 2026 ShopMall. All rights reserved.</span>
                <div class="footer-team">
                    <span class="team-label">Made by</span>
                    <span class="team-member">Ramanalinarivo Toky Henintsoa</span>
                    <span class="dot-sep">·</span>
                    <span class="team-member">Rakotohasimbola Zo</span>
                </div>
                <div class="footer-bottom-links">
                    <a class="bottom-link cursor-pointer">Privacy Policy</a>
                    <span class="dot-sep">·</span>
                    <a class="bottom-link cursor-pointer">Terms of Service</a>
                    <span class="dot-sep">·</span>
                    <a class="bottom-link cursor-pointer">Cookies</a>
                </div>
            </div>

        </footer>
    `,
    styles: [`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* ── FOOTER ── */
        .footer {
            position: relative;
            background: rgba(20, 28, 36, 0.88);
            backdrop-filter: blur(20px) saturate(160%);
            -webkit-backdrop-filter: blur(20px) saturate(160%);
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.5);
            font-family: 'DM Sans', sans-serif;
        }

        /* Glow line — mirror of topbar */
        .footer-glow {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(255,255,255,0.12) 30%,
                rgba(255,255,255,0.20) 50%,
                rgba(255,255,255,0.12) 70%,
                transparent 100%
            );
            pointer-events: none;
        }

        /* ── INNER LAYOUT ── */
        .footer-inner {
            display: flex;
            align-items: flex-start;
            gap: 4rem;
            padding: 3rem 2rem 2rem;
            max-width: 1280px;
            margin: 0 auto;
        }

        /* ── BRAND ── */
        .footer-brand {
            flex: 0 0 220px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .logo {
            display: inline-flex;
            align-items: center;
            gap: 11px;
            text-decoration: none;
        }

        .logo-svg {
            width: 34px;
            height: 34px;
            flex-shrink: 0;
        }

        .logo-name {
            font-family: 'Syne', sans-serif;
            font-size: 1.25rem;
            font-weight: 800;
            color: white;
            letter-spacing: -0.5px;
        }

        .brand-tagline {
            margin: 0;
            font-size: 0.82rem;
            font-weight: 400;
            color: rgba(255,255,255,0.38);
            line-height: 1.7;
        }

        /* Social icons */
        .social-row {
            display: flex;
            gap: 8px;
            margin-top: 4px;
        }

        .social-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.10);
            background: transparent;
            color: rgba(255,255,255,0.5);
            text-decoration: none;
            transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .social-btn:hover {
            background: rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.9);
            border-color: rgba(255,255,255,0.20);
        }

        /* ── LINK COLUMNS ── */
        .footer-cols {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
        }

        .footer-col ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
        }

        .col-heading {
            font-family: 'Syne', sans-serif;
            font-size: 0.72rem;
            font-weight: 800;
            color: rgba(255,255,255,0.35);
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin: 0 0 1rem 0;
        }

        .col-link {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-size: 0.875rem;
            font-weight: 500;
            color: rgba(255,255,255,0.55);
            text-decoration: none;
            padding: 3px 0;
            transition: color 0.2s ease;
            letter-spacing: 0.15px;
        }

        .col-link:hover {
            color: rgba(255,255,255,0.92);
        }

        /* Badge — same tokens as topbar nav-badge */
        .link-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.3);
            color: #10b981;
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 2px 7px;
            border-radius: 20px;
        }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem 1.25rem;
            max-width: 1280px;
            margin: 0 auto;
            border-top: 1px solid rgba(255,255,255,0.06);
        }

        .footer-copy {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.25);
            font-weight: 400;
        }

        .footer-team {
            display: flex;
            align-items: center;
            gap: 8px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        .team-label {
            font-size: 0.72rem;
            color: rgba(255,255,255,0.20);
            font-weight: 500;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .team-member {
            font-family: 'Syne', sans-serif;
            font-size: 0.75rem;
            font-weight: 700;
            color: rgba(255,255,255,0.45);
            letter-spacing: 0.2px;
            transition: color 0.2s ease;
        }

        .team-member:hover {
            color: rgba(255,255,255,0.80);
        }

        .footer-bottom-links {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .bottom-link {
            font-size: 0.78rem;
            font-weight: 500;
            color: rgba(255,255,255,0.30);
            text-decoration: none;
            transition: color 0.2s;
        }

        .bottom-link:hover {
            color: rgba(255,255,255,0.70);
        }

        .dot-sep {
            color: rgba(255,255,255,0.18);
            font-size: 0.78rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
            .footer-inner {
                flex-direction: column;
                gap: 2.5rem;
            }
            .footer-brand { flex: none; }
            .footer-cols { grid-template-columns: repeat(2, 1fr); width: 100%; }
        }

        @media (max-width: 480px) {
            .footer-inner { padding: 2rem 1.25rem 1.5rem; }
            .footer-bottom { padding: 1rem 1.25rem 1.25rem; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
            .footer-cols { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            .footer-team { position: static; transform: none; }
        }
    `]
})
export class FooterWidget {
    constructor(public router: Router) {}
}