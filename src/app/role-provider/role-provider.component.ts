import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { RoleData } from './roledata';

@Component({
  selector: 'app-role-provider',
  templateUrl: './role-provider.component.html',
  styleUrls: ['./role-provider.component.css']
})
export class RoleProviderComponent implements OnInit,OnDestroy {

  subscription:Subscription | undefined;

  public roleForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    newAdminEmail: new FormControl('')
  });
  constructor(private userService:UserService) { }
  

  onSubmit(){
    this.subscription = this.userService.checkUserRole().subscribe(
      user=>{
        let roleProviderUser = user as RoleData;
        if(user){
          if(roleProviderUser.email == this.roleForm.get('email')?.value && roleProviderUser.password == this.roleForm.get('password')?.value && roleProviderUser.isProvider){
            console.log(roleProviderUser);
            console.log('success'); 
          }else alert('wrong credentials');
          
        }else{
          console.log('unsuccessful');
        }
        
      }
    )
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
