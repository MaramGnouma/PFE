import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ControleurService } from 'src/app/Services/controleur.service';
import { EquipementService } from 'src/app/Services/equipement.service';
import { IntervenantService } from 'src/app/Services/intervenant.service';
import { MissionService } from 'src/app/Services/mission.service';
import { NotificationService } from 'src/app/Services/notification.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import Swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatStepper } from '@angular/material/stepper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit,OnInit{
  // Dans votre composant TypeScript
firstFormFilled: boolean = false;

checkFirstFormValidity() {
  this.firstFormFilled = this.firstFormGroup.valid;
}

  model!: NgbDateStruct;
  @ViewChild('inputfield') searchInputElement!: ElementRef<HTMLInputElement>;
  map!: L.Map;
  @ViewChild('stepper') stepper!: MatStepper;

//Déclaration des formulaires
  secondFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  showCheckboxes: boolean = false;
//Déclaration des data
controlleurs!: any[];
  intervenants!: any[];
  equipements!: any[];
  controllersControl: FormControl = new FormControl();

  googleMapSrc: SafeResourceUrl | string = '';
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};
  @ViewChild('selectBtn') selectBtn!: ElementRef;
  @ViewChild('items') items!: ElementRef[];
  minDate!: NgbDateStruct; // Définir le type de la date minimale

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private controleurservice: ControleurService,
    private intervenantservice:IntervenantService ,
    private equipemntservice:EquipementService,
    private missionservice:MissionService,
    private notifService:NotificationService,
    private elementRef: ElementRef, private renderer: Renderer2,
    private router: Router,


  ) {
  }


  ngOnInit(): void {
    this.minDate = this.getToday();
    this.initializeFormGroups();
    this.intervenantservice.getAllintervenat().subscribe(data => {
      this.intervenants = data;
    });
    this.controleurservice.getControllers().subscribe(data => {
      this.controlleurs = data;
    });
    this.equipemntservice.getEquipements().subscribe(data => {
      this.equipements = data;
    });
  }
  private getToday(): NgbDateStruct {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.initAutocomplete();
  }

  initializeFormGroups(): void {
    this.firstFormGroup = this._formBuilder.group({
      nomMission: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      missionType: ['', Validators.required],
      objectif: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      date: [null, Validators.required],
      adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    }),
    this.secondFormGroup = this._formBuilder.group({
      controllers: [null, Validators.required],
    }),
    this.thirdFormGroup = this._formBuilder.group({
      intervenantsType: [null, Validators.required],
    }),
    this.fourthFormGroup= this._formBuilder.group({
      Equipement: [null, Validators.required],
      check: [false, Validators.required],
      quantite: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]]

    });
  }


  toggleDropdown(): void {
    const selectBtn = this.elementRef.nativeElement.querySelector('.select-btn');
    const items = this.elementRef.nativeElement.querySelectorAll('.item');

    this.renderer.addClass(selectBtn, 'open');

    items.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');

        const checkedItems = this.elementRef.nativeElement.querySelectorAll('.checked');
        const btnText = this.elementRef.nativeElement.querySelector('.btn-text');

        if (checkedItems && checkedItems.length > 0) {
          btnText.innerText = `${checkedItems.length} Selected`;
          console.log(btnText.innerText);

          // Ajoutez une console pour récupérer les valeurs sélectionnées
          checkedItems.forEach((checkedItem: HTMLElement) => {
            console.log('Valeur sélectionnée:', checkedItem.innerText);
          });
        } else {
          btnText.innerText = 'Sélectionner les contrôleurs';
        }
      });
    });

    // Supprimer la classe 'checked' des éléments au démarrage
    items.forEach((item: HTMLElement) => {
      item.classList.remove('checked');
    });
  }


  toggleDropdown2(): void {
    const selectBtn = this.elementRef.nativeElement.querySelector('.select-btn2');
    const items = this.elementRef.nativeElement.querySelectorAll('.item2');

    this.renderer.addClass(selectBtn, 'open');

    items.forEach((item: HTMLElement) => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked2'); // Utiliser 'checked2' pour la deuxième étape

        const checkedItems = this.elementRef.nativeElement.querySelectorAll('.checked2');
        const btnText = this.elementRef.nativeElement.querySelector('.btn-text2');

        if (checkedItems && checkedItems.length > 0) {
          btnText.innerText = `${checkedItems.length} Selected`;

        } else {
          btnText.innerText = 'Sélectionner les intervenants';
        }
      });
    });

    // Supprimer la classe 'checked2' des éléments au démarrage
    items.forEach((item: HTMLElement) => {
      item.classList.remove('checked2');
    });
  }

  errorMessages = {
    nomMission: [
      { type: 'required', message: 'Le nom de la mission est requis' },
      { type: 'pattern', message: 'Le nom de la mission doit contenir uniquement des caractères alphabétiques et numériques' }
    ],
    missionType: [
      { type: 'required', message: 'Le type de mission est requis' }
    ],
    objectif: [
      { type: 'required', message: 'L\'objectif est requis' },
      { type: 'pattern', message: 'L\'objectif doit contenir uniquement des caractères alphabétiques et numériques' }
    ],
    adresse: [
      { type: 'required', message: 'L\'adresse est requise' },
      { type: 'pattern', message: 'L\'adresse doit contenir uniquement des caractères alphabétiques et numériques' }
    ],
    date: [
      { type: 'required', message: 'La date de la mission est requise' }
    ]
  };

  initMap(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 13);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxNativeZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const marker = L.marker([36.8065, 10.1815]).addTo(this.map)
      .bindPopup('<b>Tunis</b><br />').openPopup();
  }

  initAutocomplete(): void {
    const searchInput = this.searchInputElement.nativeElement;
    searchInput.addEventListener('blur', () => {
      const address = searchInput.value;
      this.searchAddress(address);
      console.log(address)

    });
  }

  displayRoute(startCoords: number[], endCoords: number[]): void {
    const control = L.Routing.control({
      waypoints: [
        L.latLng(startCoords[0], startCoords[1]),
        L.latLng(endCoords[0], endCoords[1])
      ],
      routeWhileDragging: true,
      show: false,
      lineOptions: {
        styles: [{ color: '#0078FF', opacity: 1, weight: 6 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10000
      }
    });

    control.addTo(this.map);
  }

  searchAddress(address: string): void {
    this.http.get<any>(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`).subscribe(
      (response) => {
        if (response && response.length > 0) {
          const result = response[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          navigator.geolocation.getCurrentPosition((position) => {
            const startLat = position.coords.latitude;
            const startLon = position.coords.longitude;
            this.displayRoute([startLat, startLon], [lat, lon]);
          });
        }
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }

 /* toggleCheckboxes(): void {
    const selectedOptions = this.thirdFormGroup.get('intervenantsType')?.value;
    this.showCheckboxes = selectedOptions != null && selectedOptions.length > 0;
  }*/
  selectedControllers: any[] = [];
  selectedIntervenants: any[] = [];

  onSelect(event: any): void {
    // Obtenez la valeur sélectionnée à partir de l'événement
    const selectedValue = event.target.value;

    // Vérifiez si une valeur a été sélectionnée
    if (selectedValue) {
      // Ajoutez la valeur sélectionnée au tableau selectedControllers
      this.selectedControllers.push(selectedValue);

      // Affichez la valeur sélectionnée dans la console
      console.log('Selected Controllers:');
      console.log(this.selectedControllers);
    } else {
      // Gérez le cas où aucune valeur n'est sélectionnée
    }
  }

  onSelect2(event: any): void {
    // Obtenez la valeur sélectionnée à partir de l'événement
    const selectedValue = event.target.value;

    // Vérifiez si une valeur a été sélectionnée
    if (selectedValue) {
      // Ajoutez la valeur sélectionnée au tableau selectedIntervenants
      this.selectedIntervenants.push(selectedValue);

      // Affichez la valeur sélectionnée dans la console
      console.log('Selected Intervenants:');
      console.log(this.selectedIntervenants);
    } else {
      // Gérez le cas où aucune valeur n'est sélectionnée
    }
  }
  selectedEquipements: any[] = [];

  onSelect3(event: any, equipementId: string): void {
    // Obtenez la valeur de la quantité utilisée à partir de l'événement
    const quantiteUtilisee = parseInt(event.target.value, 10);

    // Vérifiez si une valeur de quantité a été spécifiée
    if (quantiteUtilisee) {
      // Ajoutez l'équipement sélectionné avec sa quantité au tableau selectedEquipements
      this.selectedEquipements.push({
        equipementId: equipementId,
        quantiteUtilisee: quantiteUtilisee
      });

      // Affichez les équipements sélectionnés avec leurs quantités dans la console
      console.log('Selected Equipements:');
      console.log(this.selectedEquipements);
    } else {
      // Gérez le cas où aucune quantité n'est spécifiée
    }
}



  // Ajoutez une propriété pour contrôler l'état du pop-up
missionCreated: boolean = true;
blurBackground: boolean = false;

createMission(): void {
  this.blurBackground = true;
  // Récupérer les valeurs des formulaires
  const nomMission = this.firstFormGroup.get('nomMission')?.value;
  const missionType = this.firstFormGroup.get('missionType')?.value;
  const objectif = this.firstFormGroup.get('objectif')?.value;
  const date = this.firstFormGroup.get('date')?.value;
  const adresse = this.firstFormGroup.get('adresse')?.value;
  const checkControl = this.fourthFormGroup.get('check');

  // Vérifier si la case est cochée ou non
  if (checkControl) {
    const checkValue = checkControl.value === true;

    // Si la case n'est pas cochée, afficher un message d'erreur et arrêter l'exécution
    if (!checkValue) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez sélectionner au moins un équipement ou cocher la case',
      });
      return;
    }
  }

  // Vérifier si des contrôleurs et intervenants ont été sélectionnés
  if (this.selectedControllers.length > 0 && this.selectedIntervenants.length > 0) {
    // Créer l'objet de données de la mission
    const missionData = {
      name: nomMission,
      typemission: missionType,
      objectif: objectif,
      datedebut: new Date(date.year, date.month - 1, date.day),
      adresse: adresse,
      controllers: this.selectedControllers,
      intervenants: this.selectedIntervenants,
      equipements: this.selectedEquipements
    };

    // Appeler le service pour créer la mission
    this.missionservice.createMission(missionData).subscribe(
      (response) => {
        console.log('Mission créée avec succès :', response);
        // Afficher SweetAlert de succès
        Swal.fire({
          title: 'Succès!',
          text: 'Mission créée avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Recharger la page si l'utilisateur clique sur le bouton "OK"
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

        // Fermer le popup
        this.missionCreated = false;
        // Réinitialiser les formulaires et les sélections
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.fourthFormGroup.reset();
        this.fourthFormGroup.get('check')?.reset();
        this.selectedControllers = [];
      },
      (error) => {
        console.error('Erreur lors de la création de la mission :', error);
      }
    );

  } else {
    console.error('Erreur: aucun contrôleur ou intervenant sélectionné.');
  }
}


checkFirstStep(): boolean {
  const firstFormValid = this.firstFormGroup.valid;

  if (!firstFormValid) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Vous devez remplir tous les champs du premier formulaire',
    });
  }

  return firstFormValid;
}

checkSecondStep(): boolean {
  const secondFormValid = this.selectedControllers.length > 0;
  if (!secondFormValid) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Vous devez remplir tous les champs du deuxième formulaire',
    });
  }

  return secondFormValid;
}
checkThirdStep(): boolean {
  const thirdFormGroup = this.thirdFormGroup.valid;

  if (!thirdFormGroup) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Vous devez remplir tous les champs du troisiéme formulaire',
    });
  }

  return thirdFormGroup;
}



advanceToNextStep(stepper: MatStepper): void {
  const currentStepIndex = stepper.selectedIndex;

  switch (currentStepIndex) {
    case 0:
      if (this.checkFirstStep()) {
        stepper.next();
      }
      break;
    case 1:
      if (this.checkSecondStep()) {
        stepper.next();
      }
      break;
    case 2:
      if (this.checkThirdStep()) {
        stepper.next();
      }
      break;

    default:
      break;
  }
}




}

