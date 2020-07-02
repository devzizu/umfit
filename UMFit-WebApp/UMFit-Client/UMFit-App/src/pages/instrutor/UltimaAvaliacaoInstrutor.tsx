
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import React from "react";
import { Pie } from "react-chartjs-2";
import { getLastAvaliacao } from "../../models/API/EvolucaoAPI";
import { getAllClients } from "../../models/API/UserAPI";
import "../css/UltimaAvaliacaoInstrutor.css";

var magro = require("../../imgs/avaliacao/magro.png") 
var normal = require("../../imgs/avaliacao/normal.png") 
var acima_do_peso = require("../../imgs/avaliacao/acima_do_peso.png")
var obeso = require("../../imgs/avaliacao/obeso.png")
var obesidade_morbida = require("../../imgs/avaliacao/obesidade_morbida.png")

var pieGraphSettings = {
	labels: [],
	datasets: [{ data: [], backgroundColor: [],
        hoverBackgroundColor: [] 
        }]}
    
interface Avaliacao{
    
        data: string
        cliente_nome: string
        cliente_email: string
        composicao_corporal : Composicao_corporal
        perimetros : Perimetros
        comentario:string
    }
interface Composicao_corporal{
        altura: number
        peso: number
        idade_metabolica: number
        imc: number
        massa_gorda: number
        massa_magra: number
    }
interface Perimetros{
        
        cintura: number
        abdomen: number
        ombro: number
        torax: number
        braço_dir: number
        braço_esq: number
        coxa_dir: number
        coxa_esq: number
        gemeo_dir: number
        gemeo_esq: number
        antebraço_dir: number
        antebraço_esq: number
}
        
const avalicao_inicial: Avaliacao = {data: "s/ seleção", cliente_email: "s/ seleção", cliente_nome: "s/ seleção", 
                                    composicao_corporal :{altura: 0, peso: 0, idade_metabolica: 0, imc: 0, massa_gorda: 0, massa_magra:0},
                                    perimetros: {cintura: 0, abdomen: 0, ombro: 0, torax: 0, braço_dir: 0, braço_esq: 0, coxa_dir: 0, coxa_esq: 0, gemeo_dir: 0, gemeo_esq: 0, antebraço_dir: 0, antebraço_esq: 0},
                                    comentario: ""}

class UltimaAvaliacaoInstrutor extends React.Component<any>{

    state: {
        
        avaliacao: Avaliacao

        lista_mails_inicial: Array<string>
        mail_inserido: string

        user_mail: string
        user_nome: string

        massa_gorda_img: any
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            avaliacao: avalicao_inicial,

            lista_mails_inicial: new Array<string>(),
            mail_inserido: "",
    
            user_mail: "",
            user_nome: "",
            massa_gorda_img: magro
        }        
    }

   async componentDidMount(){
        var ems =  await getAllClients();
        ems.json().then(
            (data)=>{
               this.setState({lista_mails_inicial : data.users})
            }
        )
    

    }

    stringMassaGorda(){

        if(this.state.avaliacao.composicao_corporal.imc < 18.5){
            return "Magro"
             
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 18.5 &&  this.state.avaliacao.composicao_corporal.imc < 25){
            return "Normal"
             
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 25 &&  this.state.avaliacao.composicao_corporal.imc < 30){
            return "Acima do Peso"
              
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 30 &&  this.state.avaliacao.composicao_corporal.imc < 35){
            return "Obeso"
             
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 35){
            return "Obesidade Morbida"
             
        }
    } 

    imgMassaGorda(){

        if(this.state.avaliacao.composicao_corporal.imc < 18.5){
            this.setState({massa_gorda_img:magro});
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 18.5 &&  this.state.avaliacao.composicao_corporal.imc < 25){
            this.setState({massa_gorda_img:normal});
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 25 &&  this.state.avaliacao.composicao_corporal.imc < 30){
            this.setState({massa_gorda_img:acima_do_peso});
        }
        else if(this.state.avaliacao.composicao_corporal.imc >= 30 &&  this.state.avaliacao.composicao_corporal.imc < 35){
            this.setState({massa_gorda_img:obeso});
            }
        else if(this.state.avaliacao.composicao_corporal.imc >= 35){
            this.setState({massa_gorda_img:obesidade_morbida});
            }
    } 

    setSearchMail(stringSearch: any){

        this.setState({mail_inserido: stringSearch})
    }

   async setUserMail(mail: any){

        //User sem avaliaçoes patch
        if(mail==="") return;
        await getLastAvaliacao(mail).then(
            async (value) =>{
                //User sem avaliaçoes guarda
                if(value.status === 400) {
                    this.setState({avaliacao :avalicao_inicial,user_mail:"",user_nome:"" });
                    alert("Utilizador ainda não tem Avaliaçoes");
            }
                if (value.status === 200) {              
                   value.json().then(
                    (json)=>{
                        var avaliacao =  JSON.parse(json);
                        console.log(json);
                        this.setState({avaliacao: avaliacao,user_mail: avaliacao.cliente_email,user_nome :avaliacao.cliente_nome})    
                        console.log(this.state.avaliacao.composicao_corporal.massa_gorda);
                        this.imgMassaGorda();
                    }
                )}}
        )
    }

    render(){        
        
        console.log(this.state.avaliacao.composicao_corporal.massa_gorda)  



        var data_massa_kg: any = JSON.parse(JSON.stringify(pieGraphSettings));
        data_massa_kg.labels = [ 'Massa Gorda (kg)', 'Massa Magra (kg)'];
        data_massa_kg.datasets[0].data = [this.state.avaliacao.composicao_corporal.massa_gorda,
                                          (this.state.avaliacao.composicao_corporal.peso-this.state.avaliacao.composicao_corporal.massa_gorda)];
        data_massa_kg.datasets[0].backgroundColor = ['#f52314', '#1aaba5'];
        data_massa_kg.datasets[0].hoverBackgroundColor = [ '#f55b5b', '#23ccc5' ];
        
                    
        var data_massa_perc: any = JSON.parse(JSON.stringify(pieGraphSettings));
        data_massa_perc.labels = [ 'Massa Gorda (%)', 'Massa Magra (%)'];
        data_massa_perc.datasets[0].data = [((this.state.avaliacao.composicao_corporal.massa_gorda)/(this.state.avaliacao.composicao_corporal.peso))*100,
                                            100-((this.state.avaliacao.composicao_corporal.massa_gorda)/(this.state.avaliacao.composicao_corporal.peso))*100];                                           
        data_massa_perc.datasets[0].backgroundColor = ['#b80626', '#128746'];
        data_massa_perc.datasets[0].hoverBackgroundColor = [ '#ed0932', '#15d169' ];   
        
        const mail = this.state.mail_inserido
        var lista_mails_resultado = this.state.lista_mails_inicial.filter(function(value){
            return value.toLowerCase().indexOf(mail.toLowerCase()) >= 0;}) 

                                          
    return(
      <IonPage>

        
<IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle id="page-title">Última Avaliação</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

        <IonCard className="card-left">
                <IonText className="text-title">Email:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-mails">

                <IonRow >
                    <IonCol>
                        <IonSearchbar className="background-orange"
                                    placeholder="email do cliente" 
                                    value={this.state.mail_inserido} 
                                    onIonChange={e => this.setSearchMail(e.detail.value!)}>
                        </IonSearchbar>
                    </IonCol>
                </IonRow>

                <IonRow >
                    <IonCol>
                        <IonContent className="comprimento-lista-mails">
                            <IonList>
                                <IonRadioGroup value={this.state.avaliacao.cliente_email} onIonChange={e => this.setUserMail(e.detail.value!)}>
                                    {
                                        lista_mails_resultado.map(function(s :any){

                                            return( <IonItem key={s}>
                                                        <IonLabel class="ion-text-wrap">{s}</IonLabel>
                                                        <IonRadio value={s} slot="end"/>
                                                    </IonItem>)
                                            })      
                                    }  
                                </IonRadioGroup>
                            </IonList>
                        </IonContent>
                    </IonCol>
                </IonRow>

            </IonGrid>      


            <IonGrid>

<div className="separador"></div>
    <IonRow>

            <IonCard className="card-left">


                <IonCardContent>
                        
                        <IonLabel className="text-title">Detalhes:</IonLabel>            
                        <br></br>
                        <br></br>
                        <IonLabel > <b> Data realização: </b> {this.state.avaliacao.data} </IonLabel>
                        <br></br>
                        <IonLabel> <b> Nome Cliente: </b> {this.state.avaliacao.cliente_nome}</IonLabel>
                        <br></br>
                        <IonLabel> <b> Mail Cliente: </b> {this.state.avaliacao.cliente_email} </IonLabel>
                    
                </IonCardContent>

            </IonCard>


    </IonRow>

</IonGrid>


    <div className="separador"></div>

    <IonCard className="card-left">
        <IonText className="text-title">Composição Corporal:</IonText>            
    </IonCard>

    <IonGrid className="margens">

        <IonCard  className="background-orange">
            <IonRow className="margem-vertical-labels">

                <IonCol>
                    <IonLabel className="info-text"><b>Altura: </b> {this.state.avaliacao.composicao_corporal.altura} cm</IonLabel>
                </IonCol>

                <IonCol>
                    <IonLabel className="info-text"><b>Peso: </b> {this.state.avaliacao.composicao_corporal.peso} kg</IonLabel>
                </IonCol>

                <IonCol>
                    <IonLabel className="info-text"><b>Idade Metabólica: </b> {this.state.avaliacao.composicao_corporal.idade_metabolica} anos</IonLabel>
                </IonCol>

            </IonRow>
        </IonCard>
        
        <IonCard className="card-imc">
            <IonRow className="margem-vertical-labels">
                <IonCol>

                    <IonRow>
                        <IonLabel className="info-text"><b>IMC: </b> {this.state.avaliacao.composicao_corporal.imc}</IonLabel >
                    </IonRow>

                    <IonRow>
                        <IonCardContent><img className="imcImage" src={this.state.massa_gorda_img} alt="Loading..."/></IonCardContent>
                    </IonRow>

                </IonCol>
            </IonRow>
        </IonCard>
        
        <IonCard className="background-orange">
            <IonGrid no-padding className="centrar-graficos">
                <IonRow >
                    <IonCol className="margem">
                    <Pie width={200} height={200} options={{ maintainAspectRatio: false ,responsive:false }} data={data_massa_kg}/>

                    </IonCol>

                    
                    <IonCol className="margem">
                    <Pie width={200} height={200} options={{ maintainAspectRatio: false ,responsive:false }} data={data_massa_perc}/>

                    </IonCol>
                
                </IonRow>

                </IonGrid>            
        </IonCard>            
                    

    </IonGrid>

    <div className="separador"></div>

    <IonCard className="card-left">
        <IonText className="text-title">Perimetros:</IonText>            
    </IonCard>

    <IonGrid className="margens">

        <IonCard className="background-lista"> 
            <IonCardContent className="border-color">
                <IonRow>

                    <IonCol className="search-content">
                        <IonLabel class="ion-text-wrap"><b>Perimetro</b></IonLabel>
                    </IonCol>

                    <IonCol className="search-content">
                        <IonLabel class="ion-text-wrap"><b>Valor(cm)</b></IonLabel>
                    </IonCol>

                </IonRow>
            </IonCardContent>
        </IonCard>
        
        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Cintura</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.cintura}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Abdomen</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.abdomen}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Ombro</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.ombro}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Torax</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.torax}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Braço Direito</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.braço_dir}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Braço Esquerdo</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.braço_esq}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Coxa Direita</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.coxa_dir}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Coxa Esquerda</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.coxa_esq}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Gemeo Direito</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.gemeo_dir}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Gemeo Esquerdo</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.gemeo_esq}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Antebraço Direito</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.antebraço_dir}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>
        
        <IonCard>
            <IonCardContent className="border-color">
            <IonRow>

                <IonCol className="search-content">
                    <IonLabel>Antebraço Esquerdo</IonLabel>   
                </IonCol>
                
                <IonCol className="search-content">
                    <IonLabel>{this.state.avaliacao.perimetros.antebraço_esq}</IonLabel>
            </IonCol>

            </IonRow>
            </IonCardContent>
        </IonCard>

    </IonGrid>

    <div className="separador"></div>

    <IonCard className="card-left">
        <IonText className="text-title">Comentário do Instrutor:</IonText>            
    </IonCard>
        
    <IonGrid className="margens">
        <IonCard  className="background-orange">
            <IonCardContent className="margem-vertical-labels">
                <IonText className="tamanho-fonte">{this.state.avaliacao.comentario}</IonText>
            </IonCardContent>
        </IonCard>            
    </IonGrid>
        </IonContent>
 
        
      </IonPage>
    );
    }
    
}

export default UltimaAvaliacaoInstrutor;

