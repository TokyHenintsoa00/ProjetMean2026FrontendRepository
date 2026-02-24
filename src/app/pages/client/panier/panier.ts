import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartService, CartItem } from '@/pages/service/cart.service';
import { CommandeService } from '@/pages/service/commande.service';

@Component({
    selector: 'app-panier',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule, InputTextModule, SelectModule, ToastModule],
    providers: [MessageService],
    template: `
<p-toast></p-toast>

<!-- ===== PAGE TITLE ===== -->
<div class="pan-page-title">
    <h1><i class="pi pi-shopping-cart"></i> Mon Panier</h1>
    @if (cartItems.length > 0) {
        <span class="pan-title-count">{{ getTotalItems() }} article{{ getTotalItems() > 1 ? 's' : '' }}</span>
    }
</div>

<!-- ===== EMPTY ===== -->
@if (cartItems.length === 0) {
    <div class="pan-empty">
        <div class="pan-empty-icon-wrap">
            <i class="pi pi-shopping-cart pan-empty-icon"></i>
        </div>
        <h2>Votre panier est vide</h2>
        <p>Parcourez notre catalogue pour trouver des produits qui vous plaisent.</p>
        <button pButton label="Découvrir le catalogue" icon="pi pi-th-large"
                class="pan-empty-btn" (click)="goToCatalogue()"></button>
    </div>
}

<!-- ===== CART BODY ===== -->
@if (cartItems.length > 0) {
    <div class="pan-body">

        <!-- LEFT: Items -->
        <div class="pan-items-col">

            @for (entry of boutiqueEntries; track entry.boutique_id) {
                <div class="pan-boutique-block">
                    <!-- Boutique header -->
                    <div class="pan-boutique-hdr">
                        <div class="pan-boutique-name">
                            <div class="pan-boutique-dot"></div>
                            <i class="pi pi-shop"></i>
                            <span>{{ entry.boutique_nom }}</span>
                        </div>
                        <span class="pan-boutique-count">{{ entry.items.length }} article{{ entry.items.length > 1 ? 's' : '' }}</span>
                    </div>

                    <!-- Items -->
                    @for (item of entry.items; track item.variante_id) {
                        <div class="pan-item">
                            <!-- Image -->
                            <div class="pan-item-img">
                                @if (item.image_url) {
                                    <img [src]="'http://localhost:5000' + item.image_url" [alt]="item.nom_produit" />
                                } @else {
                                    <div class="pan-no-img"><i class="pi pi-image"></i></div>
                                }
                            </div>

                            <!-- Info -->
                            <div class="pan-item-info">
                                <h4 class="pan-item-name">{{ item.nom_produit }}</h4>
                                <div class="pan-item-variant">
                                    <i class="pi pi-tag"></i> {{ item.combinaison_label }}
                                </div>
                                <div class="pan-item-unit">{{ item.prix_unitaire | number:'1.2-2' }} {{ item.devise }} / unité</div>
                            </div>

                            <!-- Qty -->
                            <div class="pan-item-qty-col">
                                <label class="pan-qty-label">Quantité</label>
                                <p-inputNumber [(ngModel)]="item.quantite"
                                               [min]="1" [max]="item.stock_disponible"
                                               [showButtons]="true" buttonLayout="horizontal"
                                               incrementButtonIcon="pi pi-plus"
                                               decrementButtonIcon="pi pi-minus"
                                               styleClass="pan-qty-input"
                                               (onInput)="updateQty(item)"></p-inputNumber>
                            </div>

                            <!-- Subtotal -->
                            <div class="pan-item-subtotal-col">
                                <span class="pan-item-sub">{{ item.prix_unitaire * item.quantite | number:'1.2-2' }} {{ item.devise }}</span>
                            </div>

                            <!-- Delete -->
                            <button class="pan-item-del" (click)="removeItem(item)" title="Supprimer">
                                <i class="pi pi-trash"></i>
                            </button>
                        </div>
                    }

                    <!-- Boutique subtotal -->
                    <div class="pan-boutique-sub">
                        <span class="pan-boutique-sub-label">Sous-total {{ entry.boutique_nom }}</span>
                        <span class="pan-boutique-sub-val">{{ getBoutiqueTotal(entry) | number:'1.2-2' }} {{ getBoutiqueDevise(entry) }}</span>
                    </div>
                </div>
            }

            <!-- Clear cart link -->
            <div class="pan-clear-wrap">
                <button class="pan-clear-btn" (click)="clearCart()">
                    <i class="pi pi-trash"></i> Vider le panier
                </button>
            </div>
        </div>

        <!-- RIGHT: Checkout sidebar -->
        <aside class="pan-sidebar">
            <div class="pan-checkout-card">

                <!-- Order summary -->
                <div class="pan-checkout-title">Récapitulatif</div>

                <div class="pan-recap">
                    @for (entry of boutiqueEntries; track entry.boutique_id) {
                        <div class="pan-recap-row">
                            <span class="pan-recap-label">{{ entry.boutique_nom }}</span>
                            <span class="pan-recap-val">{{ getBoutiqueTotal(entry) | number:'1.2-2' }} {{ getBoutiqueDevise(entry) }}</span>
                        </div>
                    }
                </div>

                <div class="pan-recap-total-row">
                    <span>Total</span>
                    <span class="pan-recap-total-val">{{ getTotal() | number:'1.2-2' }} {{ getGlobalDevise() }}</span>
                </div>

                <!-- Delivery fields -->
                <div class="pan-delivery">
                    <div class="pan-field">
                        <label class="pan-field-label">
                            <i class="pi pi-map-marker"></i> Adresse de livraison
                        </label>
                        <input pInputText [(ngModel)]="adresseLivraison"
                               placeholder="Votre adresse complète..."
                               class="pan-address-input" />
                    </div>

                    <div class="pan-field">
                        <label class="pan-field-label">
                            <i class="pi pi-truck"></i> Mode de retrait
                        </label>
                        <div class="pan-mode-group">
                            <div class="pan-mode-opt"
                                 [class.pan-mode-active]="modeRetrait === 'livraison'"
                                 (click)="modeRetrait = 'livraison'">
                                <i class="pi pi-truck"></i>
                                <span>Livraison</span>
                            </div>
                            <div class="pan-mode-opt"
                                 [class.pan-mode-active]="modeRetrait === 'retrait_boutique'"
                                 (click)="modeRetrait = 'retrait_boutique'">
                                <i class="pi pi-home"></i>
                                <span>Retrait boutique</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CTA -->
                <button class="pan-order-btn" [class.pan-order-loading]="ordering"
                        [disabled]="ordering" (click)="passerCommande()">
                    @if (ordering) {
                        <i class="pi pi-spin pi-spinner"></i> Traitement...
                    } @else {
                        <i class="pi pi-check-circle"></i>
                        Valider la commande ({{ getTotal() | number:'1.2-2' }} {{ getGlobalDevise() }})
                    }
                </button>

                <button class="pan-continue-btn" (click)="goToCatalogue()">
                    <i class="pi pi-arrow-left"></i> Continuer mes achats
                </button>
            </div>

            <!-- Trust badge -->
            <div class="pan-trust">
                <div class="pan-trust-item"><i class="pi pi-shield"></i> Paiement sécurisé</div>
                <div class="pan-trust-item"><i class="pi pi-refresh"></i> Retour facile</div>
                <div class="pan-trust-item"><i class="pi pi-star"></i> Qualité garantie</div>
            </div>
        </aside>
    </div>
}

<style>
/* ── Page title ── */
.pan-page-title {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 1.5rem;
}
.pan-page-title h1 {
    margin: 0; font-size: 1.5rem; font-weight: 800; color: #0f172a;
    display: flex; align-items: center; gap: 0.5rem;
}
.pan-page-title h1 .pi { color: #f59e0b; font-size: 1.3rem; }
.pan-title-count {
    background: #f59e0b; color: #1a1a1a;
    font-size: 0.8rem; font-weight: 700;
    padding: 0.2rem 0.6rem; border-radius: 20px;
}

/* ── Empty ── */
.pan-empty {
    background: white; border-radius: 14px;
    border: 1px solid #e2e8f0; padding: 4rem 2rem;
    text-align: center; max-width: 500px; margin: 0 auto;
}
.pan-empty-icon-wrap {
    width: 80px; height: 80px; border-radius: 50%;
    background: #fef3c7; margin: 0 auto 1.5rem;
    display: flex; align-items: center; justify-content: center;
}
.pan-empty-icon { font-size: 2.5rem; color: #f59e0b; }
.pan-empty h2 { margin: 0 0 0.5rem; color: #0f172a; font-size: 1.25rem; }
.pan-empty p { color: #64748b; margin: 0 0 1.5rem; }
.pan-empty-btn {
    background: #f59e0b !important; border-color: #f59e0b !important;
    color: #1a1a1a !important; font-weight: 700 !important;
}

/* ── Body layout ── */
.pan-body {
    display: flex; gap: 1.5rem; align-items: flex-start;
}
.pan-items-col { flex: 1; min-width: 0; }

/* ── Boutique block ── */
.pan-boutique-block {
    background: white; border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    overflow: hidden; margin-bottom: 1rem;
}
.pan-boutique-hdr {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.75rem 1.25rem; background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}
.pan-boutique-name {
    display: flex; align-items: center; gap: 0.5rem;
    font-weight: 700; color: #0f172a; font-size: 0.92rem;
}
.pan-boutique-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #f59e0b;
}
.pan-boutique-count { font-size: 0.78rem; color: #94a3b8; }

/* ── Cart item ── */
.pan-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;
}
.pan-item:hover { background: #fafbfc; }
.pan-item:last-of-type { border-bottom: none; }

.pan-item-img {
    width: 80px; height: 80px; flex-shrink: 0;
    border-radius: 10px; overflow: hidden;
    background: #f1f5f9; border: 1px solid #e2e8f0;
}
.pan-item-img img { width: 100%; height: 100%; object-fit: cover; }
.pan-no-img {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; color: #cbd5e1;
}

.pan-item-info { flex: 1; min-width: 0; }
.pan-item-name {
    margin: 0 0 0.25rem; font-size: 0.95rem;
    font-weight: 600; color: #1e293b;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pan-item-variant {
    font-size: 0.78rem; color: #7c3aed; margin-bottom: 0.2rem;
    display: flex; align-items: center; gap: 0.25rem;
}
.pan-item-unit { font-size: 0.82rem; color: #64748b; }

.pan-item-qty-col { flex-shrink: 0; }
.pan-qty-label { display: block; font-size: 0.72rem; color: #94a3b8; text-align: center; margin-bottom: 0.3rem; }

.pan-item-subtotal-col { min-width: 90px; text-align: right; flex-shrink: 0; }
.pan-item-sub { font-size: 1rem; font-weight: 700; color: #1e293b; }

.pan-item-del {
    background: none; border: none; cursor: pointer;
    color: #94a3b8; font-size: 1rem; padding: 0.4rem;
    border-radius: 6px; transition: all 0.15s; flex-shrink: 0;
}
.pan-item-del:hover { color: #dc2626; background: #fef2f2; }

/* Boutique subtotal */
.pan-boutique-sub {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.65rem 1.25rem;
    background: #f8fafc; border-top: 1px solid #e2e8f0;
    font-size: 0.88rem;
}
.pan-boutique-sub-label { color: #64748b; }
.pan-boutique-sub-val { font-weight: 700; color: #b45309; }

/* Clear cart */
.pan-clear-wrap { text-align: right; margin-top: 0.25rem; }
.pan-clear-btn {
    background: none; border: none; cursor: pointer;
    color: #dc2626; font-size: 0.82rem;
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.3rem 0.5rem; border-radius: 6px; transition: background 0.15s;
}
.pan-clear-btn:hover { background: #fef2f2; }

/* ── Sidebar ── */
.pan-sidebar { width: 340px; flex-shrink: 0; position: sticky; top: 140px; }
.pan-checkout-card {
    background: white; border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    padding: 1.5rem;
}
.pan-checkout-title {
    font-size: 1rem; font-weight: 800; color: #0f172a;
    margin-bottom: 1rem; padding-bottom: 0.75rem;
    border-bottom: 2px solid #f1f5f9;
}

.pan-recap { margin-bottom: 0.75rem; }
.pan-recap-row {
    display: flex; justify-content: space-between;
    padding: 0.35rem 0; font-size: 0.875rem; color: #475569;
}
.pan-recap-total-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0.75rem 0; border-top: 2px solid #e2e8f0;
    font-weight: 700; color: #0f172a; font-size: 0.95rem;
    margin-bottom: 1rem;
}
.pan-recap-total-val { font-size: 1.4rem; color: #b45309; font-weight: 800; }

/* Delivery */
.pan-delivery { margin-bottom: 1rem; }
.pan-field { margin-bottom: 0.75rem; }
.pan-field-label {
    display: flex; align-items: center; gap: 0.35rem;
    font-size: 0.8rem; font-weight: 700; color: #475569;
    margin-bottom: 0.4rem;
}
.pan-address-input { width: 100% !important; font-size: 0.875rem !important; }
.pan-mode-group { display: flex; gap: 0.5rem; }
.pan-mode-opt {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    gap: 0.3rem; padding: 0.6rem; border-radius: 8px;
    border: 2px solid #e2e8f0; cursor: pointer;
    font-size: 0.78rem; font-weight: 500; color: #64748b;
    transition: all 0.15s;
}
.pan-mode-opt .pi { font-size: 1.1rem; }
.pan-mode-opt:hover { border-color: #f59e0b; color: #0f172a; }
.pan-mode-active { border-color: #f59e0b; background: #fffbeb; color: #92400e !important; font-weight: 700 !important; }

/* Order CTA */
.pan-order-btn {
    width: 100%; padding: 0.95rem; margin-bottom: 0.6rem;
    background: #f59e0b; color: #1a1a1a; border: none;
    border-radius: 10px; font-size: 0.95rem; font-weight: 800;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; gap: 0.5rem;
    box-shadow: 0 3px 10px rgba(245,158,11,0.3);
    transition: background 0.15s, transform 0.1s;
}
.pan-order-btn:hover:not(:disabled) { background: #d97706; transform: translateY(-1px); }
.pan-order-btn:active:not(:disabled) { transform: translateY(0); }
.pan-order-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.pan-order-loading { background: #e2c870 !important; }

.pan-continue-btn {
    width: 100%; padding: 0.65rem;
    background: none; color: #0369a1;
    border: 1.5px solid #bfdbfe; border-radius: 8px;
    font-size: 0.85rem; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    transition: all 0.15s;
}
.pan-continue-btn:hover { background: #f0f9ff; border-color: #0369a1; }

/* Trust badges */
.pan-trust {
    display: flex; justify-content: space-around;
    padding: 0.75rem 0.5rem 0.25rem;
    flex-wrap: wrap; gap: 0.5rem;
}
.pan-trust-item {
    display: flex; align-items: center; gap: 0.3rem;
    font-size: 0.72rem; color: #64748b;
}
.pan-trust-item .pi { color: #16a34a; font-size: 0.85rem; }

/* Responsive */
@media (max-width: 900px) {
    .pan-body { flex-direction: column; }
    .pan-sidebar { width: 100%; position: static; }
    .pan-item { flex-wrap: wrap; }
    .pan-item-subtotal-col { order: 5; width: 100%; text-align: left; margin-top: 0.25rem; }
}
</style>
    `
})
export class Panier implements OnInit {
    cartItems: CartItem[] = [];
    boutiqueEntries: { boutique_id: string, boutique_nom: string, items: CartItem[] }[] = [];
    adresseLivraison = '';
    modeRetrait = 'livraison';
    modeRetraitOptions = [
        { label: 'Livraison', value: 'livraison' },
        { label: 'Retrait en boutique', value: 'retrait_boutique' }
    ];
    ordering = false;

    constructor(
        private cartService: CartService,
        private commandeService: CommandeService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.cartService.cart$.subscribe(items => {
            this.cartItems = items;
            this.groupByBoutique();
        });
    }

    groupByBoutique() {
        const map = this.cartService.getItemsByBoutique();
        this.boutiqueEntries = Array.from(map.entries()).map(([boutique_id, data]) => ({
            boutique_id,
            boutique_nom: data.boutique_nom,
            items: data.items
        }));
    }

    getTotalItems(): number {
        return this.cartItems.reduce((sum, i) => sum + i.quantite, 0);
    }

    getBoutiqueTotal(entry: { items: CartItem[] }): number {
        return entry.items.reduce((sum, i) => sum + i.prix_unitaire * i.quantite, 0);
    }

    updateQty(item: CartItem) {
        this.cartService.updateQuantity(item.produit_id, item.variante_id, item.quantite);
    }

    removeItem(item: CartItem) {
        this.cartService.removeFromCart(item.produit_id, item.variante_id);
    }

    clearCart() {
        this.cartService.clearCart();
    }

    getTotal(): number {
        return this.cartService.getTotal();
    }

    getBoutiqueDevise(entry: { items: CartItem[] }): string {
        return entry.items[0]?.devise || 'DT';
    }

    getGlobalDevise(): string {
        return this.cartItems[0]?.devise || 'DT';
    }

    goToCatalogue() {
        this.router.navigate(['/client/catalogue']);
    }

    passerCommande() {
        if (this.boutiqueEntries.length === 0) return;
        this.ordering = true;
        let completed = 0;
        let errors = 0;
        const total = this.boutiqueEntries.length;

        for (const entry of this.boutiqueEntries) {
            const body = {
                boutique: entry.boutique_id,
                lignes: entry.items.map(item => ({
                    produit: item.produit_id,
                    variante_id: item.variante_id,
                    quantite: item.quantite
                })),
                adresse_livraison: this.adresseLivraison,
                mode_retrait: this.modeRetrait
            };

            this.commandeService.createCommande(body).subscribe({
                next: () => {
                    completed++;
                    if (completed + errors === total) this.onOrdersComplete(completed, errors);
                },
                error: (err) => {
                    errors++;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: err.error?.message || `Erreur commande ${entry.boutique_nom}`
                    });
                    if (completed + errors === total) this.onOrdersComplete(completed, errors);
                }
            });
        }
    }

    private onOrdersComplete(completed: number, errors: number) {
        this.ordering = false;
        if (completed > 0) {
            this.cartService.clearCart();
            this.messageService.add({
                severity: 'success',
                summary: 'Commande passée',
                detail: `${completed} commande(s) créée(s) avec succès`
            });
            setTimeout(() => this.router.navigate(['/client/mes-commandes']), 2000);
        }
    }
}
