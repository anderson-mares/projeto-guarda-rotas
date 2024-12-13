import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sessao } from './sessao.model';
import { Router } from '@angular/router';

const CHAVE_ACCESS_TOKEN = 'auth';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {
  private sessao = new BehaviorSubject<Sessao | null>(null);

  constructor(private router: Router) {
    // Verifica se está no ambiente do navegador antes de tentar restaurar a sessão
    if (this.isBrowser()) {
      this.restaurarSessao();
    }
  }

  // Método para verificar se está no navegador
  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  restaurarSessao() {
    if (!this.isBrowser()) {
      console.warn('SessionStorage não disponível no ambiente atual.');
      return;
    }

    const jsonSessao = sessionStorage.getItem(CHAVE_ACCESS_TOKEN);

    if (!jsonSessao) {
      console.warn('Erro de parâmetros');
      return;
    }

    const dadosSessao: Sessao = JSON.parse(jsonSessao);
    this.sessao.next(dadosSessao);
  }

  salvarSessao(dadosSessao: Sessao) {
    if (!this.isBrowser()) {
      console.warn('SessionStorage não disponível no ambiente atual.');
      return;
    }

    sessionStorage.setItem(CHAVE_ACCESS_TOKEN, JSON.stringify(dadosSessao));
    this.sessao.next(dadosSessao);
  }

  limparSessao() {
    if (!this.isBrowser()) {
      console.warn('SessionStorage não disponível no ambiente atual.');
      return;
    }

    sessionStorage.clear();
    this.sessao.next(null);
  }

  logout() {
    // Limpa a sessão do usuário
    this.limparSessao();

    // Redireciona para a página de login ou página inicial
    this.router.navigate(['/login']);
  }

  getSessao() {
    return this.sessao.asObservable();
  }

  estaLogado() {
    return this.sessao.value !== null;
  }
}