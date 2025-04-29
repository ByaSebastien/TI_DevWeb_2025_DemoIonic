import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {TaskModel} from "../../models/task.model";
import {addIcons} from "ionicons";
import {checkmark, add, closeOutline, trash} from "ionicons/icons";
import {ActionSheetController, AlertController} from "@ionic/angular";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonList, IonIcon, IonInput, IonButton]
})
export class TodoPage {

  private readonly _asController: ActionSheetController = inject(ActionSheetController);
  private readonly _alertController: AlertController = inject(AlertController);

  taskName: string = '';
  tasks: TaskModel[] = [
    {name: "Faire la vaisselle", checked: true},
    {name: "Profiter du soleil", checked: false},
    {name: "Manger", checked: false},
  ];

  constructor() {
    addIcons({checkmark, add, closeOutline, trash})
  }

  addTask() {
    if (!this.taskName.trim()) {
      return;
    }
    this.tasks = [...this.tasks, {name: this.taskName, checked: false}];
    this.taskName = '';
  }

  async displayAction(task: TaskModel) {
    const as = await this._asController.create({
      header: 'Actions',
      buttons: [
        {
          text: task.checked ? 'Invalider' : 'Valider',
          icon: task.checked ? closeOutline : checkmark,
          handler: () => {
            task.checked = !task.checked;
            as.dismiss();
          },
        },
        {
          text: 'Supprimer',
          icon: trash,
          handler: async () => {
            const alert = await this._alertController.create({
              header: 'Confirmation',
              buttons: [
                {
                  text: 'Annuler',
                },
                {
                  text: 'Confirmer',
                  handler: () => {
                    this.tasks = this.tasks.filter(t => t !== task);
                  },
                },
              ],
            });
            await alert.present();
          },
        },
        {
          text: 'Annuler',
          icon: closeOutline,
        },
      ],
    });
    await as.present();
  }
}
