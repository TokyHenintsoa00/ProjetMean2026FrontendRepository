import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { NotificationsWidget } from './components/notificationswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RecentSalesWidget } from './components/recentsaleswidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RevenueStreamWidget, NotificationsWidget, BestSellingWidget, RecentSalesWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">

            <!-- Row 1 : KPIs -->
            <app-stats-widget class="contents" />

            <!-- Row 2 : Résumé des ventes + Alertes stock -->
            <div class="col-span-12 xl:col-span-8">
                <app-revenue-stream-widget />
            </div>
            <div class="col-span-12 xl:col-span-4">
                <app-notifications-widget style="height: 100%;" />
            </div>

            <!-- Row 3 : Top produits + Valeur du stock -->
            <div class="col-span-12 xl:col-span-6">
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget />
            </div>

        </div>
    `
})
export class BoutiqueDashboard {}
