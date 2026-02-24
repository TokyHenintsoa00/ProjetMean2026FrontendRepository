// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { MenuItem } from 'primeng/api';
// import { AppMenuitem } from './app.menuitem';

// @Component({
//     selector: 'app-menu',
//     standalone: true,
//     imports: [CommonModule, AppMenuitem, RouterModule],
//     template: `<ul class="layout-menu">
//         <ng-container *ngFor="let item of model; let i = index">
//             <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
//             <li *ngIf="item.separator" class="menu-separator"></li>
//         </ng-container>
//     </ul> `
// })
// export class AppMenu {
//     model: MenuItem[] = [];

//     ngOnInit() {
//         this.model = [
//             {
//                 label: 'Acceuil',
//                 items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/home'] }]
//             },
//             {
//                 label:'Gestion boutique',
//                 items:[
//                     {label:'Ajouter une boutique', icon:'pi pi-plus',routerLink:['/admin/home/creationBoutique']},
//                     {label:'Liste des boutiques', icon:'pi pi-list',routerLink:['/admin/home/listeBoutique']},
//                     {label:'Validation de nouveaux boutique', icon:'pi pi-verified',routerLink:['/admin/home/validationBoutique']},
//                 ],
                
//             }
//             // {
//             //     label: 'UI Components',
//             //     items: [
//             //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
//             //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
//             //         { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
//             //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
//             //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
//             //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
//             //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
//             //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
//             //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
//             //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
//             //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
//             //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
//             //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
//             //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
//             //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
//             //     ]
//             // },
//             // {
//             //     label: 'Pages',
//             //     icon: 'pi pi-fw pi-briefcase',
//             //     routerLink: ['/pages'],
//             //     items: [
//             //         {
//             //             label: 'Landing',
//             //             icon: 'pi pi-fw pi-globe',
//             //             routerLink: ['/landing']
//             //         },
//             //         {
//             //             label: 'Auth',
//             //             icon: 'pi pi-fw pi-user',
//             //             items: [
//             //                 {
//             //                     label: 'Login',
//             //                     icon: 'pi pi-fw pi-sign-in',
//             //                     routerLink: ['/auth/login']
//             //                 },
//             //                 {
//             //                     label: 'Error',
//             //                     icon: 'pi pi-fw pi-times-circle',
//             //                     routerLink: ['/auth/error']
//             //                 },
//             //                 {
//             //                     label: 'Access Denied',
//             //                     icon: 'pi pi-fw pi-lock',
//             //                     routerLink: ['/auth/access']
//             //                 }
//             //             ]
//             //         },
//             //         {
//             //             label: 'Crud',
//             //             icon: 'pi pi-fw pi-pencil',
//             //             routerLink: ['/pages/crud']
//             //         },
//             //         {
//             //             label: 'Not Found',
//             //             icon: 'pi pi-fw pi-exclamation-circle',
//             //             routerLink: ['/pages/notfound']
//             //         },
//             //         {
//             //             label: 'Empty',
//             //             icon: 'pi pi-fw pi-circle-off',
//             //             routerLink: ['/pages/empty']
//             //         }
//             //     ]
//             // },
//             // {
//             //     label: 'Hierarchy',
//             //     items: [
//             //         {
//             //             label: 'Submenu 1',
//             //             icon: 'pi pi-fw pi-bookmark',
//             //             items: [
//             //                 {
//             //                     label: 'Submenu 1.1',
//             //                     icon: 'pi pi-fw pi-bookmark',
//             //                     items: [
//             //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
//             //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
//             //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
//             //                     ]
//             //                 },
//             //                 {
//             //                     label: 'Submenu 1.2',
//             //                     icon: 'pi pi-fw pi-bookmark',
//             //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
//             //                 }
//             //             ]
//             //         },
//             //         {
//             //             label: 'Submenu 2',
//             //             icon: 'pi pi-fw pi-bookmark',
//             //             items: [
//             //                 {
//             //                     label: 'Submenu 2.1',
//             //                     icon: 'pi pi-fw pi-bookmark',
//             //                     items: [
//             //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
//             //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
//             //                     ]
//             //                 },
//             //                 {
//             //                     label: 'Submenu 2.2',
//             //                     icon: 'pi pi-fw pi-bookmark',
//             //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
//             //                 }
//             //             ]
//             //         }
//             //     ]
//             // },
//             // {
//             //     label: 'Get Started',
//             //     items: [
//             //         {
//             //             label: 'Documentation',
//             //             icon: 'pi pi-fw pi-book',
//             //             routerLink: ['/documentation']
//             //         },
//             //         {
//             //             label: 'View Source',
//             //             icon: 'pi pi-fw pi-github',
//             //             url: 'https://github.com/primefaces/sakai-ng',
//             //             target: '_blank'
//             //         }
//             //     ]
//             // }
//         ];
//     }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `

<nav class="sidebar">

  <!-- Glow line left edge -->
  <div class="sidebar-glow"></div>

  <!-- Header -->
  <div class="sidebar-header">
    <span class="sidebar-title">Navigation</span>
    <span class="sidebar-subtitle">Panneau admin</span>
  </div>

  <!-- Menu -->
  <div class="sidebar-body">
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">

        <!-- Group label -->
        <li *ngIf="!item.separator && item.label" class="menu-group-label">
          <span class="group-label-text">{{ item.label }}</span>
          <span class="group-label-line"></span>
        </li>

        <!-- Items -->
        <ng-container *ngIf="item.items">
          <li *ngFor="let child of item.items"
              app-menuitem
              [item]="child"
              [index]="i"
              [root]="true"
              class="menu-item-wrapper">
          </li>
        </ng-container>

        <!-- Separator -->
        <li *ngIf="item.separator" class="menu-separator"></li>

      </ng-container>
    </ul>
  </div>

  <!-- Footer -->
  <div class="sidebar-footer">
    <div class="sidebar-footer-badge">
      <span class="footer-dot"></span>
      Système en ligne
    </div>
    <span class="sidebar-version">v1.0.0</span>
  </div>

</nav>


<style>
/* ── RESET FOND BLANC SAKAI ── */
::ng-deep .layout-sidebar {
  background: #0f172a !important;
  border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
  box-shadow: none !important;
}

::ng-deep .layout-menu-container {
  background: transparent !important;
}

/* ── SIDEBAR ── */
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
  overflow: hidden;
}

/* ── HEADER ── */
.sidebar-header {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 1.25rem 1.5rem 0.875rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #f59e0b;
}

.sidebar-subtitle {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
}

/* ── BODY ── */
.sidebar-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}

.sidebar-body::-webkit-scrollbar { width: 4px; }
.sidebar-body::-webkit-scrollbar-track { background: transparent; }
.sidebar-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

/* ── LAYOUT MENU (reset) ── */
.layout-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* ── GROUP LABEL ── */
.menu-group-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 0.5rem 0.4rem;
  margin-top: 0.25rem;
}

.menu-group-label:first-child {
  margin-top: 0;
  padding-top: 0.25rem;
}

.group-label-text {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  flex-shrink: 0;
}

.group-label-line {
  flex: 1;
  height: 1px;
  background: rgba(245, 158, 11, 0.15);
}

/* ── SEPARATOR ── */
.menu-separator {
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 0.5rem 0.5rem;
}

/* ── ITEM WRAPPER ── */
.menu-item-wrapper { display: block; }

/* ── Override PrimeNG app-menuitem link styles ── */
.sidebar ::ng-deep .layout-menuitem-root-text { display: none; }

::ng-deep app-menu .layout-menu a,
::ng-deep app-menu .layout-menu button {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 9px 12px !important;
  border-radius: 4px !important;
  border: 1.5px solid transparent !important;
  background: transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.15s !important;
  text-decoration: none !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

::ng-deep app-menu .layout-menu a:hover,
::ng-deep app-menu .layout-menu button:hover {
  color: white !important;
  border-color: rgba(255, 255, 255, 0.35) !important;
}

::ng-deep app-menu .layout-menu a.active-route,
::ng-deep app-menu .layout-menu a.active-menuitem-routerlink,
::ng-deep app-menu .layout-menu .active-menuitem > a {
  color: #f59e0b !important;
  border-color: #f59e0b !important;
  font-weight: 600 !important;
}

::ng-deep app-menu .layout-menu .pi {
  font-size: 0.9rem !important;
  width: 18px !important;
  text-align: center !important;
  color: inherit !important;
}

/* Submenu indent */
::ng-deep app-menu .layout-menu ul {
  list-style: none !important;
  margin: 2px 0 0 0 !important;
  padding: 0 0 0 28px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}

::ng-deep app-menu .layout-menu ul a {
  font-size: 0.82rem !important;
  padding: 7px 10px !important;
}

/* ── FOOTER ── */
.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.sidebar-footer-badge {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.35);
}

.footer-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
  animation: pulse 2.5s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
}

.sidebar-version {
  font-size: 0.68rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.2);
}
</style>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/home'] }
                ]
            },
            {
                label: 'Gestion boutique',
                items: [
                    { label: 'Ajouter une boutique',        icon: 'pi pi-plus',     routerLink: ['/admin/home/creationBoutique'] },
                    { label: 'Liste des boutiques',          icon: 'pi pi-list',     routerLink: ['/admin/home/listeBoutique'] },
                    { label: 'Validation de nouveaux',       icon: 'pi pi-verified', routerLink: ['/admin/home/validationBoutique'] },
                ]
            },
            {
                label: 'Commandes',
                items: [
                    { label: 'Toutes les commandes', icon: 'pi pi-shopping-bag', routerLink: ['/admin/home/commandes'] }
                ]
            }
        ];
    }
}