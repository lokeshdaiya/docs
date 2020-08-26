import { Component } from '@angular/core';
import { saveDocument, loadDocument } from './app.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  onClickSave() {
    saveDocument();
    console.log('hi');
  }
  onClickLoad() {
    loadDocument();
    console.log('saveDocument:any[]');
  }
}
