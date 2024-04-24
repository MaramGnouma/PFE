import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgetComponent } from '../forget/forget.component';
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private dialog: MatDialog) {}

  openPasswordResetDialog(): void {
    this.dialog.open(ForgetComponent, {
      width: '400px',
    });
  }
}
