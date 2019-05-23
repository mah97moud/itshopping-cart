import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'itshareShop';
  constructor(
    private userSer: UserService,
    private authSer: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authSer.user$.pipe().subscribe(user => {
      if (user) {
        this.userSer.save(user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
