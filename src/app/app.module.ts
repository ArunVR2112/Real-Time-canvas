import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component'; // Update the path

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent, // Make sure CanvasComponent is declared here
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
