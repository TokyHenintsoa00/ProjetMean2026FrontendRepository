import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../layout/service/layout.service';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    standalone: true,
    selector: 'app-revenue-stream-widget',
    imports: [DecimalPipe, ChartModule, ButtonModule],
    template: `
    <div class="card mb-8!">
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div class="font-semibold text-xl">Résumé des ventes</div>
            <div class="flex gap-2">
                <button pButton
                    label="7 jours"
                    size="small"
                    [outlined]="selectedPeriod !== '7j'"
                    (click)="setPeriod('7j')">
                </button>
                <button pButton
                    label="30 jours"
                    size="small"
                    [outlined]="selectedPeriod !== '30j'"
                    (click)="setPeriod('30j')">
                </button>
                <button pButton
                    label="3 mois"
                    size="small"
                    [outlined]="selectedPeriod !== '3m'"
                    (click)="setPeriod('3m')">
                </button>
            </div>
        </div>

        <!-- KPIs -->
        <div class="grid grid-cols-3 gap-3 mb-5">
            <div class="text-center p-3 rounded-lg bg-surface-100 dark:bg-surface-700">
                <div class="text-muted-color text-sm mb-1">CA période</div>
                <div class="text-xl font-bold text-surface-900 dark:text-surface-0">{{ caPeriode | number:'1.0-0' }} DT</div>
                <div [class]="caVariation >= 0 ? 'text-green-500 text-xs mt-1' : 'text-red-500 text-xs mt-1'">
                    <i [class]="caVariation >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
                    {{ caVariation >= 0 ? '+' : '' }}{{ caVariation | number:'1.0-0' }}% vs préc.
                </div>
            </div>
            <div class="text-center p-3 rounded-lg bg-surface-100 dark:bg-surface-700">
                <div class="text-muted-color text-sm mb-1">Transactions</div>
                <div class="text-xl font-bold text-surface-900 dark:text-surface-0">{{ nbTransactions }}</div>
                <div class="text-muted-color text-xs mt-1">vs {{ nbTransactionsPrev }} période préc.</div>
            </div>
            <div class="text-center p-3 rounded-lg bg-surface-100 dark:bg-surface-700">
                <div class="text-muted-color text-sm mb-1">Ticket moyen</div>
                <div class="text-xl font-bold text-surface-900 dark:text-surface-0">{{ ticketMoyen | number:'1.0-0' }} DT</div>
                <div class="text-muted-color text-xs mt-1">par commande</div>
            </div>
        </div>

        <!-- Chart -->
        @if (loading) {
            <div class="flex items-center justify-center text-muted-color" style="height: 200px;">
                <i class="pi pi-spinner pi-spin mr-2"></i> Chargement...
            </div>
        } @else if (chartData) {
            <p-chart type="line" [data]="chartData" [options]="chartOptions" style="height: 200px;" />
        } @else {
            <div class="flex items-center justify-center text-muted-color" style="height: 200px;">
                Aucune donnée disponible
            </div>
        }
    </div>
    `
})
export class RevenueStreamWidget implements OnInit, OnDestroy {
    selectedPeriod = '30j';
    allCommandes: any[] = [];
    chartData: any = null;
    chartOptions: any;
    caPeriode = 0;
    caVariation = 0;
    nbTransactions = 0;
    nbTransactionsPrev = 0;
    ticketMoyen = 0;
    loading = true;

    private themeSubscription!: Subscription;

    constructor(
        private commandeService: CommandeService,
        public layoutService: LayoutService
    ) {
        this.themeSubscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            if (!this.loading) this.buildChart();
        });
    }

    ngOnInit() {
        this.commandeService.getBoutiqueOrders().subscribe({
            next: (commandes: any[]) => {
                this.allCommandes = commandes.filter(c => c.statut !== 'annulee');
                this.loading = false;
                this.buildChart();
            },
            error: () => { this.loading = false; }
        });
    }

    setPeriod(p: string) {
        this.selectedPeriod = p;
        this.buildChart();
    }

    buildChart() {
        const now = new Date();
        let days: number;
        let groupByWeek = false;

        if (this.selectedPeriod === '7j') { days = 7; }
        else if (this.selectedPeriod === '30j') { days = 30; }
        else { days = 91; groupByWeek = true; }

        const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const prevStart = new Date(start.getTime() - days * 24 * 60 * 60 * 1000);

        const current = this.allCommandes.filter(c => new Date(c.created_at) >= start);
        const prev = this.allCommandes.filter(c => {
            const d = new Date(c.created_at);
            return d >= prevStart && d < start;
        });

        this.caPeriode = current.reduce((s, c) => s + (c.total || 0), 0);
        const caPrev = prev.reduce((s, c) => s + (c.total || 0), 0);
        this.caVariation = caPrev > 0 ? ((this.caPeriode - caPrev) / caPrev) * 100 : (this.caPeriode > 0 ? 100 : 0);
        this.nbTransactions = current.length;
        this.nbTransactionsPrev = prev.length;
        this.ticketMoyen = this.nbTransactions > 0 ? this.caPeriode / this.nbTransactions : 0;

        const labels: string[] = [];
        const data: number[] = [];

        if (!groupByWeek) {
            for (let i = days - 1; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 86400000);
                labels.push(d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));
                const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                const dayEnd = new Date(dayStart.getTime() + 86400000);
                const total = current
                    .filter(c => { const cd = new Date(c.created_at); return cd >= dayStart && cd < dayEnd; })
                    .reduce((s, c) => s + (c.total || 0), 0);
                data.push(total);
            }
        } else {
            const weeks = 13;
            for (let i = weeks - 1; i >= 0; i--) {
                const wEnd = new Date(now.getTime() - i * 7 * 86400000);
                const wStart = new Date(wEnd.getTime() - 7 * 86400000);
                labels.push(`S${weeks - i}`);
                const total = this.allCommandes
                    .filter(c => { const cd = new Date(c.created_at); return cd >= wStart && cd < wEnd; })
                    .reduce((s, c) => s + (c.total || 0), 0);
                data.push(total);
            }
        }

        const doc = getComputedStyle(document.documentElement);
        const textMuted = doc.getPropertyValue('--text-color-secondary');
        const borderColor = doc.getPropertyValue('--surface-border');
        const primary = doc.getPropertyValue('--p-primary-500') || '#6366f1';

        this.chartData = {
            labels,
            datasets: [{
                label: 'CA (DT)',
                data,
                fill: true,
                borderColor: primary,
                backgroundColor: primary + '22',
                tension: 0.4,
                pointRadius: days <= 7 ? 5 : 2,
                pointHoverRadius: 7
            }]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (ctx: any) => ` ${(ctx.raw as number).toFixed(2)} DT` } }
            },
            scales: {
                x: { ticks: { color: textMuted, maxRotation: 0, font: { size: 11 } }, grid: { color: 'transparent' } },
                y: { ticks: { color: textMuted, font: { size: 11 } }, grid: { color: borderColor }, beginAtZero: true }
            }
        };
    }

    ngOnDestroy() {
        if (this.themeSubscription) this.themeSubscription.unsubscribe();
    }
}
