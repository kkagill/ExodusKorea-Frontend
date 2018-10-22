import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
   selector: 'home',
   templateUrl: './home.component.html'
})

export class HomeComponent {

    public constructor(private router: Router, 
                       public http: HttpClient, 
                       private authService: AuthService) { } 
    
       // provide local page the user's logged in status (do we have a token or not)
       public isLoggedIn(): boolean {
           return this.authService.isAuthenticated();
       }
    
       // tell the server that the user wants to logout; clears token from server, then calls auth.service to clear token locally in browser
    //    public logout() {
    //        this.http.get('http://localhost:51089/connect/logout', { headers: this.authService.authJsonHeaders() })
    //            .subscribe(response => {
    //                // clear token in browser
    //                this.authService.logout();
    //                // return to 'login' page
    //                this.router.navigate(['login']);
    //            },
    //            error => {
    //                // failed; TODO: add some nice toast / error handling
    //                alert(error.text());
    //                console.log(error.text());
    //            }
    //            );
    //    }    
}