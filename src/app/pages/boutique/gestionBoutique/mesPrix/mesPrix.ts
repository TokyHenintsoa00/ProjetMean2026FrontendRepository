import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ProduitService } from '@/pages/service/produit.service';

@Component({
    selector: 'app-mes-prix',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        SelectModule,
        TableModule,
        DialogModule,
        FluidModule,
        ToastModule,
        TagModule
    ],
    providers: [MessageService],
    template: `
    <p-toast></p-toast>

    <div class="card">
        <!-- Header -->
        <div class="flex items-center gap-3 pb-4 border-bottom-1 surface-border mb-4">
            <i class="pi pi-tag text-4xl text-primary"></i>
            <div>
                <div class="font-semibold text-2xl text-primary">Gestion des Prix</div>
                <p class="text-600 text-sm mt-1">Definissez et suivez l'historique des prix par variante</p>
            </div>
        </div>

        <!-- Filtre produit -->
        <div class="flex items-center gap-3 mb-4">
            <label class="font-semibold text-900 text-sm">Produit :</label>
            <p-select [options]="produitOptions" [(ngModel)]="selectedProduitId"
                      optionLabel="label" optionValue="value"
                      placeholder="Selectionnez un produit"
                      (ngModelChange)="onProduitChange($event)"
                      styleClass="w-20rem">
            </p-select>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Tableau des variantes avec prix -->
        <p-table *ngIf="!loading && rows.length > 0" [value]="rows"
                 [tableStyle]="{'min-width': '50rem'}" [rowHover]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th>Variante</th>
                    <th>Reference</th>
                    <th>Prix HT actuel (Ar)</th>
                    <th>Prix TTC actuel (Ar)</th>
                    <th>Derniere MAJ</th>
                    <th style="width:12rem">Actions</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-row>
                <tr>
                    <td>
                        <span *ngIf="row.is_default" class="text-500 italic">Par defaut</span>
                        <span *ngIf="!row.is_default" class="font-semibold">
                            {{ formatCombinaison(row.combinaison) }}
                        </span>
                    </td>
                    <td>{{ row.reference || '-' }}</td>
                    <td>
                        <span *ngIf="row.prixActuel">{{ row.prixActuel.prix_hors_taxe | number:'1.0-0' }} Ar</span>
                        <span *ngIf="!row.prixActuel" class="text-400 italic">Non defini</span>
                    </td>
                    <td>
                        <span *ngIf="row.prixActuel && row.prixActuel.prix_ttc">{{ row.prixActuel.prix_ttc | number:'1.0-0' }} Ar</span>
                        <span *ngIf="!row.prixActuel || !row.prixActuel.prix_ttc" class="text-400">-</span>
                    </td>
                    <td>
                        <span *ngIf="row.prixActuel" class="text-500 text-sm">
                            {{ row.prixActuel.created_at | date:'dd/MM/yyyy HH:mm' }}
                        </span>
                        <span *ngIf="!row.prixActuel" class="text-400">-</span>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <button pButton label="Nouveau prix" icon="pi pi-pencil"
                                    size="small" (click)="openSetPrix(row)"></button>
                            <button pButton icon="pi pi-history" [rounded]="true" [text]="true"
                                    pTooltip="Voir historique" severity="secondary"
                                    (click)="openHistorique(row)"></button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="6" class="text-center p-6 text-400">
                        Ce produit n'a aucune variante.
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <div *ngIf="!loading && !selectedProduitId" class="text-center p-8">
            <i class="pi pi-tag text-6xl text-400 mb-3 block"></i>
            <p class="text-600">Selectionnez un produit pour gerer ses prix</p>
        </div>
    </div>

    <!-- Dialog : Definir nouveau prix -->
    <p-dialog [(visible)]="setPrixDialog"
              [style]="{width: '420px'}"
              header="Definir un nouveau prix"
              [modal]="true" [closable]="true">
        <ng-template pTemplate="content">
            <p-fluid>
            <div class="flex flex-col gap-4 pt-2">
                <div class="surface-50 border-round p-3 mb-2">
                    <span class="text-600 text-sm">Variante : </span>
                    <span class="font-semibold">{{ selectedRow?.is_default ? 'Par defaut' : formatCombinaison(selectedRow?.combinaison) }}</span>
                </div>
                <div *ngIf="selectedRow?.prixActuel" class="surface-50 border-round p-3 mb-2">
                    <span class="text-600 text-sm">Prix actuel : </span>
                    <span class="font-semibold text-primary">{{ selectedRow?.prixActuel?.prix_hors_taxe | number:'1.0-0' }} Ar HT</span>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Nouveau prix HT (Ar) <span class="text-red-500">*</span></label>
                    <input pInputText type="number" [(ngModel)]="newPrixHT" placeholder="Ex: 50000" min="0" />
                    <small *ngIf="prixSubmitted && !newPrixHT" class="text-red-500">Le prix HT est requis.</small>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold text-900">Prix TTC (Ar) <span class="text-500 font-normal">(optionnel)</span></label>
                    <input pInputText type="number" [(ngModel)]="newPrixTTC" placeholder="Ex: 60000" min="0" />
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

    <!-- Dialog : Historique des prix -->
    <p-dialog [(visible)]="historiqueDialog"
              [style]="{width: '560px'}"
              [header]="'Historique des prix — ' + (selectedRow?.is_default ? 'Par defaut' : formatCombinaison(selectedRow?.combinaison))"
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
                        <th>Prix HT (Ar)</th>
                        <th>Prix TTC (Ar)</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-h let-rowIndex="rowIndex">
                    <tr [class.font-bold]="rowIndex === 0">
                        <td>
                            {{ h.created_at | date:'dd/MM/yyyy HH:mm' }}
                            <span *ngIf="rowIndex === 0" class="text-xs text-primary ml-1">(actuel)</span>
                        </td>
                        <td>{{ h.prix_hors_taxe | number:'1.0-0' }} Ar</td>
                        <td>{{ h.prix_ttc ? (h.prix_ttc | number:'1.0-0') + ' Ar' : '-' }}</td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr><td colspan="3" class="text-center p-4 text-400">Aucun historique de prix.</td></tr>
                </ng-template>
            </p-table>
        </ng-template>
        <ng-template pTemplate="footer">
            <button pButton label="Fermer" icon="pi pi-times" [text]="true" (click)="historiqueDialog = false"></button>
        </ng-template>
    </p-dialog>
    `
})
export class MesPrix implements OnInit {

    // Produits
    produits: any[] = [];
    produitOptions: { label: string; value: string }[] = [];
    selectedProduitId: string | null = null;
    loading = false;

    // Rows (variantes du produit selectionne)
    rows: any[] = [];

    // Dialog : Definir prix
    setPrixDialog = false;
    selectedRow: any = null;
    newPrixHT: number | null = null;
    newPrixTTC: number | null = null;
    prixSubmitted = false;
    savingPrix = false;

    // Dialog : Historique
    historiqueDialog = false;
    historiqueData: any[] = [];
    loadingHistory = false;

    constructor(
        private produitService: ProduitService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadProduits();
    }

    loadProduits() {
        this.loading = true;
        this.produitService.getMyProducts().subscribe({
            next: (data) => {
                this.produits = data;
                this.produitOptions = data.map((p: any) => ({ label: p.nom_produit, value: p._id }));
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    onProduitChange(produitId: string) {
        const produit = this.produits.find(p => p._id === produitId);
        if (!produit) { this.rows = []; return; }
        // Construire les rows avec prixActuel calculé
        this.rows = (produit.variantes || []).map((v: any) => ({
            ...v,
            prixActuel: this.getPrixActuel(v)
        }));
    }

    getPrixActuel(variante: any) {
        if (!variante.historique_prix || variante.historique_prix.length === 0) return null;
        return [...variante.historique_prix].sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];
    }

    openSetPrix(row: any) {
        this.selectedRow = row;
        this.newPrixHT = null;
        this.newPrixTTC = null;
        this.prixSubmitted = false;
        this.setPrixDialog = true;
    }

    savePrix() {
        this.prixSubmitted = true;
        if (!this.newPrixHT) return;
        this.savingPrix = true;

        this.produitService.setPrix(this.selectedProduitId!, this.selectedRow._id, {
            prix_hors_taxe: this.newPrixHT,
            prix_ttc: this.newPrixTTC || undefined
        }).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Prix enregistre', life: 3000 });
                this.setPrixDialog = false;
                this.savingPrix = false;
                // Mettre a jour localement
                const produit = res.produit;
                const idx = this.produits.findIndex(p => p._id === produit._id);
                if (idx > -1) this.produits[idx] = produit;
                this.onProduitChange(this.selectedProduitId!);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Echec enregistrement', life: 3000 });
                this.savingPrix = false;
            }
        });
    }

    openHistorique(row: any) {
        this.selectedRow = row;
        this.historiqueData = [];
        this.historiqueDialog = true;
        this.loadingHistory = true;

        this.produitService.getPrixHistory(this.selectedProduitId!, row._id).subscribe({
            next: (data) => { this.historiqueData = data; this.loadingHistory = false; },
            error: () => { this.loadingHistory = false; }
        });
    }

    formatCombinaison(combinaison: any[]): string {
        if (!combinaison || combinaison.length === 0) return 'Par defaut';
        return combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(' | ');
    }
}
