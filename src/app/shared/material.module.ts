import { NgModule } from  '@angular/core';
import { MatSnackBarModule, 
         MatNativeDateModule, 
         MatIconModule, 
         MatButtonModule, 
         MatCheckboxModule, 
         MatToolbarModule, 
         MatCardModule, 
         MatFormFieldModule,
         MatInputModule,
         MatRadioModule,
         MatListModule, 
         MatSidenavModule, 
         MatDialogModule, 
         MatProgressSpinnerModule,
         MatExpansionModule,
         MatMenuModule,
         MatTabsModule
        } from  '@angular/material';
import { FormsModule } from '@angular/forms';
 
@NgModule({
    imports: [
        MatSnackBarModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule, 
        MatToolbarModule,
        FormsModule, 
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule, 
        MatSidenavModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatMenuModule,
        MatTabsModule
    ], 
    exports: [
        MatSnackBarModule,
        MatNativeDateModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule, 
        MatToolbarModule, 
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatMenuModule,
        MatTabsModule
    ] 
}) 
export class MaterialModule { }