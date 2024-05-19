import { Component, ViewChild } from '@angular/core';
import { AuthTokenService } from 'src/app/services/auth/auth-token.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/shared/models/user.model';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
import { CpfPipe } from 'src/app/shared/pipes/cpf/cpf.pipe';
import { UsersEditComponent } from '../../users-edit/components/users-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @ViewChild("editarPerfil", { static: true })
  editarPerfil: UsersEditComponent;

  public item: any;
  public user: any;
  public confirmPassword: any;

  constructor( private authTokenService: AuthTokenService,
               private profileService: ProfileService) {

    if(authTokenService.getToken != null){
      this.item = authTokenService.decodePayloadJWT();
    }
  }

  ngOnInit() {
    this.getProfile();
  }
  
  getProfile() {
    this.user = new User();
    this.profileService.getProfileId(this.item.sub)
    .subscribe(
      (data: any[]) => {
        this.user = data;
        this.user.telefoneCelular = new TelefonePipe().transform(this.user.telefoneCelular);
        this.user.cpf = new CpfPipe().transform(this.user.cpf);
      }
    )
  }

  onCpfChange(cpf) {
    this.user.cpf = new CpfPipe().transform(cpf);
  }

  onTelefoneChange(telefone) {
    this.user.telefoneCelular = new TelefonePipe().transform(telefone);
  }

  enviar(){
    this.profileService.atualizar(this.user);
  }

  editarUsuario(item: User) {
    this.editarPerfil.showModal(item);
  }
}
