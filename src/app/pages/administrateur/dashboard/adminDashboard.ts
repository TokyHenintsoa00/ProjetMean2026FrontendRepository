import { BestSellingWidget } from "@/pages/dashboard/components/bestsellingwidget";
import { NotificationsWidget } from "@/pages/dashboard/components/notificationswidget";
import { RecentSalesWidget } from "@/pages/dashboard/components/recentsaleswidget";
import { RevenueStreamWidget } from "@/pages/dashboard/components/revenuestreamwidget";
import { StatsWidget } from "@/pages/dashboard/components/statswidget";
import { Component } from "@angular/core";


@Component({
selector: 'app-adminDashboard',
imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
template:``

})
export class AdminDashboard{

}