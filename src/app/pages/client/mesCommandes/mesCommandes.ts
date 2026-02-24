import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    selector: 'app-mes-commandes',
    standalone: true,
    imports: [CommonModule, TagModule, ButtonModule],
    template: `
<!-- ===== HEADER ===== -->
<div class="mc-header">
    <div class="mc-header-left">
        <i class="pi pi-list mc-header-icon"></i>
        <div>
            <h1 class="mc-title">Mes Commandes</h1>
            <p class="mc-subtitle">{{ commandes.length }} commande(s)</p>
        </div>
    </div>
</div>

<!-- ===== LOADING ===== -->
@if (loading) {
    <div class="mc-loading">
        <i class="pi pi-spin pi-spinner"></i>
        <span>Chargement de vos commandes...</span>
    </div>
}

<!-- ===== EMPTY ===== -->
@if (!loading && commandes.length === 0) {
    <div class="mc-empty">
        <div class="mc-empty-icon-wrap">
            <i class="pi pi-inbox"></i>
        </div>
        <h2>Aucune commande pour le moment</h2>
        <p>Vos commandes apparaîtront ici après votre premier achat.</p>
    </div>
}

<!-- ===== ORDERS LIST ===== -->
@if (!loading && commandes.length > 0) {
    <div class="mc-list">
        @for (cmd of commandes; track cmd._id) {
            <div class="mc-order-card" (click)="goToDetail(cmd)">

                <!-- Card header -->
                <div class="mc-card-hdr">
                    <div class="mc-card-hdr-group">
                        <div class="mc-card-meta">
                            <span class="mc-meta-label">COMMANDE N°</span>
                            <span class="mc-meta-val">{{ cmd.numero_commande }}</span>
                        </div>
                        <div class="mc-card-meta">
                            <span class="mc-meta-label">DATE</span>
                            <span class="mc-meta-val">{{ cmd.created_at | date:'dd MMM yyyy' }}</span>
                        </div>
                        <div class="mc-card-meta">
                            <span class="mc-meta-label">BOUTIQUE</span>
                            <span class="mc-meta-val">{{ cmd.boutique?.nom_boutique || '—' }}</span>
                        </div>
                        <div class="mc-card-meta">
                            <span class="mc-meta-label">TOTAL</span>
                            <span class="mc-meta-val mc-total">{{ cmd.total | number:'1.2-2' }} DT</span>
                        </div>
                    </div>
                    <div class="mc-card-hdr-right">
                        <p-tag [value]="getStatutLabel(cmd.statut)"
                               [severity]="getStatutSeverity(cmd.statut)"></p-tag>
                    </div>
                </div>

                <!-- Card body -->
                <div class="mc-card-body">
                    <div class="mc-card-articles">
                        <i class="pi pi-box mc-articles-icon"></i>
                        <span>{{ cmd.lignes?.length || 0 }} article{{ (cmd.lignes?.length || 0) > 1 ? 's' : '' }}</span>
                        @if (cmd.mode_retrait === 'retrait_boutique') {
                            <span class="mc-mode-badge"><i class="pi pi-home"></i> Retrait boutique</span>
                        } @else {
                            <span class="mc-mode-badge"><i class="pi pi-truck"></i> Livraison</span>
                        }
                    </div>
                    <div class="mc-view-link">
                        Voir la facture <i class="pi pi-arrow-right"></i>
                    </div>
                </div>

                <!-- Status bar -->
                @if (cmd.statut !== 'annulee') {
                    <div class="mc-status-bar">
                        @for (step of statusSteps; track step.key; let i = $index) {
                            <div class="mc-step"
                                 [class.mc-step-done]="isStepDone(cmd, step.key)"
                                 [class.mc-step-current]="isStepCurrent(cmd, step.key)">
                                @if (i > 0) {
                                    <div class="mc-step-line"
                                         [class.mc-step-line-done]="isStepDone(cmd, step.key) || isStepCurrent(cmd, step.key)"></div>
                                }
                                <div class="mc-step-dot">
                                    @if (isStepDone(cmd, step.key)) { <i class="pi pi-check"></i> }
                                </div>
                                <span class="mc-step-label">{{ step.label }}</span>
                            </div>
                        }
                    </div>
                } @else {
                    <div class="mc-cancelled-bar">
                        <i class="pi pi-times-circle"></i> Commande annulée
                    </div>
                }
            </div>
        }
    </div>
}

<style>
.mc-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem; }
.mc-header-left { display:flex; align-items:center; gap:0.75rem; }
.mc-header-icon { font-size:1.75rem; color:#f59e0b; }
.mc-title { margin:0; font-size:1.5rem; font-weight:800; color:#0f172a; }
.mc-subtitle { margin:0; font-size:0.85rem; color:#64748b; }
.mc-loading { display:flex; align-items:center; justify-content:center; gap:0.75rem; padding:4rem; color:#64748b; }
.mc-loading .pi { font-size:1.5rem; color:#f59e0b; }
.mc-empty { text-align:center; padding:4rem 2rem; background:white; border-radius:14px; border:1px solid #e2e8f0; max-width:480px; margin:0 auto; }
.mc-empty-icon-wrap { width:72px; height:72px; border-radius:50%; background:#fef3c7; margin:0 auto 1.25rem; display:flex; align-items:center; justify-content:center; font-size:1.8rem; color:#f59e0b; }
.mc-empty h2 { margin:0 0 0.5rem; color:#0f172a; font-size:1.15rem; }
.mc-empty p { margin:0; color:#64748b; }
.mc-list { display:flex; flex-direction:column; gap:1rem; }
.mc-order-card { background:white; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 4px rgba(0,0,0,0.05); cursor:pointer; overflow:hidden; transition:box-shadow 0.2s,transform 0.15s; }
.mc-order-card:hover { box-shadow:0 4px 18px rgba(0,0,0,0.1); transform:translateY(-1px); }
.mc-card-hdr { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1.25rem; background:#f8fafc; border-bottom:1px solid #e2e8f0; flex-wrap:wrap; gap:0.75rem; }
.mc-card-hdr-group { display:flex; gap:2rem; flex-wrap:wrap; }
.mc-card-meta { display:flex; flex-direction:column; gap:0.1rem; }
.mc-meta-label { font-size:0.65rem; font-weight:700; letter-spacing:0.07em; color:#94a3b8; text-transform:uppercase; }
.mc-meta-val { font-size:0.88rem; font-weight:600; color:#1e293b; }
.mc-total { color:#b45309; font-size:0.95rem; }
.mc-card-body { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1.25rem; }
.mc-card-articles { display:flex; align-items:center; gap:0.6rem; font-size:0.85rem; color:#475569; }
.mc-articles-icon { color:#94a3b8; }
.mc-mode-badge { display:inline-flex; align-items:center; gap:0.25rem; font-size:0.75rem; background:#f1f5f9; color:#475569; padding:0.2rem 0.6rem; border-radius:20px; font-weight:500; }
.mc-view-link { display:flex; align-items:center; gap:0.35rem; font-size:0.82rem; color:#0369a1; font-weight:600; transition:gap 0.15s; }
.mc-order-card:hover .mc-view-link { gap:0.55rem; }
.mc-status-bar { display:flex; align-items:flex-start; padding:0.75rem 1.5rem 0.85rem; border-top:1px solid #f1f5f9; background:#fafbfc; }
.mc-step { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; gap:0.35rem; }
.mc-step-line { position:absolute; top:10px; right:50%; left:-50%; height:2px; background:#e2e8f0; z-index:0; transition:background 0.3s; }
.mc-step-line-done { background:#f59e0b; }
.mc-step-dot { width:22px; height:22px; border-radius:50%; background:#e2e8f0; border:2px solid #cbd5e1; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:white; z-index:1; position:relative; transition:all 0.2s; }
.mc-step.mc-step-done .mc-step-dot { background:#f59e0b; border-color:#f59e0b; }
.mc-step.mc-step-current .mc-step-dot { background:white; border:2.5px solid #f59e0b; box-shadow:0 0 0 4px rgba(245,158,11,0.15); }
.mc-step-label { font-size:0.65rem; color:#94a3b8; font-weight:500; text-align:center; }
.mc-step.mc-step-done .mc-step-label, .mc-step.mc-step-current .mc-step-label { color:#b45309; font-weight:700; }
.mc-cancelled-bar { display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.25rem; background:#fef2f2; border-top:1px solid #fecaca; color:#dc2626; font-size:0.82rem; font-weight:600; }
@media (max-width:700px) { .mc-card-hdr-group { gap:1rem; } .mc-status-bar { display:none; } }
</style>
    `
})
export class MesCommandes implements OnInit {
    commandes: any[] = [];
    loading = true;

    statusSteps = [
        { key: 'en_attente', label: 'En attente' },
        { key: 'confirmee', label: 'Confirmée' },
        { key: 'en_preparation', label: 'Préparation' },
        { key: 'prete', label: 'Prête' },
        { key: 'livree', label: 'Livrée' },
    ];
    private statusOrder = ['en_attente', 'confirmee', 'en_preparation', 'prete', 'livree'];

    constructor(
        private commandeService: CommandeService,
        private router: Router
    ) {}

    ngOnInit() {
        this.commandeService.getMyOrders().subscribe({
            next: (data) => { this.commandes = data; this.loading = false; },
            error: (err) => { console.error(err); this.loading = false; }
        });
    }

    goToDetail(cmd: any) {
        this.router.navigate(['/client/mes-commandes', cmd._id]);
    }

    isStepDone(cmd: any, key: string): boolean {
        if (cmd.statut === 'annulee') return false;
        return this.statusOrder.indexOf(key) < this.statusOrder.indexOf(cmd.statut);
    }

    isStepCurrent(cmd: any, key: string): boolean {
        return cmd.statut === key;
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
