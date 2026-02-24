import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
    produit_id: string;
    variante_id: string;
    boutique_id: string;
    boutique_nom: string;
    nom_produit: string;
    combinaison_label: string;
    prix_unitaire: number;
    devise: string;
    quantite: number;
    image_url: string;
    stock_disponible: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private storageKey = 'cart_items';
    private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
    cart$ = this.cartSubject.asObservable();

    private loadFromStorage(): CartItem[] {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    }

    private save(items: CartItem[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        this.cartSubject.next(items);
    }

    getItems(): CartItem[] {
        return this.cartSubject.value;
    }

    addToCart(item: CartItem) {
        const items = this.getItems();
        const existing = items.find(i => i.produit_id === item.produit_id && i.variante_id === item.variante_id);
        if (existing) {
            existing.quantite += item.quantite;
            if (existing.quantite > existing.stock_disponible) {
                existing.quantite = existing.stock_disponible;
            }
        } else {
            items.push({ ...item });
        }
        this.save(items);
    }

    removeFromCart(produit_id: string, variante_id: string) {
        const items = this.getItems().filter(i => !(i.produit_id === produit_id && i.variante_id === variante_id));
        this.save(items);
    }

    updateQuantity(produit_id: string, variante_id: string, quantite: number) {
        const items = this.getItems();
        const item = items.find(i => i.produit_id === produit_id && i.variante_id === variante_id);
        if (item) {
            item.quantite = Math.max(1, Math.min(quantite, item.stock_disponible));
        }
        this.save(items);
    }

    clearCart() {
        this.save([]);
    }

    getTotal(): number {
        return this.getItems().reduce((sum, item) => sum + item.prix_unitaire * item.quantite, 0);
    }

    getCartCount(): number {
        return this.getItems().reduce((sum, item) => sum + item.quantite, 0);
    }

    getItemsByBoutique(): Map<string, { boutique_nom: string, items: CartItem[] }> {
        const map = new Map<string, { boutique_nom: string, items: CartItem[] }>();
        for (const item of this.getItems()) {
            if (!map.has(item.boutique_id)) {
                map.set(item.boutique_id, { boutique_nom: item.boutique_nom, items: [] });
            }
            map.get(item.boutique_id)!.items.push(item);
        }
        return map;
    }
}
