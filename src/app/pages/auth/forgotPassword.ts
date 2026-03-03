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
import { CommonModule } from '@angular/common';

@Component({
    selector:'app-forgotPassword',
    standalone:true,
    imports: [ButtonModule, CheckboxModule,CommonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template:`
    
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
          <h1 class="headline-title" *ngIf="!emailSent">Mot de<br/>passe<br/><span class="headline-accent">oublié ?</span></h1>
          <h1 class="headline-title" *ngIf="emailSent">Email<br/>envoyé<br/><span class="headline-accent">avec succès</span></h1>
          <p class="headline-sub" *ngIf="!emailSent">Pas de panique. Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
          <p class="headline-sub" *ngIf="emailSent">Vérifiez votre boîte de réception et suivez les instructions pour créer un nouveau mot de passe.</p>
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

        <!-- ── ÉTAT : FORMULAIRE ── -->
        <ng-container *ngIf="!emailSent">

          <div class="form-header">
            <div class="lock-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 class="form-title">Mot de passe oublié</h2>
            <p class="form-subtitle">Entrez votre email pour recevoir un lien de réinitialisation</p>
          </div>

          <form (ngSubmit)="forgotPassword()" #myForm="ngForm" class="login-form">
            <div class="field-group">
              <label for="email1" class="field-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Adresse email
              </label>
              <input
                pInputText
                id="email1"
                type="email"
                placeholder="votre@email.com"
                class="custom-input"
                [(ngModel)]="forgotpwd.email"
                [ngModelOptions]="{standalone: true}"
                name="email"
              />
              <small *ngIf="emailError" class="field-error">{{ emailError }}</small>
            </div>

            <button type="submit" class="btn-primary" [disabled]="isLoading">
              <span>{{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien' }}</span>
              <svg *ngIf="!isLoading" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              <svg *ngIf="isLoading" class="spin" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
            </button>
          </form>

          <div class="divider">
            <span class="divider-line"></span>
            <span class="divider-text">ou continuer avec</span>
            <span class="divider-line"></span>
          </div>

          <div class="social-grid">
            <button type="button" class="social-btn">
              <svg viewBox="0 0 24 24" width="17" height="17">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" class="social-btn">
              <svg viewBox="0 0 24 24" width="17" height="17">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <div class="signup-row">
            <span>Vous vous souvenez de votre mot de passe ?</span>
            <a routerLink="/logIn" class="signup-link">
              Se connecter
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

        </ng-container>

        <!-- ── ÉTAT : SUCCÈS ── -->
        <ng-container *ngIf="emailSent">
          <div class="success-state">

            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <div>
              <h2 class="form-title">Email envoyé !</h2>
              <p class="form-subtitle" style="margin-top:6px;">
                Un lien a été envoyé à<br/>
                <strong class="email-highlight">{{ forgotpwd.email }}</strong>
              </p>
            </div>

            <!-- Étapes -->
            <div class="steps-list">
              <div class="step-item">
                <div class="step-num">1</div>
                <span>Ouvrez votre boîte de réception</span>
              </div>
              <div class="step-item">
                <div class="step-num">2</div>
                <span>Cliquez sur le lien dans l'email ShopMall</span>
              </div>
              <div class="step-item">
                <div class="step-num">3</div>
                <span>Créez votre nouveau mot de passe</span>
              </div>
            </div>

            <!-- Badge expiration -->
            <div class="expiry-notice">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Ce lien est valide pendant <strong>1 heure</strong></span>
            </div>

            <!-- Renvoyer -->
            <button type="button" class="btn-primary" (click)="resendEmail()">
              <span>Renvoyer l'email</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.5"></path></svg>
            </button>

            <div class="signup-row">
              <span>Retour à la page de connexion ?</span>
              <a routerLink="/logIn" class="signup-link">
                Se connecter
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>

          </div>
        </ng-container>

      </div>
    </div>

  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
  min-height: 100vh; width: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem; background: #0f1419;
  position: relative; overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

.bg-orb { position: absolute; border-radius: 50%; filter: blur(90px); }

.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(30,40,50,0.8), transparent); top: -200px; left: -150px; animation: floatOrb 9s ease-in-out infinite; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(42,54,66,0.6), transparent); bottom: -150px; right: -100px; animation: floatOrb 11s ease-in-out infinite reverse; }
.orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(16,185,129,0.06), transparent); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: floatOrb 13s ease-in-out infinite; }

.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes floatOrb { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(25px,-25px); } }

.login-wrapper {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr;
  width: 100%; max-width: 960px; border-radius: 28px; overflow: hidden;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.7);
  animation: cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes cardIn { from { opacity: 0; transform: translateY(32px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

.brand-panel {
  background: linear-gradient(160deg, #1e2832 0%, #141c24 100%);
  padding: 52px 44px; position: relative; overflow: hidden;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.brand-panel::before { content: ''; position: absolute; top: -80px; right: -80px; width: 260px; height: 260px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.05); pointer-events: none; }
.brand-panel::after { content: ''; position: absolute; bottom: -100px; left: -80px; width: 320px; height: 320px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.04); pointer-events: none; }

.brand-inner { display: flex; flex-direction: column; justify-content: space-between; height: 100%; gap: 3rem; position: relative; z-index: 2; }
.brand-logo { display: flex; align-items: center; gap: 12px; }
.brand-name { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: white; letter-spacing: -0.5px; }

.headline-tag { display: inline-block; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 0.7rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 30px; margin-bottom: 1.25rem; }
.headline-title { font-family: 'Syne', sans-serif; font-size: 2.8rem; font-weight: 800; color: white; line-height: 1.08; letter-spacing: -1.5px; margin-bottom: 1.1rem; }
.headline-accent { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.4); }
.headline-sub { color: rgba(255,255,255,0.45); font-size: 0.875rem; line-height: 1.75; }

.brand-stats { display: flex; align-items: center; gap: 1.25rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.1rem 1.4rem; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 1; }
.stat-num { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: white; }
.stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
.stat-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.08); flex-shrink: 0; }

.form-panel { background: #f8fafc; padding: 52px 44px; display: flex; align-items: center; }

.form-inner {
  width: 100%; max-width: 360px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 1.4rem;
  animation: formIn 0.5s ease 0.15s both;
}

@keyframes formIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }

.lock-icon-wrapper { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%); border-radius: 14px; margin-bottom: 0.75rem; box-shadow: 0 6px 16px rgba(30,40,50,0.25); }

.form-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: #1e2832; letter-spacing: -0.5px; line-height: 1.1; }
.form-subtitle { color: #94a3b8; font-size: 0.88rem; margin-top: 6px; line-height: 1.6; }

.login-form { display: flex; flex-direction: column; gap: 1.15rem; }
.field-group { display: flex; flex-direction: column; gap: 7px; }
.field-label { display: flex; align-items: center; gap: 7px; font-size: 0.75rem; font-weight: 700; color: #374151; letter-spacing: 0.5px; text-transform: uppercase; }
.field-label svg { color: #94a3b8; flex-shrink: 0; }

.custom-input {
  width: 100%; padding: 13px 15px !important; border: 1.5px solid #e2e8f0 !important;
  border-radius: 12px !important; font-size: 14.5px !important; font-family: 'DM Sans', sans-serif !important;
  color: #1e2832 !important; background: white !important;
  transition: border-color 0.2s, box-shadow 0.2s !important; outline: none !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
}
.custom-input:focus { border-color: #1e2832 !important; box-shadow: 0 0 0 3px rgba(30,40,50,0.08) !important; }
.custom-input::placeholder { color: #c8d4e0 !important; }
.field-error { font-size: 0.78rem; color: #ef4444; font-weight: 500; margin-top: 2px; }

.btn-primary {
  width: 100%; padding: 14px 24px;
  background: linear-gradient(135deg, #1e2832 0%, #2a3642 100%);
  color: white; border: none; border-radius: 12px;
  font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 700;
  letter-spacing: 0.5px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 6px 20px rgba(30,40,50,0.35);
}
.btn-primary:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(30,40,50,0.45); }
.btn-primary:active { transform: translateY(0); }
.btn-primary[disabled] { opacity: 0.6; cursor: not-allowed; }
.btn-primary svg { transition: transform 0.2s; }
.btn-primary:hover:not([disabled]) svg:not(.spin) { transform: translateX(4px); }

@keyframes spin { to { transform: rotate(360deg); } }
.spin { animation: spin 0.8s linear infinite; }

.divider { display: flex; align-items: center; gap: 12px; }
.divider-line { flex: 1; height: 1px; background: #e2e8f0; }
.divider-text { font-size: 0.75rem; color: #94a3b8; font-weight: 500; white-space: nowrap; letter-spacing: 0.3px; }

.social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.social-btn { display: flex; align-items: center; justify-content: center; gap: 9px; padding: 11px; border: 1.5px solid #e2e8f0; border-radius: 12px; background: white; color: #374151; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.social-btn:hover { border-color: #1e2832; color: #1e2832; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,40,50,0.1); }

/* ── SUCCESS STATE ── */
.success-state { display: flex; flex-direction: column; gap: 1.3rem; animation: formIn 0.5s ease both; }

.success-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px;
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(22,163,74,0.3);
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.email-highlight { display: inline-block; color: #1e2832; font-weight: 700; font-size: 0.9rem; margin-top: 4px; }

.steps-list { display: flex; flex-direction: column; gap: 10px; background: white; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 16px 18px; }
.step-item { display: flex; align-items: center; gap: 12px; font-size: 0.85rem; color: #374151; font-weight: 500; }
.step-num { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: #1e2832; color: white; font-size: 0.7rem; font-weight: 800; border-radius: 50%; flex-shrink: 0; }

.expiry-notice { display: inline-flex; align-items: center; gap: 7px; background: #fffbeb; border: 1px solid rgba(234,179,8,0.3); border-radius: 8px; padding: 9px 14px; font-size: 0.8rem; color: #92400e; font-weight: 500; }
.expiry-notice strong { font-weight: 700; }

.signup-row { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.82rem; color: #94a3b8; font-weight: 500; flex-wrap: wrap; text-align: center; }
.signup-link { display: inline-flex; align-items: center; gap: 5px; font-weight: 700; color: #1e2832; text-decoration: none; transition: gap 0.2s ease; }
.signup-link:hover { gap: 8px; }

@media (max-width: 860px) { .login-wrapper { grid-template-columns: 1fr; max-width: 460px; } .brand-panel { display: none; } .form-panel { padding: 44px 36px; } }
@media (max-width: 460px) { .form-panel { padding: 36px 22px; } .form-title { font-size: 1.75rem; } .social-grid { grid-template-columns: 1fr; } }
</style>

    `
})

export class forgotPassword{

    forgotpwd = {email:''};
    emailError:string | null = null;
    constructor(private userservice:UserService,private router:Router){};

  

    emailSent = false;
isLoading = false;

forgotPassword() {
  this.isLoading = true;
  this.userservice.forgotPassword(this.forgotpwd).subscribe({
    next: () => {
      this.isLoading = false;
      this.emailSent = true;  // ← bascule vers l'état succès
    },
    error: () => {
      this.isLoading = false;
      this.emailError = "Email introuvable.";
    }
  });
}

resendEmail() {
  this.emailSent = false;  // ← retour au formulaire pour renvoyer
}
}