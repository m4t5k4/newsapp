import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../app/core/service/theme.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../core/service/account.service';
import { User } from 'src/app/data/schema/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public repoUrl = 'https://github.com/m4t5k4';
  public isDarkTheme$: Observable<boolean>;
  user: User;

  navItems = [
    { link: '/dashboard', title: 'Home' },
    { link: '/write', title: 'Mijn Artikels' },
    { link: '/users', title: 'Gebruikers'},
    { link: '/review', title: 'Review'},
    { link: '/tags', title: 'Tags'}
  ];
  
  constructor(
    private themeService: ThemeService,
    private accountService: AccountService
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  toggleTheme (checked: boolean) {
    this.themeService.setDarkTheme(checked);
    console.log(checked);
  }

  logout() {
    this.accountService.logout();
  }

}
