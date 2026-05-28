import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar.component';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blood-donation-system';

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      first()
    ).subscribe(() => {
      setTimeout(() => this.dismissLoader(), 150);
    });
  }

  private dismissLoader(): void {
    const loader = document.getElementById('ll-loader');
    if (!loader) return;
    loader.classList.add('ll-loader--out');
    document.body.classList.remove('ll-loading');
    setTimeout(() => loader.remove(), 450);
  }

  get showNavbar(): boolean {
    return this.router.url !== '/' && this.router.url !== '';
  }
}
