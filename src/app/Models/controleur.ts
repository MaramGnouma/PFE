import { Notification } from './notification'; // Importez le modèle de notification si nécessaire

export class Controller {
  constructor(
  public _id: string, // si vous avez besoin d'identifiants MongoDB
  public name: string,
  public notifications: Notification[], // Si vous utilisez une référence à Notification
  public email: string,
  )
  {}
}
