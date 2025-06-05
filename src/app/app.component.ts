import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.addLangs(['en', 'pt']);
    // debugger;

    const path = window.location.pathname;
    const langFromPath = path.startsWith('/pt') ? 'pt' : 'en';
    this.translate.use(langFromPath);
  }
}
