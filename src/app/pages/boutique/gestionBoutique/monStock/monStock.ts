import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ProduitService } from '@/pages/service/produit.service';

interface StockRow {
    produitId: string;
    produitNom: string;
    varianteId: string;
    combinaison: any[];
    is_default: boolean;
    reference: string;
    stock: number;
    editStock: number;
    saving: boolean;
}

@Component({
    selector: 'app-mon-stock',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        SelectModule,
        TableModule,
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
            <i class="pi pi-warehouse text-4xl text-primary"></i>
            <div>
                <div class="font-semibold text-2xl text-primary">Gestion du Stock</div>
                <p class="text-600 text-sm mt-1">Consultez et mettez a jour le stock par variante</p>
            </div>
        </div>

        <!-- Filtre -->
        <div class="flex items-center gap-3 mb-4">
            <label class="font-semibold text-900 text-sm">Filtrer par produit :</label>
            <p-select [options]="produitFilterOptions" [(ngModel)]="selectedFilter"
                      optionLabel="label" optionValue="value"
                      placeholder="Tous les produits"
                      [showClear]="true"
                      (ngModelChange)="applyFilter()"
                      styleClass="w-20rem">
            </p-select>
            <span class="text-500 text-sm">{{ filteredRows.length }} ligne(s)</span>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="flex items-center justify-center p-8">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <!-- Tableau -->
        <p-table *ngIf="!loading" [value]="filteredRows"
                 [paginator]="true" [rows]="15"
                 [tableStyle]="{'min-width': '55rem'}"
                 [rowHover]="true"
                 [showCurrentPageReport]="true"
                 currentPageReportTemplate="{first} - {last} sur {totalRecords} variantes">

            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="produitNom">Produit <p-sortIcon field="produitNom"></p-sortIcon></th>
                    <th>Variante</th>
                    <th>Reference</th>
                    <th pSortableColumn="stock">Stock actuel <p-sortIcon field="stock"></p-sortIcon></th>
                    <th style="width:16rem">Modifier le stock</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-row>
                <tr>
                    <td><span class="font-semibold">{{ row.produitNom }}</span></td>
                    <td>
                        <span *ngIf="row.is_default" class="text-500 italic">Par defaut</span>
                        <span *ngIf="!row.is_default">{{ formatCombinaison(row.combinaison) }}</span>
                    </td>
                    <td>{{ row.reference || '-' }}</td>
                    <td>
                        <p-tag [value]="row.stock + ''"
                               [severity]="row.stock > 10 ? 'success' : row.stock > 0 ? 'warn' : 'danger'"></p-tag>
                    </td>
                    <td>
                        <div class="flex items-center gap-2">
                            <input pInputText type="number" [(ngModel)]="row.editStock"
                                   [min]="0" class="w-6rem" style="text-align:center;" />
                            <button pButton icon="pi pi-check" size="small"
                                    label="Sauvegarder"
                                    [loading]="row.saving"
                                    (click)="saveStock(row)"></button>
                        </div>
                    </td>
                </tr>
            </ng-template>

            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="5" class="text-center p-8">
                        <i class="pi pi-warehouse text-6xl text-400 mb-3 block"></i>
                        <p class="text-600">Aucune variante trouvee</p>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>
    `
})
export class MonStock implements OnInit {

    allRows: StockRow[] = [];
    filteredRows: StockRow[] = [];
    loading = true;

    produitFilterOptions: { label: string; value: string }[] = [];
    selectedFilter: string | null = null;

    constructor(
        private produitService: ProduitService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadStock();
    }

    loadStock() {
        this.loading = true;
        this.produitService.getMyProducts().subscribe({
            next: (produits: any[]) => {
                this.allRows = [];
                for (const produit of produits) {
                    for (const v of (produit.variantes || [])) {
                        this.allRows.push({
                            produitId: produit._id,
                            produitNom: produit.nom_produit,
                            varianteId: v._id,
                            combinaison: v.combinaison || [],
                            is_default: v.is_default,
                            reference: v.reference || '',
                            stock: v.stock || 0,
                            editStock: v.stock || 0,
                            saving: false
                        });
                    }
                }
                this.produitFilterOptions = [
                    ...new Map(produits.map(p => [p._id, { label: p.nom_produit, value: p._id }])).values()
                ];
                this.filteredRows = [...this.allRows];
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }

    applyFilter() {
        if (!this.selectedFilter) {
            this.filteredRows = [...this.allRows];
        } else {
            this.filteredRows = this.allRows.filter(r => r.produitId === this.selectedFilter);
        }
    }

    saveStock(row: StockRow) {
        row.saving = true;
        this.produitService.updateStock(row.produitId, row.varianteId, row.editStock).subscribe({
            next: () => {
                row.stock = row.editStock;
                row.saving = false;
                this.messageService.add({ severity: 'success', summary: 'Succes', detail: `Stock mis a jour (${row.editStock})`, life: 2000 });
            },
            error: () => {
                row.saving = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Mise a jour echouee', life: 3000 });
            }
        });
    }

    formatCombinaison(combinaison: any[]): string {
        if (!combinaison || combinaison.length === 0) return 'Par defaut';
        return combinaison.map((c: any) => `${c.attribut}: ${c.valeur}`).join(' | ');
    }
}
