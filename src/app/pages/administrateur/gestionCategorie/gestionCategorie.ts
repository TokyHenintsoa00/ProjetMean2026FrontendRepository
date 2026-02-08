import { Component, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategorieService } from '@/pages/service/categorie.service';
import { Categorie } from '@/pages/service/categorie.interface';

@Component({
    selector: 'app-gestionCategorie',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        SelectModule,
        DialogModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-toast></p-toast>
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Nouvelle categorie" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
            </ng-template>
        </p-toolbar>

        <p-table
            [value]="categories()"
            [rows]="10"
            [paginator]="true"
            [globalFilterFields]="['nom']"
            [tableStyle]="{ 'min-width': '50rem' }"
            [rowHover]="true"
            dataKey="_id"
            currentPageReportTemplate="Affichage de {first} a {last} sur {totalRecords} categories"
            [showCurrentPageReport]="true"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Gestion des categories</h5>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th pSortableColumn="nom" style="min-width:16rem">
                        Nom <p-sortIcon field="nom" />
                    </th>
                    <th style="min-width:16rem">Parent</th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-cat>
                <tr>
                    <td>{{ cat.nom }}</td>
                    <td>{{ cat.parent ? cat.parent.nom : '-- Racine --' }}</td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="editCategorie(cat)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (onClick)="deleteCategorie(cat)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="categorieDialog" [style]="{ width: '450px' }" header="Detail categorie" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="nom" class="block font-bold mb-3">Nom</label>
                        <input type="text" pInputText id="nom" [(ngModel)]="categorie.nom" required autofocus class="w-full" />
                        <small class="text-red-500" *ngIf="submitted && !categorie.nom">Le nom est requis.</small>
                    </div>
                    <div>
                        <label for="parent" class="block font-bold mb-3">Categorie parent</label>
                        <p-select
                            [(ngModel)]="categorie.parent"
                            inputId="parent"
                            [options]="parentOptions"
                            optionLabel="name"
                            optionValue="value"
                            placeholder="Aucun (racine)"
                            [showClear]="true"
                            styleClass="w-full" />
                    </div>
                </div>
            </ng-template>
            <ng-template #footer>
                <p-button label="Annuler" icon="pi pi-times" text (onClick)="hideDialog()" />
                <p-button label="Enregistrer" icon="pi pi-check" (onClick)="saveCategorie()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, ConfirmationService]
})
export class GestionCategorie implements OnInit {
    categorieDialog: boolean = false;
    categories = signal<Categorie[]>([]);
    categorie: Categorie = { nom: '', parent: null };
    submitted: boolean = false;
    isEdit: boolean = false;
    parentOptions: any[] = [];

    constructor(
        private categorieService: CategorieService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.categorieService.getAllCategorie().subscribe({
            next: (data) => {
                this.categories.set(data);
                this.parentOptions = data.map((cat: any) => ({
                    name: cat.nom,
                    value: cat._id
                }));
            },
            error: (error) => {
                console.error('Erreur chargement categories:', error);
            }
        });
    }

    openNew() {
        this.categorie = { nom: '', parent: null };
        this.submitted = false;
        this.isEdit = false;
        this.categorieDialog = true;
    }

    editCategorie(cat: Categorie) {
        this.categorie = { ...cat, parent: cat.parent ? (cat.parent as Categorie)._id : null };
        this.isEdit = true;
        this.categorieDialog = true;
    }

    deleteCategorie(cat: Categorie) {
        this.confirmationService.confirm({
            message: 'Etes-vous sur de vouloir supprimer ' + cat.nom + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categorieService.deleteCategorie(cat._id!).subscribe({
                    next: () => {
                        this.loadCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succes',
                            detail: 'Categorie supprimee',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    hideDialog() {
        this.categorieDialog = false;
        this.submitted = false;
    }

    saveCategorie() {
        this.submitted = true;
        if (this.categorie.nom?.trim()) {
            const payload: any = {
                nom: this.categorie.nom,
                parent: this.categorie.parent || null
            };

            if (this.isEdit && this.categorie._id) {
                this.categorieService.updateCategorie(this.categorie._id, payload).subscribe({
                    next: () => {
                        this.loadCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succes',
                            detail: 'Categorie mise a jour',
                            life: 3000
                        });
                    }
                });
            } else {
                this.categorieService.createCategorie(payload).subscribe({
                    next: () => {
                        this.loadCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succes',
                            detail: 'Categorie creee',
                            life: 3000
                        });
                    }
                });
            }
            this.categorieDialog = false;
            this.categorie = { nom: '', parent: null };
        }
    }
}
