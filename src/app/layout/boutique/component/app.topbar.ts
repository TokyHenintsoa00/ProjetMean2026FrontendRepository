import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '@/pages/service/auth.service';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, 
        CommonModule, 
        StyleClassModule, 
        AppFloatingConfigurator,
         
        RouterModule, 
        MenuModule, 
        ButtonModule, 
        RippleModule
    ],
    template: ` 
    

    <header class="topbar">

  <!-- Sidebar toggle + Logo -->
  <div class="topbar-left">
    <button class="sidebar-toggle-btn" (click)="layoutService.onMenuToggle()" title="Toggle menu">
      <i class="pi pi-bars"></i>
    </button>

    <a class="logo" routerLink="/admin/home">
      <i class="pi pi-shopping-bag logo-icon"></i>
      <span class="logo-name">m1p13mean-Toky-Zo <span style="font-size:0.7rem;font-weight:400;color:rgba(255,255,255,0.4);margin-left:4px;">Admin</span></span>
    </a>
  </div>

  <!-- Actions droite -->
  <div class="topbar-right">

    <!-- Profile button -->
    <button pButton pRipple
            class="btn-profile"
            (click)="profileMenu.toggle($event)">
      <span class="profile-avatar">
        <i class="pi pi-user"></i>
      </span>
      <span class="profile-info">
        <span class="profile-name">{{ userName }}</span>
        <span class="profile-role">{{ userRole }}</span>
      </span>
      <svg class="profile-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <p-menu #profileMenu [model]="getProfileMenuItems()" [popup]="true"></p-menu>

    <!-- Floating configurator -->
    <app-floating-configurator [float]="false" />

  </div>

</header>


<style>
/* ── TOPBAR ── */
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 64px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: #0f172a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* ── LEFT: toggle + logo ── */
.topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

/* Sidebar toggle button */
.sidebar-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1.5px solid transparent;
  background: none;
  color: rgba(255, 255, 255, 0.65);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.sidebar-toggle-btn:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}

/* ── LOGO ── */
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon { color: #f59e0b; font-size: 1.5rem; }

.logo-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  letter-spacing: -0.01em;
}

.logo-name strong { color: #f59e0b; }

/* ── RIGHT: actions ── */
.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── PROFILE BUTTON ── */
.btn-profile {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.6rem !important;
  padding: 0.3rem 0.6rem !important;
  border-radius: 4px !important;
  border: 1.5px solid transparent !important;
  background: none !important;
  color: white !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  cursor: pointer;
  transition: border-color 0.15s !important;
  box-shadow: none !important;
}

.btn-profile:hover {
  border-color: rgba(255, 255, 255, 0.5) !important;
}

/* Avatar circle */
.profile-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #1e3a5f;
  border: 2px solid #f59e0b;
  color: #f59e0b;
  font-size: 0.9rem;
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
  color: white;
  letter-spacing: 0.1px;
}

.profile-role {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2px;
}

/* Chevron */
.profile-chevron {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.btn-profile:hover .profile-chevron {
  transform: translateY(1px);
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .topbar { padding: 0 1rem; height: 56px; }
  .logo-name { display: none; }
  .profile-info { display: none; }
}
</style>


    `
})
export class AppTopbar {



    items!: MenuItem[];
    userName: string = 'Profile';
    userRole: string = 'Manager boutique';
    constructor(public layoutService: LayoutService, private router: Router, private authService: AuthService) {}

    getProfileMenuItems(): MenuItem[] {
        return [
            {
                label: 'Mon Profil',
                icon: 'pi pi-user',
                command: () => this.navigateToProfile()
            },
            {
                label: 'Paramètres',
                icon: 'pi pi-cog',
                command: () => this.navigateToSettings()
            },
            {
                separator: true
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    navigateToProfile() {
        console.log('Navigation vers le profil');
        // this.router.navigate(['/profile']);
    }

    navigateToSettings() {
        console.log('Navigation vers les paramètres');
        // this.router.navigate(['/settings']);
    }

    logout() {
        this.authService.logout();
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
