export enum UserRole {
  SUPERVISEUR = 'Superviseur',
  CONTROLEUR = 'Contrôleur',
  INTERVENANT = 'Intervenant'
}



export class User {
  constructor(
    public name: string,
    public email: string,
    public role: UserRole,
    public status: 'En attente' | 'Accepté',
    public password: string,
    public adresse:string,
    public genre:'female'|'male',
    public dateNaissance:String,
  ) {}
}
