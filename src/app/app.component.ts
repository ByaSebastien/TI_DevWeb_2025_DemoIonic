import { Component } from '@angular/core';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {home, scan, bookOutline} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink],
})
export class AppComponent {
  constructor() {
    addIcons({home, scan, bookOutline});
  }
}
