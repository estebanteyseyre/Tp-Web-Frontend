import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected esInicio = true;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.esInicio = this.router.url === '/' || this.router.url === '';
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd))
      .subscribe(() => {
        this.esInicio = this.router.url === '/';
        this.cdr.markForCheck();
      });
  }
}
