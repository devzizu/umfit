
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonText, IonLabel, IonRow, IonCol, IonGrid} from "@ionic/react";
import "./css/UltimaAvaliacao.css"
import{Pie} from "react-chartjs-2";

var magro = require("../../imgs/avaliacao/magro.png") 
var normal = require("../../imgs/avaliacao/normal.png") 
var acima_do_peso = require("../../imgs/avaliacao/acima_do_peso.png")
var obeso = require("../../imgs/avaliacao/obeso.png")
var obesidade_morbida = require("../../imgs/avaliacao/obesidade_morbida.png")
var perfil = require('../../imgs/perfil_pic.png')

var pieGraphSettings = {
	labels: [],
	datasets: [{ data: [], backgroundColor: [],
        hoverBackgroundColor: [] 
        }]}

interface Avaliacao{
    
    data_avaliacao: string
        instrutor_mail: string
        instrutor_nome: string

        altura: number
        peso: number
        idade_metabolica: number
        imc: number
        massa_gorda: number
        massa_magra: number
        massa_gorda_img: string

        cintura: number
        abdomen: number
        ombro: number
        torax: number
        braco_direito: number
        braco_esquerdo: number
        coxa_direita: number
        coxa_esquerda: number
        gemeo_direito: number
        gemeo_esquerdo: number
        antebraco_direito: number
        antebraco_esquerdo: number

        comentario:string
}
        
const avalicao_inicial: Avaliacao = {data_avaliacao: "", instrutor_mail: "", instrutor_nome: "",
                                    altura: 0, peso: 100, idade_metabolica: 0, imc: 0, massa_gorda: 20, massa_magra:70, massa_gorda_img: magro,
                                    cintura: 0, abdomen: 0, ombro: 0, torax: 0, braco_direito: 0, braco_esquerdo: 0, coxa_direita: 0, coxa_esquerda: 0, gemeo_direito: 0, gemeo_esquerdo: 0, antebraco_direito: 0, antebraco_esquerdo: 0,
                                    comentario: ""}

class UltimaAvaliacao extends React.Component<any>{

    state: {
        
        avaliacao: Avaliacao
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            avaliacao: avalicao_inicial
        }        
    }

    componentDidMount(){
    
        this.setState({data_avaliacao: "09/04/2020", instrutor_nome: "paulo", instrutor_mail: "paulo.280999@gmail.com", 
                    massa_gorda: 25, peso: 80,
                    comentario: "Tenho a dizer que esta avaliacao não fiz o mínimo sentido visto que o aluno em causa revelou falta de ética de trabalho e compreensão para com os métodos adotados pelo instrutor.\n Portanto numa próxima avaliação seria necessário uma evolução drástica do cliente"})

    }

    stringMassaGorda(){

        if(this.state.avaliacao.massa_gorda < 18.5){
            return "Magro"
             
        }
        else if(this.state.avaliacao.massa_gorda >= 18.5 &&  this.state.avaliacao.massa_gorda < 25){
            return "Normal"
             
        }
        else if(this.state.avaliacao.massa_gorda >= 25 &&  this.state.avaliacao.massa_gorda < 30){
            return "Acima do Peso"
              
        }
        else if(this.state.avaliacao.massa_gorda >= 30 &&  this.state.avaliacao.massa_gorda < 35){
            return "Obeso"
             
        }
        else if(this.state.avaliacao.massa_gorda >= 35){
            return "Obesidade Morbida"
             
        }
    } 

    imgMassaGorda(){

        if(this.state.avaliacao.massa_gorda < 18.5){
            return magro
        }
        else if(this.state.avaliacao.massa_gorda >= 18.5 &&  this.state.avaliacao.massa_gorda < 25){
            return normal
        }
        else if(this.state.avaliacao.massa_gorda >= 25 &&  this.state.avaliacao.massa_gorda < 30){
            return acima_do_peso
        }
        else if(this.state.avaliacao.massa_gorda >= 30 &&  this.state.avaliacao.massa_gorda < 35){
            return obeso
        }
        else if(this.state.avaliacao.massa_gorda >= 35){
            return obesidade_morbida
        }
    } 

    render(){        
        
        console.log(this.state.avaliacao.massa_gorda)  

        var data_massa_kg: any = JSON.parse(JSON.stringify(pieGraphSettings));
        data_massa_kg.labels = [ 'Massa Gorda (kg)', 'Massa Magra (kg)'];
        data_massa_kg.datasets[0].data = [this.state.avaliacao.massa_gorda,
                                          (this.state.avaliacao.peso-this.state.avaliacao.massa_gorda)];
        data_massa_kg.datasets[0].backgroundColor = ['#f52314', '#1aaba5'];
        data_massa_kg.datasets[0].hoverBackgroundColor = [ '#f55b5b', '#23ccc5' ];
        
                    
        var data_massa_perc: any = JSON.parse(JSON.stringify(pieGraphSettings));
        data_massa_perc.labels = [ 'Massa Gorda (%)', 'Massa Magra (%)'];
        data_massa_perc.datasets[0].data = [((this.state.avaliacao.massa_gorda)/(this.state.avaliacao.peso))*100,
                                            100-((this.state.avaliacao.massa_gorda)/(this.state.avaliacao.peso))*100];                                           
        data_massa_perc.datasets[0].backgroundColor = ['#b80626', '#128746'];
        data_massa_perc.datasets[0].hoverBackgroundColor = [ '#ed0932', '#15d169' ];                                      

                                          
    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Ultima Avaliacao</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

            <IonCard className="card-left">
                <IonText className="text-title">Dados da realização:</IonText>            
            </IonCard>


            <IonCard className="card-left">
                
                <img src={perfil} width="100" height="100" alt="Loading..."/>
                
                <IonCardContent>
                        
                        <IonRow><IonLabel className="text-title"> <b> Data realização: </b> {this.state.avaliacao.data_avaliacao} </IonLabel></IonRow>
                        <IonRow><IonLabel className="text-title"> <b> Nome Instrutor: </b> {this.state.avaliacao.instrutor_nome}</IonLabel></IonRow>
                        <IonRow><IonLabel className="text-title"> <b> Mail instrutor: </b> {this.state.avaliacao.instrutor_mail} </IonLabel></IonRow>
                    
                </IonCardContent>

            </IonCard>

            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Composição Corporal:</IonText>            
            </IonCard>

            <IonGrid className="margens">

                <IonCard  className="background-orange">
                    <IonRow className="margem-vertical-labels">

                        <IonCol>
                            <IonLabel className="info-text"><b>Altura: </b> {this.state.avaliacao.altura} cm</IonLabel>
                        </IonCol>

                        <IonCol>
                            <IonLabel className="info-text"><b>Peso: </b> {this.state.avaliacao.peso} kg</IonLabel>
                        </IonCol>

                        <IonCol>
                            <IonLabel className="info-text"><b>Idade Metabólica: </b> {this.state.avaliacao.idade_metabolica} anos</IonLabel>
                        </IonCol>

                    </IonRow>
                </IonCard>
                
                <IonCard className="card-imc">
                    <IonRow className="margem-vertical-labels">
                        <IonCol>

                            <IonRow>
                                <IonLabel className="info-text"><b>IMC: </b> {this.state.avaliacao.imc}</IonLabel >
                            </IonRow>

                            <IonRow>
                                <IonCardContent><img src={this.imgMassaGorda()} height="350px" alt="Loading..."/></IonCardContent>
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
                            <IonLabel>{this.state.avaliacao.cintura}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.abdomen}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.ombro}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.torax}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.braco_direito}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.braco_esquerdo}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.coxa_direita}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.coxa_esquerda}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.gemeo_direito}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.gemeo_esquerdo}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.antebraco_direito}</IonLabel>
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
                            <IonLabel>{this.state.avaliacao.antebraco_esquerdo}</IonLabel>
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
 
        <IonFooter class="ion-no-border">
            <IonContent className="info-text"> © UMFit - 2020</IonContent>
        </IonFooter>

      </IonPage>
    );
    }
    
}

export default UltimaAvaliacao;

