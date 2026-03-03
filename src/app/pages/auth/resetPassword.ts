import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-resetPassword',
    standalone: true,
    imports: [ButtonModule, CommonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
<app-floating-configurator />

<div class="login-page">

  <!-- Fond animé -->
  <div class="bg-layer">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>
    <div class="grid-overlay"></div>
  </div>

  <div class="login-wrapper">

    <!-- LEFT — Branding -->
    <div class="brand-panel">
      <div class="brand-inner">

        <div class="brand-logo">
          <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
              fill="white"/>
          </svg>
          <span class="brand-name">ShopMall</span>
        </div>

        <div class="brand-headline">
          <div class="headline-tag">Sécurité du compte</div>
          <h1 class="headline-title">Nouveau<br/>mot de<br/><span class="headline-accent">passe</span></h1>
          <p class="headline-sub">Choisissez un mot de passe sécurisé pour protéger votre compte ShopMall.</p>
        </div>

        <div class="brand-stats">
          <div class="stat-item">
            <span class="stat-num">200+</span>
            <span class="stat-label">Boutiques</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">50k</span>
            <span class="stat-label">Clients</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">4.9</span>
            <span class="stat-label">Note</span>
          </div>
        </div>

      </div>
    </div>

    <!-- RIGHT — Form -->
    <div class="form-panel">
      <div class="form-inner">

        <!-- ── TOKEN INVALIDE ── -->
        <ng-container *ngIf="tokenError">
          <div class="form-header">
            <div class="status-icon-wrapper error">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2 class="form-title">Lien invalide</h2>
            <p class="form-subtitle">Ce lien de réinitialisation est expiré ou invalide. Veuillez faire une nouvelle demande.</p>
          </div>
          <a routerLink="/forgotPassword" class="btn-primary" style="text-decoration:none;">
            <span>Demander un nouveau lien</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </ng-container>

        <!-- ── SUCCÈS ── -->
        <ng-container *ngIf="successMessage && !tokenError">
          <div class="form-header">
            <div class="status-icon-wrapper success">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 class="form-title">Mot de passe mis à jour !</h2>
            <p class="form-subtitle">{{ successMessage }}</p>
          </div>
          <a routerLink="/logIn" class="btn-primary" style="text-decoration:none;">
            <span>Se connecter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </ng-container>

        <!-- ── FORMULAIRE ── -->
        <ng-container *ngIf="!successMessage && !tokenError">

          <div class="form-header">
            <div class="status-icon-wrapper lock">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 class="form-title">Réinitialisation</h2>
            <p class="form-subtitle">Entrez votre nouveau mot de passe</p>
          </div>

          <form (ngSubmit)="onSubmit()" #resetForm="ngForm" class="login-form">

            <!-- Nouveau mot de passe -->
            <div class="field-group">
              <label class="field-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Nouveau mot de passe
              </label>
              <p-password
                [(ngModel)]="resetData.newPassword"
                name="newPassword"
                placeholder="Minimum 8 caractères"
                [toggleMask]="true"
                [feedback]="true"
                styleClass="custom-password"
                [fluid]="true"
                promptLabel="Entrez un mot de passe"
                weakLabel="Faible"
                mediumLabel="Moyen"
                strongLabel="Fort"
                required
              ></p-password>
              <small *ngIf="passwordError" class="field-error">{{ passwordError }}</small>
            </div>

            <!-- Confirmer mot de passe -->
            <div class="field-group">
              <label class="field-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Confirmer le mot de passe
              </label>
              <p-password
                [(ngModel)]="resetData.confirmPassword"
                name="confirmPassword"
                placeholder="Répétez le mot de passe"
                [toggleMask]="true"
                [feedback]="false"
                styleClass="custom-password"
                [fluid]="true"
                required
              ></p-password>
              <small *ngIf="confirmError" class="field-error">{{ confirmError }}</small>
            </div>

            <small *ngIf="globalError" class="field-error" style="margin-top:-0.5rem;">{{ globalError }}</small>

            <button type="submit" class="btn-primary" [disabled]="isLoading">
              <span>{{ isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>

          </form>

          <div class="signup-row">
            <span>Vous vous souvenez de votre mot de passe ?</span>
            <a routerLink="/logIn" class="signup-link">
              Se connecter
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

        </ng-container>

      </div>
    </div>

  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ── PAGE ── */
.login-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: #0f1419;
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* ── BACKGROUND ── */
.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}

.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(30,40,50,0.8), transparent);
  top: -200px; left: -150px;
  animation: floatOrb 9s ease-in-out infinite;
}

.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(42,54,66,0.6), transparent);
  bottom: -150px; right: -100px;
  animation: floatOrb 11s ease-in-out infinite reverse;
}

.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(16,185,129,0.06), transparent);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: floatOrb 13s ease-in-out infinite;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(25px, -25px); }
}

/* ── CARD ── */
.login-wrapper {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 960px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.07),
    0 40px 100px rgba(0,0,0,0.7);
  animation: cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(32px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── BRAND PANEL ── */
.brand-panel {
  background: linear-gradient(160deg, #1e2832 0%, #141c24 100%);
  padding: 52px 44px;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.brand-panel::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
  pointer-events: none;
}

.brand-panel::after {
  content: '';
  position: absolute;
  bottom: -100px; left: -80px;
  width: 320px; height: 320px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.04);
  pointer-events: none;
}

.brand-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 3rem;
  position: relative;
  z-index: 2;
}

.brand-logo { display: flex; align-items: center; gap: 12px; }

.brand-name {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
}

.headline-tag {
  display: inline-block;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 30px;
  margin-bottom: 1.25rem;
}

.headline-title {
  font-family: 'Syne', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: white;
  line-height: 1.08;
  letter-spacing: -1.5px;
  margin-bottom: 1.1rem;
}

.headline-accent {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
}

.headline-sub {
  color: rgba(255,255,255,0.45);
  font-size: 0.875rem;
  line-height: 1.75;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 1.1rem 1.4rem;
}

.stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 1; }
.stat-num { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: white; }
.stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.stat-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.08); flex-shrink: 0; }

/* ── FORM PANEL ── */
.form-panel {
  background: #f8fafc;
  padding: 52px 44px;
  display: flex;
  align-items: center;
}

.form-inner {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  animation: formIn 0.5s ease 0.15s both;
}

@keyframes formIn {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── STATUS ICONS ── */
.status-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  margin-bottom: 0.75rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.status-icon-wrapper.lock {
  background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%);
}

.status-icon-wrapper.error {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
}

.status-icon-wrapper.success {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
}

.form-title {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #1e2832;
  letter-spacing: -0.5px;
  line-height: 1.1;
}

.form-subtitle {
  color: #94a3b8;
  font-size: 0.88rem;
  margin-top: 6px;
  line-height: 1.6;
}

/* ── FIELDS ── */
.login-form { display: flex; flex-direction: column; gap: 1.15rem; }

.field-group { display: flex; flex-direction: column; gap: 7px; }

.field-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.field-label svg { color: #94a3b8; flex-shrink: 0; }

:host ::ng-deep .custom-password .p-password-input {
  width: 100%;
  padding: 13px 15px !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 12px !important;
  font-size: 14.5px !important;
  font-family: 'DM Sans', sans-serif !important;
  color: #1e2832 !important;
  background: white !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
}

:host ::ng-deep .custom-password .p-password-input:focus {
  border-color: #1e2832 !important;
  box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important;
  outline: none !important;
}

.field-error {
  font-size: 0.78rem;
  color: #ef4444;
  font-weight: 500;
  margin-top: 2px;
}

/* ── BTN PRINCIPAL ── */
.btn-primary {
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 20px rgba(30,40,50,0.35);
}

.btn-primary:hover:not([disabled]) {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(30,40,50,0.45);
}

.btn-primary:active { transform: translateY(0); }
.btn-primary[disabled] { opacity: 0.6; cursor: not-allowed; }
.btn-primary svg { transition: transform 0.2s; }
.btn-primary:hover:not([disabled]) svg { transform: translateX(4px); }

/* ── SIGNUP ROW ── */
.signup-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #94a3b8;
  font-weight: 500;
  flex-wrap: wrap;
  text-align: center;
}

.signup-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  color: #1e2832;
  text-decoration: none;
  transition: gap 0.2s ease;
}
.signup-link:hover { gap: 8px; }

/* ── RESPONSIVE ── */
@media (max-width: 860px) {
  .login-wrapper { grid-template-columns: 1fr; max-width: 460px; }
  .brand-panel { display: none; }
  .form-panel { padding: 44px 36px; }
}

@media (max-width: 460px) {
  .form-panel { padding: 36px 22px; }
  .form-title { font-size: 1.75rem; }
}
</style>
    `
})
export class resetPassword implements OnInit {

    resetData = {
        newPassword: '',
        confirmPassword: ''
    };

    token = '';
    email = '';

    isLoading = false;
    successMessage = '';
    globalError = '';
    passwordError = '';
    confirmError = '';
    tokenError = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // Lecture des query params : ?token=XXX&email=user@mail.com
        this.route.queryParams.subscribe(params => {
            this.token = params['token'] || '';
            this.email = params['email'] || '';

            if (!this.token || !this.email) {
                this.tokenError = true;
            }
        });
    }

    onSubmit(): void {
        // Reset erreurs
        this.passwordError = '';
        this.confirmError = '';
        this.globalError = '';

        // Validation mot de passe
        const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z/*@#!$%]{8,}$/;
        if (!this.resetData.newPassword) {
            this.passwordError = 'Le mot de passe est requis';
            return;
        }
        if (!pwdRegex.test(this.resetData.newPassword)) {
            this.passwordError = 'Min. 8 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial';
            return;
        }
        if (this.resetData.newPassword !== this.resetData.confirmPassword) {
            this.confirmError = 'Les mots de passe ne correspondent pas';
            return;
        }

        this.isLoading = true;

        const payload = {
            token: this.token,
            email: this.email,
            newPassword: this.resetData.newPassword
        };

        this.userService.resetPassword(payload).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                this.successMessage = res.message || 'Mot de passe réinitialisé avec succès !';
            },
            error: (err) => {
                this.isLoading = false;
                const msg: string = err.error?.message || '';
                if (msg.toLowerCase().includes('invalide') || msg.toLowerCase().includes('expiré')) {
                    this.tokenError = true;
                } else {
                    this.globalError = msg || 'Une erreur est survenue, veuillez réessayer.';
                }
            }
        });
    }
}