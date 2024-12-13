import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Sessao } from './auth/sessao.model';
import { SessaoService } from './auth/sessao.service';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projeto-rotas-guard';

  sessao$: Observable<Sessao | null>;

  constructor(private sessaoService: SessaoService) {
    this.sessao$ = this.sessaoService.getSessao();
  }

  logout() {
    this.sessaoService.limparSessao();
  }
}

