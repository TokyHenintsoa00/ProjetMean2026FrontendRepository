import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    selector: 'app-commandes-boutique',
    standalone: true,
    imports: [CommonModule, FormsModule, TagModule, ButtonModule, SelectModule, ToastModule],
    providers: [MessageService],
    template: `
<p-toast></p-toast>

<!-- ===== HEADER ===== -->
<div class="cb-header">
    <div class="cb-header-left">
        <div class="cb-header-icon-wrap">
            <i class="pi pi-shopping-bag"></i>
        </div>
        <div>
            <h1 class="cb-title">Commandes reçues</h1>
            <p class="cb-subtitle">{{ commandes.length }} commande(s) au total</p>
        </div>
    </div>
    <div class="cb-filter-chips">
        <div class="cb-chip" [class.cb-chip-active]="filterStatut === null" (click)="setFilter(null)">
            Toutes <span class="cb-chip-count">{{ commandes.length }}</span>
        </div>
        @for (opt of statutOptions; track opt.value) {
            <div class="cb-chip" [class.cb-chip-active]="filterStatut === opt.value" (click)="setFilter(opt.value)">
                {{ opt.label }} <span class="cb-chip-count">{{ countByStatut(opt.value) }}</span>
            </div>
        }
    </div>
</div>

<!-- ===== LOADING ===== -->
@if (loading) {
    <div class="cb-loading">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Chargement des commandes...</span>
    </div>
}

<!-- ===== EMPTY ===== -->
@if (!loading && filteredCommandes.length === 0) {
    <div class="cb-empty">
        <div class="cb-empty-icon-wrap"><i class="pi pi-inbox"></i></div>
        <h2>Aucune commande</h2>
        <p>{{ filterStatut ? 'Aucune commande avec ce statut.' : 'Vous n\'avez pas encore reçu de commandes.' }}</p>
    </div>
}

<!-- ===== TABLE ===== -->
@if (!loading && filteredCommandes.length > 0) {
    <div class="cb-table-wrap">
        <table class="cb-table">
            <thead>
                <tr>
                    <th>N° Commande</th>
                    <th>Client</th>
                    <th>Articles</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @for (cmd of filteredCommandes; track cmd._id) {
                    <tr class="cb-row" (click)="goToDetail(cmd)">
                        <td><span class="cb-order-num">{{ cmd.numero_commande }}</span></td>
                        <td>
                            <div class="cb-client">
                                <div class="cb-avatar">{{ getInitials(cmd.client) }}</div>
                                <span>{{ cmd.client?.prenom_client }} {{ cmd.client?.nom_client }}</span>
                            </div>
                        </td>
                        <td><span class="cb-articles">{{ cmd.lignes?.length || 0 }} art.</span></td>
                        <td><span class="cb-total">{{ cmd.total | number:'1.2-2' }} DT</span></td>
                        <td><p-tag [value]="getStatutLabel(cmd.statut)" [severity]="getStatutSeverity(cmd.statut)"></p-tag></td>
                        <td>
                            <span class="cb-date">{{ cmd.created_at | date:'dd/MM/yyyy' }}</span>
                            <span class="cb-time">{{ cmd.created_at | date:'HH:mm' }}</span>
                        </td>
                        <td (click)="$event.stopPropagation()">
                            <div class="cb-actions">
                                <button class="cb-detail-btn" (click)="goToDetail(cmd)" title="Voir la facture">
                                    <i class="pi pi-file-pdf"></i>
                                </button>
                                @if (getAvailableStatuts(cmd.statut).length > 0) {
                                    <p-select [options]="getAvailableStatuts(cmd.statut)"
                                              [(ngModel)]="cmd._newStatut"
                                              (onChange)="changeStatut(cmd)"
                                              placeholder="Changer"
                                              optionLabel="label" optionValue="value"
                                              [style]="{'width':'9rem'}"
                                              (click)="$event.stopPropagation()">
                                    </p-select>
                                }
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
}

<style>
.cb-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
.cb-header-left { display:flex; align-items:center; gap:0.75rem; }
.cb-header-icon-wrap { width:48px; height:48px; border-radius:12px; background:#fef3c7; display:flex; align-items:center; justify-content:center; font-size:1.4rem; color:#f59e0b; flex-shrink:0; }
.cb-title { margin:0; font-size:1.4rem; font-weight:800; color:#0f172a; }
.cb-subtitle { margin:0; font-size:0.85rem; color:#64748b; }
.cb-filter-chips { display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center; }
.cb-chip { display:flex; align-items:center; gap:0.4rem; padding:0.35rem 0.8rem; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:0.78rem; font-weight:500; color:#475569; cursor:pointer; transition:all 0.15s; }
.cb-chip:hover { border-color:#f59e0b; color:#92400e; }
.cb-chip-active { border-color:#f59e0b; background:#fffbeb; color:#92400e; font-weight:700; }
.cb-chip-count { background:#e2e8f0; color:#64748b; font-size:0.65rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:10px; min-width:18px; text-align:center; }
.cb-chip-active .cb-chip-count { background:#f59e0b; color:#1a1a1a; }
.cb-loading { display:flex; align-items:center; justify-content:center; gap:0.75rem; padding:4rem; color:#64748b; }
.cb-loading .pi { font-size:1.5rem; color:#f59e0b; }
.cb-empty { text-align:center; padding:3rem 2rem; background:white; border-radius:14px; border:1px solid #e2e8f0; max-width:440px; margin:0 auto; }
.cb-empty-icon-wrap { width:64px; height:64px; border-radius:50%; background:#fef3c7; margin:0 auto 1rem; display:flex; align-items:center; justify-content:center; font-size:1.6rem; color:#f59e0b; }
.cb-empty h2 { margin:0 0 0.4rem; color:#0f172a; font-size:1.1rem; }
.cb-empty p { margin:0; color:#64748b; font-size:0.875rem; }
.cb-table-wrap { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); overflow:hidden; }
.cb-table { width:100%; border-collapse:collapse; }
.cb-table thead tr { background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.cb-table thead th { padding:0.75rem 1rem; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; text-align:left; white-space:nowrap; }
.cb-row { border-bottom:1px solid #f1f5f9; cursor:pointer; transition:background 0.15s; }
.cb-row:hover { background:#fffbeb; }
.cb-row:last-child { border-bottom:none; }
.cb-row td { padding:0.85rem 1rem; vertical-align:middle; font-size:0.875rem; }
.cb-order-num { font-size:0.85rem; font-weight:700; color:#0369a1; font-family:monospace; }
.cb-client { display:flex; align-items:center; gap:0.55rem; }
.cb-avatar { width:30px; height:30px; border-radius:50%; background:#e0e7ff; color:#4f46e5; font-size:0.72rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.cb-articles { color:#64748b; }
.cb-total { font-size:0.95rem; font-weight:700; color:#b45309; }
.cb-date { display:block; font-size:0.82rem; color:#1e293b; font-weight:500; }
.cb-time { display:block; font-size:0.72rem; color:#94a3b8; }
.cb-actions { display:flex; align-items:center; gap:0.5rem; }
.cb-detail-btn { background:none; border:1.5px solid #e2e8f0; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#64748b; font-size:0.95rem; transition:all 0.15s; flex-shrink:0; }
.cb-detail-btn:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }
</style>
    `
})
export class CommandesBoutique implements OnInit {
    commandes: any[] = [];
    filteredCommandes: any[] = [];
    filterStatut: string | null = null;
    loading = true;

    statutOptions = [
        { label: 'En attente', value: 'en_attente' },
        { label: 'Confirmée', value: 'confirmee' },
        { label: 'En préparation', value: 'en_preparation' },
        { label: 'Prête', value: 'prete' },
        { label: 'Livrée', value: 'livree' },
        { label: 'Annulée', value: 'annulee' },
    ];

    constructor(
        private commandeService: CommandeService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.commandeService.getBoutiqueOrders().subscribe({
            next: (data) => { this.commandes = data; this.filteredCommandes = data; this.loading = false; },
            error: (err) => { console.error(err); this.loading = false; }
        });
    }

    setFilter(statut: string | null) {
        this.filterStatut = statut;
        this.filteredCommandes = statut ? this.commandes.filter(c => c.statut === statut) : [...this.commandes];
    }

    countByStatut(statut: string): number {
        return this.commandes.filter(c => c.statut === statut).length;
    }

    getInitials(client: any): string {
        if (!client) return '?';
        return ((client.prenom_client?.[0] || '') + (client.nom_client?.[0] || '')).toUpperCase();
    }

    goToDetail(cmd: any) {
        this.router.navigate(['/boutique/home/mesCommandes', cmd._id]);
    }

    changeStatut(cmd: any) {
        if (!cmd._newStatut) return;
        this.commandeService.updateOrderStatus(cmd._id, cmd._newStatut).subscribe({
            next: () => {
                cmd.statut = cmd._newStatut;
                cmd._newStatut = null;
                this.messageService.add({ severity: 'success', summary: 'Statut mis à jour', detail: this.getStatutLabel(cmd.statut), life: 3000 });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur', life: 3000 });
            }
        });
    }

    getAvailableStatuts(current: string): any[] {
        const flow: Record<string, any[]> = {
            en_attente:     [{ label: 'Confirmer', value: 'confirmee' }, { label: 'Annuler', value: 'annulee' }],
            confirmee:      [{ label: 'En préparation', value: 'en_preparation' }, { label: 'Annuler', value: 'annulee' }],
            en_preparation: [{ label: 'Prête', value: 'prete' }],
            prete:          [{ label: 'Livrée', value: 'livree' }],
        };
        return flow[current] || [];
    }

    getStatutLabel(statut: string): string {
        const labels: Record<string, string> = {
            en_attente: 'En attente', confirmee: 'Confirmée',
            en_preparation: 'En préparation', prete: 'Prête',
            livree: 'Livrée', annulee: 'Annulée'
        };
        return labels[statut] || statut;
    }

    getStatutSeverity(statut: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        const s: Record<string, 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast'> = {
            en_attente: 'warn', confirmee: 'info', en_preparation: 'info',
            prete: 'success', livree: 'contrast', annulee: 'danger'
        };
        return s[statut] ?? 'info';
    }
}
