export class Equipement {
    constructor(
    public _id: string, // si vous avez besoin d'identifiants MongoDB
    public name: string,
    public quantite: string, // Si vous utilisez une référence à Notification
    )
    {}
}
