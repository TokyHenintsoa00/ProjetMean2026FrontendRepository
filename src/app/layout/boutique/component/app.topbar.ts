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

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, 
        CommonModule, 
        StyleClassModule, 
        
         CommonModule,
        RouterModule, 
        MenuModule, 
        ButtonModule, 
        RippleModule
    ],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/boutique/home"
               style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;">
                <i class="pi pi-shopping-bag" style="font-size:1.4rem;color:var(--primary-color);"></i>
                <span style="font-size:1.1rem;font-weight:800;color:var(--primary-color);">Centre<strong>Mall</strong></span>
            </a>
        </div>

        <div class="layout-topbar-actions">
           

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="flex items-center gap-4">
                <button 
                    pButton
                    type="button" 
                    class="p-button-text flex items-center gap-2"
                    (click)="profileMenu.toggle($event)">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                        <i class="pi pi-user text-xl"></i>
                    </div>
                    <div class="flex flex-col items-start">
                        <span class="text-surface-900 dark:text-surface-0 font-semibold text-sm">{{userName}}</span>
                        <span class="text-surface-500 dark:text-surface-400 text-xs">{{userRole}}</span>
                    </div>
                    <i class="pi pi-angle-down text-surface-500 dark:text-surface-400"></i>
                </button>
                <p-menu #profileMenu [model]="getProfileMenuItems()" [popup]="true"></p-menu>
            </div>
        </div>
    </div>`
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
