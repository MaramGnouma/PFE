import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { ModelService } from '../Services/model.service';
import { UserService } from '../Services/user.service';
import { ForgetComponent } from '../forget/forget.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  userForm!: FormGroup;
  submitted = false;

myScriptElement!:HTMLScriptElement;
  role: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private modalService: ModelService,
    private modalService22: NgbModal,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      password: ['', Validators.required],
      genre: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]]
    });


  }

  get f() { return this.userForm.controls; }

  ValidateEmail = (email: any) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return validRegex.test(email);
  }

  register(): void {
    const dateNaissance = this.userForm.get('dateNaissance')?.value; // Obtenez la date de naissance du formulaire
    const isoDateOfBirth = new Date(dateNaissance).toString(); // Convertissez la date de naissance en ISO 8601
    this.userForm.get('status')?.setValue('En attente');
    console.log('Form invalid:', this.userForm.value);
    if (this.userForm.invalid && this.userForm.get( 'status' )?.value === "") {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement', 'error');
      return;
    }
    // Vérifiez si l'e-mail est valide en utilisant la méthode ValidateEmail
    const email = this.userForm.get('email')?.value;
    if (!this.ValidateEmail(email)) {
      Swal.fire('Erreur', 'Veuillez fournir une adresse e-mail valide', 'error');
      return;
    }


    const user: User = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      role: this.userForm.get('role')?.value,
      status: 'En attente',
      password: this.userForm.get('password')?.value,
      adresse: this.userForm.get('adresse')?.value,
      genre: this.userForm.get('genre')?.value,
      dateNaissance:isoDateOfBirth , // Utilisez la date de naissance convertie
    };


    this.authService.register(user).subscribe(
      (response) => {
        console.log('Inscription réussie', response);
        this.userService.createUser(user).subscribe(
          (response: any) => {
            console.log('Utilisateur enregistré avec succès', response);
            this.userForm.reset();
            this.submitted = false;
            Swal.fire('Succès', 'Utilisateur enregistré avec succès', 'success');
          },
          (error: any) => {
            console.error('Échec de l\'enregistrement de l\'utilisateur', error);
            Swal.fire('Erreur', 'Échec de l\'enregistrement de l\'utilisateur', 'error');
          }
        );
      },
      (error) => {
        console.error('Échec de l\'inscription', error);
        if (error && error.message === 'User with this email already exists') {
          Swal.fire('Erreur', 'Cet email existe déjà. Veuillez choisir un autre email.', 'error');
        }
      }
    );
  }

  openAddSmartwatchModal() {
    const dialogRef = this.dialog.open(ForgetComponent, {
      // Set properties directly in the MatDialogConfig object
      width: '500px', // Set width as an example
      // Other properties if needed
    });  }

  forgotPassword(): void {
    this.modalService.openPasswordResetDialog();
  }

  login(): void {
    const userDetails = { email: this.email, password: this.password };
    this.authService.login(this.email, this.password).subscribe(

      (response) => {
        // Assurez-vous que data est défini avant d'essayer d'accéder à ses propriétés
if (response.data && response.data.name) {
  const userName = response.data.name;
  console.log(userName);
} else {
  console.error("Le nom de l'utilisateur n'est pas disponible");
}

        if (response.status === 'ok' && response.data) {
          localStorage.setItem('token', response.data);
          console.log("Connexion réussie");
          console.log('Connexion réussie', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Vous êtes maintenant connecté.",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem('token', Math.random().toString());
          this.router.navigate(["/"]);

        } else {
          console.error("Réponse de connexion invalide :", response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Votre mot de passe ou votre email est invalide!",
            footer: 'Veuillez vérifier vos informations.'
          });
          this.email = '';
          this.password = '';
        }
      },
      (error: { error: { error: string; }; }) => {
        console.error("Échec de la connexion :", error);
      }
    );
  }


}

