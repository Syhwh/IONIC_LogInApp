import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-name.validator'
})
export class UsernameValidator {
  static validUsername(fc: FormControl){
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}