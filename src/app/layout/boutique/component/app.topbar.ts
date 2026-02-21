import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        StyleClassModule,
        MenuModule,
        ButtonModule,
        RippleModule,
        AppFloatingConfigurator
    ],
    template: `<!-- Topbar 2 — même style que Topbar 1 (Angular template + CSS) -->

<header class="topbar">

  <!-- Glow line top -->
  <div class="topbar-glow"></div>

  <!-- Logo -->
  <a class="logo" href="#">
    <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
        fill="white"/>
    </svg>
    <span class="logo-name">Shopmall</span>
  </a>

  <!-- Hamburger (mobile) -->
  <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple
     class="hamburger-btn lg:hidden!"
     pStyleClass="@next"
     enterFromClass="hidden"
     leaveToClass="hidden"
     [hideOnOutsideClick]="true">
    <i class="pi pi-bars"></i>
  </a>

  <!-- Nav + Actions -->
  <div class="nav-container hidden lg:flex">
        <!-- Profile CTA -->
    <div class="nav-actions">
      <div class="profile-wrapper" (clickOutside)="closeDropdown()">
        <button class="btn-profile" (click)="toggleDropdown()">
          <span class="profile-avatar">
            <i class="pi pi-user"></i>
          </span>
          <span class="profile-info">
            <span class="profile-name">{{ userName }}</span>
            <span class="profile-role">{{ userRole }}</span>
          </span>
          <svg class="profile-chevron"
              [class.rotated]="isDropdownOpen"
              xmlns="http://www.w3.org/2000/svg" width="12" height="12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <!-- Dropdown custom -->
        <div class="profile-dropdown" [class.open]="isDropdownOpen">
          <!-- Header -->
          <div class="dropdown-header">
            <div class="dropdown-avatar">
              <i class="pi pi-user"></i>
            </div>
            <div>
              <p class="dropdown-username">{{ userName }}</p>
              <p class="dropdown-role">{{ userRole }}</p>
            </div>
          </div>

          <div class="dropdown-divider"></div>

          <!-- Items -->
          <ul class="dropdown-list">
            <li class="dropdown-item" (click)="navigateToHome()">
              <i class="pi pi-home"></i>
              <span>Acceuil</span>
            </li>

            <li class="dropdown-item" (click)="navigateToProfile()">
              <i class="pi pi-user"></i>
              <span>Mon Profil</span>
            </li>
            
            <li class="dropdown-item" (click)="navigateToSettings()">
              <i class="pi pi-cog"></i>
              <span>Paramètres</span>
            </li>
            <li class="dropdown-item" (click)="navigateToPanier()">
              <i class="pi pi-shopping-cart"></i>
              <span>Panier</span>
            </li>
          </ul>

          <div class="dropdown-divider"></div>

          <ul class="dropdown-list">
            <li class="dropdown-item logout" (click)="logout()">
              <i class="pi pi-sign-out"></i>
              <span>Déconnexion</span>
            </li>
          </ul>
        </div>
      </div>

      <app-floating-configurator [float]="false" />
    </div>

  </div>

</header>


<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

/* ── TOPBAR ── */
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 68px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: rgba(20, 28, 36, 0.88);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.5);
  font-family: 'DM Sans', sans-serif;
  animation: topbarIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes topbarIn {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Glow line on top edge */
.topbar-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.12) 30%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.12) 70%,
    transparent 100%
  );
  pointer-events: none;
}

/* ── LOGO ── */
.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-svg {
  width: 34px;
  height: 34px;
}

.logo-name {
  font-family: 'Syne', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
}

/* ── NAV CONTAINER ── */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 2rem;
}

/* ── NAV LINKS ── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 16px;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
  letter-spacing: 0.2px;
  user-select: none;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.07);
}

/* ── PROMO BADGE ── */
.nav-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 20px;
}

/* ── ACTIONS ── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

/* ── PROFILE BUTTON ── */
.btn-profile {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 6px 14px 6px 6px !important;
  border-radius: 30px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  color: rgba(255, 255, 255, 0.85) !important;
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: all 0.2s ease !important;
  box-shadow: none !important;
}

.btn-profile:hover {
  background: rgba(255, 255, 255, 0.09) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

/* Avatar circle */
.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%);
  color: #1e2832;
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* Text block */
.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  line-height: 1;
}

.profile-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.1px;
}

.profile-role {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.2px;
}

/* Chevron */
.profile-chevron {
  color: rgba(255, 255, 255, 0.4);
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.btn-profile:hover .profile-chevron {
  color: rgba(255, 255, 255, 0.7);
  transform: translateY(1px);
}

/* ── HAMBURGER (mobile) ── */
.hamburger-btn {
  display: none;
  width: 38px !important;
  height: 38px !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 10px !important;
  background: transparent !important;
  color: rgba(255, 255, 255, 0.75) !important;
  font-size: 1.1rem !important;
  cursor: pointer;
  transition: background 0.2s !important;
}

.hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .nav-links { display: none; }
  .hamburger-btn { display: flex !important; }

  .nav-container {
    position: fixed;
    top: 68px; left: 0; right: 0;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 2rem;
    background: #141c24;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    gap: 1.5rem;
  }

  .nav-links {
    display: flex !important;
    position: static;
    transform: none;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
  }

  .nav-link {
    padding: 10px 14px;
    font-size: 1rem;
    border-radius: 12px;
  }

  .nav-actions {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding-top: 1rem;
  }
}

@media (max-width: 480px) {
  .topbar { padding: 0 1.25rem; }
  .logo-name { font-size: 1.1rem; }
  .profile-info { display: none; }
}

.profile-wrapper {
  position: relative;
}

.profile-chevron {
  transition: transform 0.25s ease;
  &.rotated {
    transform: rotate(180deg);
  }
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;

  // Caché par défaut
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;

  .dropdown-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #e0e7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4f46e5;
    font-size: 16px;
  }

  .dropdown-username {
    margin: 0;
    font-weight: 600;
    font-size: 14px;
    color: #111827;
  }

  .dropdown-role {
    margin: 0;
    font-size: 12px;
    color: #6b7280;
  }
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s ease;

  i {
    font-size: 15px;
    color: #6b7280;
  }

  &:hover {
    background: #f3f4f6;
    color: #111827;

    i { color: #4f46e5; }
  }

  &.logout {
    color: #ef4444;
    i { color: #ef4444; }

    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }
}
</style>`
})
export class AppTopbar {

     userName: string = 'Utilisateur';
    userRole: string = 'Manager';

    isDropdownOpen = false;
    constructor(public router: Router) {}

   toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeDropdown() {
  this.isDropdownOpen = false;
}

// Ferme si clic en dehors
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.profile-wrapper')) {
    this.isDropdownOpen = false;
  }
}

navigateToPanier() {
  console.log("clicque panier");
  
  this.closeDropdown();
  this.router.navigate(['/info/client/panier']);
}

navigateToProfile() {
  console.log("profile entrer");
  
  this.closeDropdown();
  //this.router.navigate(['/info/client/profil']);
}

navigateToSettings() {
  console.log("clique sutr parametre");
  
  this.closeDropdown();
  //this.router.navigate(['/info/client/parametres']);
}

navigateToHome()
{
  this.router.navigate(['/membre/client'])
}

logout() {
  console.log("clique log out");
  
  this.closeDropdown();
  //this.router.navigate(['/']);
}

}
