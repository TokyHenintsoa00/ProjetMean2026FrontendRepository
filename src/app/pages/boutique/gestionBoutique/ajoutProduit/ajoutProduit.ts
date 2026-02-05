import { Component } from "@angular/core";
import { BestSellingWidget } from "../../dashboard/components/bestsellingwidget";
import { NotificationsWidget } from "../../dashboard/components/notificationswidget";
import { RecentSalesWidget } from "../../dashboard/components/recentsaleswidget";
import { RevenueStreamWidget } from "../../dashboard/components/revenuestreamwidget";
import { StatsWidget } from "../../dashboard/components/statswidget";
import { MessageService } from "primeng/api";
import { UserService } from "@/pages/service/user.service";
import { Router } from "@angular/router";
import { BoutiqueService } from "@/pages/service/boutique.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { FileUploadModule } from "primeng/fileupload";
import { FluidModule } from "primeng/fluid";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";

@Component({

    selector: 'app-ajoutProduit',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        FluidModule,
        TextareaModule,
        FileUploadModule,
        DatePickerModule
    ],
    template:`<p-fluid>
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/1 ">
            <div class="card flex flex-col gap-6 shadow-2 border-round-xl">
                <div class="font-semibold text-xl text-primary">
                    Ajouter un produit dans votre boutique
                </div>
                
                <form (ngSubmit) = "addRdv()">
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name" class="font-medium">Nom du produit</label>
                            <input pInputText id="name" type="text" [(ngModel)] = "newRdv.nomClient" [ngModelOptions]="{standalone: true}" placeholder="Enter your name" />
                        </div>

                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="email" class="font-medium">Categorie produit</label>
                            <input pInputText id="email" type="email" [(ngModel)] = "newRdv.emailClient" [ngModelOptions]="{standalone: true}" placeholder="Enter your email" />
                        </div>
                    </div>

                    <div>
                    <br>
                    <div class="flex flex-wrap gap-6">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name" class="font-medium">Prix hors taxe</label>
                            <input pInputText id="nom" type="text" [(ngModel)] = "newRdv.modelVoiture" [ngModelOptions]="{standalone: true}" placeholder="Constructeur-XXX-XXX" class="w-full md:w-120 mb-8"/>
                        </div>

                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name" class="font-medium">Stock</label>
                            <input pInputText id="nom" type="text" [(ngModel)] = "newRdv.modelVoiture" [ngModelOptions]="{standalone: true}" placeholder="Constructeur-XXX-XXX" class="w-full md:w-120 mb-8"/>
                        </div>
                        
                    </div>
                        <label for="name" class="font-medium">Description du produit</label>
                        <textarea
                            pInputTextarea
                            id="description"
                            [(ngModel)] = "newRdv.problemeVoiture"
                            [ngModelOptions]="{standalone: true}"
                            rows="4"
                            placeholder="Dscription du probleme de voiture"
                            class="w-full md:w-120 mb-8">
                        </textarea>
        
                        <label class="font-medium">Photo de votre voiture</label>

                        <p-fileupload
                            (onSelect)="onFileSelected($event)"
                            type = "file"
                            [ngModelOptions]="{standalone: true}"
                            [(ngModel)] = "newRdv.photoVoiture"
                            [multiple]="true"
                            accept="image/*"
                            maxFileSize="100000000"
                            mode="advanced"
                            url="https://www.primefaces.org/cdn/api/upload.php"
                            class="w-full">
                            <ng-template #empty>
                                <div class="text-center p-4">
                                    Glissez-déposez les fichiers ici
                                </div>
                            </ng-template>
                        </p-fileupload>
                    </div>
                    <br>
                    <!-- Button -->
                    <div class="flex justify-end pt-2">
                        <button pButton label="Submit" icon="pi pi-check"></button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</p-fluid>`,
providers: [MessageService]
})
export class AjoutProduit{

        constructor(private userservice:UserService , private boutiqueService:BoutiqueService,private router:Router){};


    //newRdv = {nomClient:'',emailClient:'',modelVoiture:'',problemeVoiture:'',photoVoiture:[] as File[]};
    newRdv = {
        nomClient: null as string|null,
        emailClient:'',
        modelVoiture:'',
        dateRdv: null as Date|null,
        dateRdvDispo:null,
        problemeVoiture:'',
        photoVoiture:[] as File[]
    };
    
  
    // minDate!: Date ; // Date minimale => now aujourd'hui
    
    // ngOnInit() {
    //     this.minDate = new Date();
    // }

    
    onFileSelected(event:any){

        try 
        {
            let getFile = event.files;
            console.log(getFile);
            //  let newGetfile;
            //  newGetfile = this.newRdv.photoVoiture = Array.from(getFile);
            // console.log(newGetfile);
            for (let i = 0; i <= getFile.length-1; i++) {
                this.newRdv.photoVoiture.push(getFile[i]);
                console.log(getFile[i]);      
            };
        } catch (error) {
            console.error(error);   
        }
       
    }
    
    addRdv(){
        
        console.log("click btn");
        try 
        {
            const date_Rendez_vous = this.newRdv.dateRdv;
            const problemeVoiture = this.newRdv.problemeVoiture;
            if (date_Rendez_vous !=null && date_Rendez_vous < new Date) {
                alert("la date ne doit pas etre moin que adj");
                console.log("error");  
            }
            this.createRdvWithVoitureProblem(problemeVoiture);  
            
        } catch (error) {
            console.error(error);    
        }
        
    }

    // with no probleme voiture
    private createRdvWithVoitureProblem(problemeVoiture:String):void
    {
        const rdv = {
                        
            nom_client:this.newRdv.nomClient,
            email_client:this.newRdv.emailClient,
            model_voiture:this.newRdv.modelVoiture,
            probleme_voiture:this.newRdv.problemeVoiture,
            date_rendez_vous:this.newRdv.dateRdv,
            date_rendez_vous_disponible:null,
            photo_voiture:this.newRdv.photoVoiture
            
        }
        this.boutiqueService.getBoutiques().subscribe({
            next:(res) =>{
                console.log("mety");
                this.resetForm();
                location.reload();
                //this.router.navigate(['/homePage/homeClient/rdvClient']);
               
            },
            error: (err) => {
                console.error('Erreur lors de la création du rendez-vous:', err);
                alert('Erreur lors de la création du rendez-vous');
            }
        });
    }   

    

    private resetForm(): void {
        this.newRdv = {
           nomClient: null as string|null,
            emailClient:'',
            modelVoiture:'',
            dateRdv: null as Date|null,
            dateRdvDispo:null,
            problemeVoiture:'',
            photoVoiture:[] as File[]
        };
    }
 
    addRdvProblem()
    {
        
    }

}