import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `<app-floating-configurator />
<div class="min-h-screen min-w-screen overflow-hidden flex items-center justify-center p-4" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
    <div class="login-container">
        <div class="login-split-card">
            <!-- Left Panel - Welcome Section -->
            <div class="left-panel">
                <div class="welcome-content">
                    <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-20">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                            fill="white"
                        />
                        <mask id="mask0_1413_1551" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">
                            <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_1413_1551)">
                            <path
                                d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z"
                                fill="white"
                            />
                        </g>
                    </svg>
                    <h1 class="text-6xl font-bold mb-6">Bonjour !</h1>
                    <p class="text-xl opacity-90 leading-relaxed">Entrez vos informations personnelles et commencez votre voyage avec nous</p>
                    <div class="decorative-circle circle-1"></div>
                    <div class="decorative-circle circle-2"></div>
                    <div class="decorative-circle circle-3"></div>
                </div>
            </div>

            <!-- Right Panel - Login Form -->
            <div class="right-panel">
                <div class="form-content">
                    <div class="text-center mb-8">
                        <h2 class="text-4xl font-bold text-surface-900 dark:text-surface-0 mb-3">Se connecter</h2>
                        <p class="text-muted-color text-lg">à votre compte</p>
                    </div>

                    <form (ngSubmit)="login()" #myForm="ngForm">
                        <div class="mb-6">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-base font-semibold mb-2">Email</label>
                            <input 
                                pInputText 
                                id="email1" 
                                type="text" 
                                placeholder="votre@email.com" 
                                class="w-full split-input" 
                                [(ngModel)]="loginUser.email" 
                                [ngModelOptions]="{standalone: true}" 
                                name="email" 
                            />
                        </div>

                        <div class="mb-6">
                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-semibold text-base mb-2">Mot de passe</label>
                            <p-password 
                                id="password1" 
                                [(ngModel)]="loginUser.pwd" 
                                [ngModelOptions]="{standalone: true}" 
                                placeholder="••••••••" 
                                [toggleMask]="true" 
                                styleClass="split-password" 
                                [fluid]="true" 
                                [feedback]="false"
                            ></p-password>
                        </div>

                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center">
                                <p-checkbox 
                                    [(ngModel)]="checked" 
                                    [ngModelOptions]="{standalone: true}" 
                                    id="rememberme1" 
                                    binary 
                                    class="mr-2"
                                ></p-checkbox>
                                <label for="rememberme1" class="text-surface-700 dark:text-surface-300">Se souvenir de moi</label>
                            </div>
                            <a class="font-medium no-underline cursor-pointer text-primary hover:underline">Mot de passe oublié?</a>
                        </div>

                        <p-button 
                            label="CONNEXION" 
                            styleClass="w-full split-button" 
                            type="submit"
                        ></p-button>
                    </form>

                    <div class="text-center mt-8">
                        <p class="text-muted-color mb-4">Pas encore de compte?</p>
                        <p-button 
                            label="Créer un compte" 
                            styleClass="w-full p-button-outlined split-button-outlined" 
                            routerLink="/signUp"
                        ></p-button>
                    </div>

                    <div class="divider-container">
                        <div class="divider-line"></div>
                        <span class="divider-text">OU</span>
                        <div class="divider-line"></div>
                    </div>

                    <div class="social-buttons-grid">
                        <button type="button" class="social-button">
                            <svg class="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" class="social-button">
                            <svg class="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.login-container {
    width: 100%;
    max-width: 1100px;
}

.login-split-card {
    display: grid;
    grid-template-columns: 45% 55%;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    min-height: 700px;
}

/* Left Panel Styles */
.left-panel {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    position: relative;
    overflow: hidden;
}

.welcome-content {
    position: relative;
    z-index: 2;
}

.left-panel h1 {
    margin: 0;
    line-height: 1.2;
}

.left-panel p {
    font-size: 1.125rem;
    line-height: 1.8;
}

/* Decorative circles */
.decorative-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
}

.circle-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
}

.circle-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
}

.circle-3 {
    width: 150px;
    height: 150px;
    bottom: 100px;
    right: 50px;
    background: rgba(255, 255, 255, 0.05);
}

/* Right Panel Styles */
.right-panel {
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--surface-0);
}

.dark .right-panel {
    background: var(--surface-900);
}

.form-content {
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
}

/* Custom Input Styles */
:host ::ng-deep .split-input {
    padding: 16px !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 12px !important;
    font-size: 15px !important;
    transition: all 0.3s ease !important;
    background: var(--surface-50) !important;
}

:host ::ng-deep .split-input:hover {
    border-color: #d1d5db !important;
}

:host ::ng-deep .split-input:focus {
    outline: none !important;
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}

/* Password Input Styles */
:host ::ng-deep .split-password .p-password-input {
    padding: 16px !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 12px !important;
    font-size: 15px !important;
    transition: all 0.3s ease !important;
    background: var(--surface-50) !important;
}

:host ::ng-deep .split-password .p-password-input:hover {
    border-color: #d1d5db !important;
}

:host ::ng-deep .split-password .p-password-input:focus {
    outline: none !important;
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}

/* Button Styles */
:host ::ng-deep .split-button .p-button {
    padding: 16px !important;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    border: none !important;
    border-radius: 12px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    transition: all 0.3s ease !important;
}

:host ::ng-deep .split-button .p-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3) !important;
}

:host ::ng-deep .split-button-outlined .p-button {
    padding: 16px !important;
    background: transparent !important;
    border: 2px solid #10b981 !important;
    color: #10b981 !important;
    border-radius: 12px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
}

:host ::ng-deep .split-button-outlined .p-button:hover {
    background: #10b981 !important;
    color: white !important;
    transform: translateY(-2px);
}

/* Divider */
.divider-container {
    display: flex;
    align-items: center;
    margin: 30px 0;
    gap: 15px;
}

.divider-line {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
}

.divider-text {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 500;
}

/* Social Buttons */
.social-buttons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    background: white;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.social-button:hover {
    border-color: #10b981;
    color: #10b981;
    transform: translateY(-2px);
}

/* Checkbox Styles */
:host ::ng-deep .p-checkbox .p-checkbox-box {
    border: 2px solid #d1d5db;
    border-radius: 6px;
}

:host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {
    background: #10b981;
    border-color: #10b981;
}

/* Responsive Design */
@media (max-width: 968px) {
    .login-split-card {
        grid-template-columns: 1fr;
    }

    .left-panel {
        display: none;
    }

    .right-panel {
        padding: 40px 30px;
    }
}

@media (max-width: 640px) {
    .right-panel {
        padding: 30px 20px;
    }

    .form-content {
        padding: 0;
    }

    .social-buttons-grid {
        grid-template-columns: 1fr;
    }
}

/* Dark Mode Adjustments */
.dark .login-split-card {
    background: var(--surface-900);
}

.dark .social-button {
    background: var(--surface-800);
    border-color: var(--surface-700);
    color: var(--surface-200);
}

.dark .social-button:hover {
    border-color: #10b981;
    color: #10b981;
}

.dark .divider-line {
    background: var(--surface-700);
}

.dark .divider-text {
    color: var(--surface-400);
}
</style>`
})
export class Login {

    loginUser = {email:'',pwd:''};
    checked: boolean = false;

    constructor(private userservice:UserService,private router:Router){};

    login()
    {
        console.log("clique login");
        const logUser = {
            email:this.loginUser.email,
            pwd:this.loginUser.pwd,
            rememberMe:this.checked
        }

        this.userservice.signIn(logUser).subscribe({
            next:(res) =>{
                console.log("log user");
            
                console.log(res);
                this.loginUser = {email:'',pwd:''};
            },
            error:(err)=>{
                console.log(err);
            }
        });
    }

    // email: string = '';

    // password: string = '';

    
}
