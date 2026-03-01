import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ProduitService } from '@/pages/service/produit.service';
import { PromotionService } from '@/pages/service/promotion.service';

interface PrixRow {
    produitId: string;
    produitNom: string;
    varianteId: string;
    combinaison: any[];
    is_default: boolean;
    reference: string;
    prixActuel: any | null;
    promo: any | null;
}

@Component({
    selector: 'app-mes-prix',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        SelectModule,
        TableModule,
        DialogModule,
        FluidModule,
        ToastModule,
        TagModule,
        TooltipModule
    ],
    providers: [MessageService],
    template: `
    <p-toast></p-toast>

    <div class="page-container">
        <div class="page-header">
            <div>
                <h2 class="page-title"><i class="pi pi-tag"></i> Gestion des Prix</h2>
                <p class="page-subtitle">{{ filteredRows.length }} variante(s) · Définissez les prix par variante</p>
            </div>
        </div>

        <!-- ===== BARRE DE FILTRES ===== -->
        <div class="filter-bar mb-4">

            <!-- Recherche texte -->
            <p-iconfield>
                <p-inputicon styleClass="pi pi-search" />
                <input pInputText type="text" [(ngModel)]="searchText"
                       (ngModelChange)="applyFilter()"
                       placeholder="Rechercher produit, variante, réf..."
                       class="search-input" />
            </p-iconfield>

            <!-- Filtre par produit -->
            <p-select appendTo="body" [options]="produitFilterOptions"
                      [(ngModel)]="selectedProduitFilter"
                      optionLabel="label" optionValue="value"
                      placeholder="Tous les produits"
                      [showClear]="true"
                      (ngModelChange)="applyFilter()"
                      styleClass="filter-select w-16rem">
            </p-select>

            <!-- Filtre prix défini -->
            <p-select appendTo="body" [options]="prixFilterOptions"
                      [(ngModel)]="selectedPrixFilter"
                      optionLabel="label" optionValue="value"
                      placeholder="Tous les prix"
                      [showClear]="true"
                      (ngModelChange)="applyFilter()"
                      styleClass="filter-select w-12rem">
            </p-select>

            <span class="text-500 text-sm ml-auto">{{ filteredRows.length }} résultat(s)</span>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Tableau -->
        <div class="table-card" *ngIf="!loading">
            <p-table [value]="filteredRows"
                     styleClass="custom-table"
                     [paginator]="true" [rows]="15"
                     [tableStyle]="{'min-width': '55rem'}"
                     [rowHover]="true"
                     [showCurrentPageReport]="true"
                     currentPageReportTemplate="{first} - {last} sur {totalRecords} variantes">

                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="produitNom">Produit <p-sortIcon field="produitNom"></p-sortIcon></th>
                        <th>Variante</th>
                        <th>Référence</th>
                        <th>Prix HT</th>
                        <th>Prix TTC</th>
                        <th>Prix promo</th>
                        <th>Dernière MAJ</th>
                        <th style="width:10rem">Actions</th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-row>
                    <tr>
                        <td><span class="font-semibold text-900">{{ row.produitNom }}</span></td>
                        <td>
                            <span *ngIf="row.is_default" class="text-500 italic">Par défaut</span>
                            <span *ngIf="!row.is_default">{{ formatCombinaison(row.combinaison) }}</span>
                        </td>
                        <td>{{ row.reference || '-' }}</td>
                        <td>
                            <span *ngIf="row.prixActuel" class="font-semibold">
                                {{ row.prixActuel.prix_hors_taxe | number:'1.2-2' }} {{ row.prixActuel.devise || 'AR' }}
                            </span>
                            <span *ngIf="!row.prixActuel" class="no-price-badge">Non défini</span>
                        </td>
                        <td>
                            <span *ngIf="row.prixActuel?.prix_ttc">
                                {{ row.prixActuel.prix_ttc | number:'1.2-2' }} {{ row.prixActuel.devise || 'AR' }}
                            </span>
                            <span *ngIf="!row.prixActuel?.prix_ttc" class="text-400">-</span>
                        </td>
                        <td>
                            <ng-container *ngIf="row.promo && row.prixActuel">
                                <div class="promo-price-cell">
                                    <span class="promo-price-original">
                                        {{ (row.prixActuel.prix_ttc || row.prixActuel.prix_hors_taxe) | number:'1.2-2' }}
                                    </span>
                                    <span class="promo-price-new">
                                        {{ applyPromo(row.prixActuel.prix_ttc || row.prixActuel.prix_hors_taxe, row.promo) | number:'1.2-2' }}
                                        {{ row.prixActuel.devise || 'AR' }}
                                    </span>
                                    <span class="promo-price-badge">
                                        {{ row.promo.type_reduction === 'pourcentage' ? ('-' + row.promo.valeur_reduction + '%') : ('-' + row.promo.valeur_reduction + ' AR') }}
                                    </span>
                                </div>
                            </ng-container>
                            <span *ngIf="!row.promo || !row.prixActuel" class="text-400">—</span>
                        </td>
                        <td>
                            <span *ngIf="row.prixActuel" class="text-500 text-sm">
                                {{ row.prixActuel.created_at | date:'dd/MM/yyyy' }}
                            </span>
                            <span *ngIf="!row.prixActuel" class="text-400">-</span>
                        </td>
                        <td>
                            <div class="flex gap-2">
                                <button pButton label="Définir" icon="pi pi-pencil"
                                        size="small" (click)="openSetPrix(row)"></button>
                                <button pButton icon="pi pi-history" [rounded]="true" [text]="true"
                                        pTooltip="Historique des prix" severity="secondary"
                                        (click)="openHistorique(row)"></button>
                            </div>
                        </td>
                    </tr>
                </ng-template>

                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="8" class="text-center p-8">
                            <i class="pi pi-tag text-6xl text-400 mb-3 block"></i>
                            <p class="text-600">Aucune variante trouvée</p>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>


    <!-- ===== DIALOG : Définir nouveau prix ===== -->
    <p-dialog [(visible)]="setPrixDialog"
              [style]="{width: '440px'}"
              header="Définir un nouveau prix"
              [modal]="true" [closable]="true">
        <ng-template pTemplate="content">
            <p-fluid>
            <div class="flex flex-col gap-4 pt-2">
                <div class="info-block">
                    <span class="info-label">Produit</span>
                    <span class="info-value">{{ selectedRow?.produitNom }}</span>
                </div>
                <div class="info-block">
                    <span class="info-label">Variante</span>
                    <span class="info-value">{{ selectedRow?.is_default ? 'Par défaut' : formatCombinaison(selectedRow?.combinaison || []) }}</span>
                </div>
                <div *ngIf="selectedRow?.prixActuel" class="info-block">
                    <span class="info-label">Prix actuel HT</span>
                    <span class="info-value text-primary font-bold">{{ selectedRow?.prixActuel?.prix_hors_taxe | number:'1.2-2' }} {{ selectedRow?.prixActuel?.devise || 'AR' }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Devise <span class="text-red-500">*</span></label>
                    <p-select appendTo="body" [options]="deviseOptions" [(ngModel)]="newDevise"
                              optionLabel="label" optionValue="value"
                              [style]="{width:'100%'}"></p-select>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Nouveau prix HT <span class="text-red-500">*</span></label>
                    <input pInputText type="number" [(ngModel)]="newPrixHT" placeholder="Ex: 50.00" min="0" />
                    <small *ngIf="prixSubmitted && !newPrixHT" class="text-red-500">Le prix HT est requis.</small>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Prix TTC <span class="text-500 font-normal">(optionnel)</span></label>
                    <input pInputText type="number" [(ngModel)]="newPrixTTC" placeholder="Ex: 60.00" min="0" />
                </div>
            </div>
            </p-fluid>
        </ng-template>
        <ng-template pTemplate="footer">
            <button pButton label="Annuler" icon="pi pi-times" [text]="true" (click)="setPrixDialog = false"></button>
            <button pButton label="Enregistrer" icon="pi pi-check"
                    (click)="savePrix()" [loading]="savingPrix"></button>
        </ng-template>
    </p-dialog>

    <!-- ===== DIALOG : Historique des prix ===== -->
    <p-dialog [(visible)]="historiqueDialog"
              [style]="{width: '560px'}"
              [header]="'Historique — ' + (selectedRow?.produitNom || '') + ' · ' + (selectedRow?.is_default ? 'Par défaut' : formatCombinaison(selectedRow?.combinaison || []))"
              [modal]="true" [closable]="true">
        <ng-template pTemplate="content">
            <div *ngIf="loadingHistory" class="flex items-center justify-center p-4">
                <i class="pi pi-spin pi-spinner text-2xl text-primary"></i>
            </div>
            <p-table *ngIf="!loadingHistory" [value]="historiqueData"
                     [tableStyle]="{'min-width':'400px'}">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Date</th>
                        <th>Devise</th>
                        <th>Prix HT</th>
                        <th>Prix TTC</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-h let-rowIndex="rowIndex">
                    <tr [class.font-bold]="rowIndex === 0">
                        <td>
                            {{ h.created_at | date:'dd/MM/yyyy HH:mm' }}
                            <span *ngIf="rowIndex === 0" class="text-xs text-primary ml-1">(actuel)</span>
                        </td>
                        <td>{{ h.devise || 'AR' }}</td>
                        <td>{{ h.prix_hors_taxe | number:'1.2-2' }}</td>
                        <td>{{ h.prix_ttc ? (h.prix_ttc | number:'1.2-2') : '-' }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr><td colspan="4" class="text-center p-4 text-400">Aucun historique de prix.</td></tr>
                </ng-template>
            </p-table>
        </ng-template>
        <ng-template pTemplate="footer">
            <button pButton label="Fermer" icon="pi pi-times" [text]="true" (click)="historiqueDialog = false"></button>
        </ng-template>
    </p-dialog>
    `,
    styles: [`
:host {
    --primary: #f59e0b; --primary-dark: #d97706; --card: #ffffff;
    --text-900: #0f172a; --text-600: #475569; --text-400: #94a3b8;
    --border: #e2e8f0; --border-100: #f8fafc;
    --shadow: 0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04);
    --radius: 1rem;
}
.page-container { padding: 2rem; }
.page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; }
.page-title { font-size:1.75rem; font-weight:700; color:var(--text-900); display:flex; align-items:center; gap:0.75rem; margin:0; }
.page-title i { color:var(--primary); font-size:1.5rem; }
.page-subtitle { color:var(--text-600); font-size:0.875rem; margin:0.25rem 0 0; }
.table-card { background:var(--card); border-radius:var(--radius); border:1px solid var(--border); box-shadow:var(--shadow); overflow:hidden; }

/* ── Filtre bar ── */
.filter-bar { display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; }
.search-input { min-width:280px; }

/* ── Badges ── */
.no-price-badge { display:inline-block; padding:0.2rem 0.6rem; background:#fef2f2; color:#b91c1c; border-radius:9999px; font-size:0.78rem; font-weight:600; border:1px solid #fecaca; }

/* ── Promo price cell ── */
.promo-price-cell { display:flex; flex-direction:column; gap:0.2rem; }
.promo-price-original { font-size:0.78rem; color:var(--text-400); text-decoration:line-through; }
.promo-price-new { font-size:0.9rem; font-weight:700; color:#b45309; }
.promo-price-badge { display:inline-block; background:#fef3c7; color:#b45309; font-size:0.68rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:4px; border:1px solid #fcd34d; }

/* ── Dialog info blocks ── */
.info-block { display:flex; flex-direction:column; gap:2px; padding:0.625rem 0.875rem; background:var(--border-100); border-radius:0.5rem; }
.info-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-400); }
.info-value { font-size:0.9rem; font-weight:600; color:var(--text-900); }

/* ── Table ── */
::ng-deep .custom-table .p-datatable-thead > tr > th { background:var(--border-100) !important; color:var(--text-600) !important; font-size:0.75rem !important; font-weight:600 !important; text-transform:uppercase !important; letter-spacing:0.05em !important; padding:0.875rem 1rem !important; border-bottom:1px solid var(--border) !important; border-right:none !important; border-top:none !important; border-left:none !important; }
::ng-deep .custom-table .p-datatable-tbody > tr { background:#fff !important; color:var(--text-900) !important; transition:background 0.15s; }
::ng-deep .custom-table .p-datatable-tbody > tr:hover { background:#fefce8 !important; }
::ng-deep .custom-table .p-datatable-tbody > tr > td { padding:0.875rem 1rem !important; border-bottom:1px solid var(--border-100) !important; border-right:none !important; border-left:none !important; border-top:none !important; }
::ng-deep .custom-table .p-paginator { background:var(--border-100) !important; border-top:1px solid var(--border) !important; padding:0.75rem 1.5rem !important; border-bottom:none !important; border-left:none !important; border-right:none !important; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page { color:var(--text-600) !important; border-radius:0.375rem; font-weight:500; }
::ng-deep .custom-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight { background:var(--primary) !important; color:#fff !important; }

/* ── Buttons ── */
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link) { background:var(--primary) !important; border-color:var(--primary) !important; color:#fff !important; }
::ng-deep .p-button:not(.p-button-text):not(.p-button-outlined):not(.p-button-link):enabled:hover { background:var(--primary-dark) !important; border-color:var(--primary-dark) !important; }
    `]
})
export class MesPrix implements OnInit {

    produits: any[] = [];
    allRows: PrixRow[] = [];
    filteredRows: PrixRow[] = [];
    loading = true;
    myActivePromos: any[] = [];

    // Filtres
    searchText = '';
    selectedProduitFilter: string | null = null;
    selectedPrixFilter: string | null = null;

    produitFilterOptions: { label: string; value: string }[] = [];
    prixFilterOptions = [
        { label: 'Avec prix défini', value: 'avec' },
        { label: 'Sans prix', value: 'sans' }
    ];

    deviseOptions = [
        { label: 'AR — Ariary Malgache', value: 'AR' },
        { label: 'DT — Dinar Tunisien', value: 'DT' },
        { label: 'EUR — Euro', value: 'EUR' },
        { label: 'USD — Dollar US', value: 'USD' },
        { label: 'MAD — Dirham Marocain', value: 'MAD' },
        { label: 'DZD — Dinar Algérien', value: 'DZD' }
    ];

    // Dialog : Définir prix
    setPrixDialog = false;
    selectedRow: PrixRow | null = null;
    newPrixHT: number | null = null;
    newPrixTTC: number | null = null;
    newDevise = 'AR';
    prixSubmitted = false;
    savingPrix = false;

    // Dialog : Historique
    historiqueDialog = false;
    historiqueData: any[] = [];
    loadingHistory = false;

    constructor(
        private produitService: ProduitService,
        private messageService: MessageService,
        private promotionService: PromotionService
    ) {}

    ngOnInit() {
        this.loading = true;
        let produitsLoaded = false;
        let promosLoaded = false;

        const tryBuild = () => {
            if (produitsLoaded && promosLoaded) {
                this.buildRows();
                this.loading = false;
            }
        };

        this.produitService.getMyProducts().subscribe({
            next: (data) => {
                this.produits = data;
                produitsLoaded = true;
                tryBuild();
            },
            error: () => { this.loading = false; }
        });

        this.promotionService.getMyPromotions().subscribe({
            next: (promos) => {
                const now = new Date();
                this.myActivePromos = promos.filter((p: any) =>
                    p.actif && new Date(p.date_debut) <= now && new Date(p.date_fin) >= now
                );
                promosLoaded = true;
                tryBuild();
            },
            error: () => {
                promosLoaded = true;
                tryBuild();
            }
        });
    }

    buildRows() {
        this.allRows = [];
        for (const produit of this.produits) {
            const promo = this.getPromoForProduit(produit._id);
            for (const v of (produit.variantes || [])) {
                this.allRows.push({
                    produitId: produit._id,
                    produitNom: produit.nom_produit,
                    varianteId: v._id,
                    combinaison: v.combinaison || [],
                    is_default: v.is_default,
                    reference: v.reference || '',
                    prixActuel: this.getPrixActuel(v),
                    promo
                });
            }
        }
        this.produitFilterOptions = [
            ...new Map(this.produits.map((p: any) => [p._id, { label: p.nom_produit, value: p._id }])).values()
        ];
        this.applyFilter();
    }

    applyFilter() {
        const q = this.searchText.toLowerCase().trim();
        this.filteredRows = this.allRows.filter(row => {
            const matchSearch = !q ||
                row.produitNom.toLowerCase().includes(q) ||
                this.formatCombinaison(row.combinaison).toLowerCase().includes(q) ||
                row.reference.toLowerCase().includes(q);
            const matchProduit = !this.selectedProduitFilter || row.produitId === this.selectedProduitFilter;
            const matchPrix = !this.selectedPrixFilter ||
                (this.selectedPrixFilter === 'avec' ? !!row.prixActuel : !row.prixActuel);
            return matchSearch && matchProduit && matchPrix;
        });
    }

    getPrixActuel(variante: any): any | null {
        if (!variante.historique_prix || variante.historique_prix.length === 0) return null;
        return [...variante.historique_prix].sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];
    }

    getPromoForProduit(produitId: string): any | null {
        return this.myActivePromos.find((promo: any) =>
            promo.produits && promo.produits.some((p: any) => (p._id || p) === produitId)
        ) || null;
    }

    openSetPrix(row: PrixRow) {
        this.selectedRow = row;
        this.newPrixHT = null;
        this.newPrixTTC = null;
        this.newDevise = row.prixActuel?.devise || 'AR';
        this.prixSubmitted = false;
        this.setPrixDialog = true;
    }

    savePrix() {
        this.prixSubmitted = true;
        if (!this.newPrixHT || !this.selectedRow) return;
        this.savingPrix = true;

        this.produitService.setPrix(this.selectedRow.produitId, this.selectedRow.varianteId, {
            prix_hors_taxe: this.newPrixHT,
            prix_ttc: this.newPrixTTC || undefined,
            devise: this.newDevise || 'AR'
        }).subscribe({
            next: (res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Prix enregistré', life: 3000 });
                this.setPrixDialog = false;
                this.savingPrix = false;
                // Mettre à jour en mémoire
                const produit = res.produit;
                const idx = this.produits.findIndex((p: any) => p._id === produit._id);
                if (idx > -1) this.produits[idx] = produit;
                this.buildRows();
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec enregistrement', life: 3000 });
                this.savingPrix = false;
            }
        });
    }

    openHistorique(row: PrixRow) {
        this.selectedRow = row;
        this.historiqueData = [];
        this.historiqueDialog = true;
        this.loadingHistory = true;

        this.produitService.getPrixHistory(row.produitId, row.varianteId).subscribe({
            next: (data: any[]) => { this.historiqueData = data; this.loadingHistory = false; },
            error: () => { this.loadingHistory = false; }
        });
    }

    applyPromo(basePrix: number, promo: any): number {
        if (!promo) return basePrix;
        if (promo.type_reduction === 'pourcentage') {
            return Math.max(0, basePrix * (1 - promo.valeur_reduction / 100));
        }
        return Math.max(0, basePrix - promo.valeur_reduction);
    }

    formatCombinaison(combinaison: any[]): string {
        if (!combinaison || combinaison.length === 0) return 'Par défaut';
        return combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(' | ');
    }
}
