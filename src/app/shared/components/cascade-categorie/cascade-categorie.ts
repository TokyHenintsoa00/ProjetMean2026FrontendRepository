import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface CategorieNode {
    id: string;
    nom: string;
    enfants: CategorieNode[];
}

@Component({
    selector: 'app-cascade-categorie',
    standalone: true,
    imports: [CommonModule, FormsModule, SelectModule],
    template: `
    <div class="flex flex-col gap-3">
        <div *ngFor="let level of levels; let i = index" class="flex flex-col gap-2">
            <label class="font-semibold text-900 text-sm">
                {{ i === 0 ? 'Categorie' : 'Sous-categorie ' + i }}
                <span *ngIf="i > 0" class="text-500 font-normal">(optionnel)</span>
            </label>
            <p-select appendTo="body"
                [options]="level.options"
                [(ngModel)]="level.selected"
                optionLabel="nom"
                optionValue="id"
                [placeholder]="i === 0 ? 'Selectionnez une categorie' : 'Selectionnez (optionnel)'"
                [showClear]="i > 0"
                styleClass="w-full"
                (ngModelChange)="onLevelChange(i, $event)">
            </p-select>
        </div>

        <!-- Affichage du chemin selectionne -->
        <div *ngIf="selectedPath.length > 0" class="surface-50 border-round p-2 flex items-center gap-2 flex-wrap">
            <i class="pi pi-tag text-primary text-sm"></i>
            <ng-container *ngFor="let node of selectedPath; let i = index">
                <span class="text-primary font-semibold text-sm">{{ node.nom }}</span>
                <i *ngIf="i < selectedPath.length - 1" class="pi pi-chevron-right text-400 text-xs"></i>
            </ng-container>
        </div>
    </div>
    `
})
export class CascadeCategorie implements OnChanges {
    @Input() tree: CategorieNode[] = [];
    @Input() initialIds: string[] = [];
    @Output() categoriesChange = new EventEmitter<string[]>();

    levels: Array<{ options: CategorieNode[]; selected: string | null }> = [];
    selectedPath: CategorieNode[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['tree'] && this.tree.length > 0) {
            this.initLevels();
        }
    }

    private initLevels() {
        this.levels = [{ options: this.tree, selected: null }];
        this.selectedPath = [];

        // Restaurer la selection initiale si fournie
        if (this.initialIds && this.initialIds.length > 0) {
            this.restoreSelection(this.initialIds);
        }
    }

    private restoreSelection(ids: string[]) {
        let currentNodes = this.tree;
        for (const id of ids) {
            const found = currentNodes.find(n => n.id === id || n.id?.toString() === id?.toString());
            if (!found) break;

            const levelIndex = this.selectedPath.length;
            if (this.levels[levelIndex]) {
                this.levels[levelIndex].selected = found.id;
            }
            this.selectedPath.push(found);

            if (found.enfants && found.enfants.length > 0) {
                currentNodes = found.enfants;
                this.levels.push({ options: found.enfants, selected: null });
            } else {
                break;
            }
        }
        this.emitChange();
    }

    onLevelChange(levelIndex: number, selectedId: string | null) {
        // Supprimer les niveaux inferieurs
        this.levels = this.levels.slice(0, levelIndex + 1);
        this.selectedPath = this.selectedPath.slice(0, levelIndex);

        if (!selectedId) {
            this.levels[levelIndex].selected = null;
            this.emitChange();
            return;
        }

        // Trouver le noeud selectionne
        const node = this.levels[levelIndex].options.find(n => n.id === selectedId || n.id?.toString() === selectedId?.toString());
        if (!node) {
            this.emitChange();
            return;
        }

        this.selectedPath[levelIndex] = node;

        // Si le noeud a des enfants, ajouter un nouveau niveau
        if (node.enfants && node.enfants.length > 0) {
            this.levels.push({ options: node.enfants, selected: null });
        }

        this.emitChange();
    }

    private emitChange() {
        const ids = this.selectedPath.map(n => n.id);
        this.categoriesChange.emit(ids);
    }
}
