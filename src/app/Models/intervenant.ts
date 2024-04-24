export class Intervenant {
  constructor(
    public _id: string,
    public nom: string,
    public role: string,
    public dateNaissance: Date,
    public lieuNaissance: string,
    public nationalite: string,
    public numeroIdentificationMilitaire: string,
    public adressePersonnelle: string,
    public numeroTelephone: string,
    public etatCivil: string,
    public dateIncorporation: Date,
    public uniteAffectation: string,
    public gradesObtenus: { annee: number, type: string }[],
    public specialisations: string[],
    public competencesSpecifiques: string[],
    public certifications: string[],
    public image:String
  ) {}
}
