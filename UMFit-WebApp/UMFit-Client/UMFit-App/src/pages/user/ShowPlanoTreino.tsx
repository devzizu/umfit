
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonText, IonGrid, IonRow, IonLabel, IonCol, IonButton, IonItem, IonIcon} from "@ionic/react";
import "./css/ShowPlanoTreino.css"
import { caretForwardOutline, barbellOutline, hourglassOutline, informationOutline } from "ionicons/icons";
import { Exercicio, PlanoTreino } from "../../models/Other/PlanoTreino";

//Pernas imgs
var agachamento_frontal = require("../../imgs/exercicios/Agachamento_Frontal.png") 
var agachamento_halter = require("../../imgs/exercicios/Agachamento_Halter.png") 
var agachamento_normal = require("../../imgs/exercicios/Agachamento_Normal_Barra.png")
var cadeira_extensora = require("../../imgs/exercicios/Cadeira_Extensora.png")
var cadeira_adutora = require("../../imgs/exercicios/Cadeira_Adutora.png")

//Peito imgs
var afundos = require("../../imgs/exercicios/Afundos.png")
var pack_deck = require('../../imgs/exercicios/Pack_Deck.png')
var peito_press_maquina = require("../../imgs/exercicios/Peito_Press_Maquina.png") 
var supino_normal_halters = require("../../imgs/exercicios/Supino_Normal_Halters.png") 

//Tricep imgs
var tricep_corda = require("../../imgs/exercicios/Tricep_Corda.png")
var tricep_frances_barra = require("../../imgs/exercicios/Tricep_Frances_Barra.png")
var tricep_kickback = require('../../imgs/exercicios/Tricep_KickBack_Corda.png')

//Costas imgs
var costa_maquina = require("../../imgs/exercicios/Costas_Máquina.png") 
var costas_pushada = require("../../imgs/exercicios/Costas_Pushada.png") 
var elevacoes = require("../../imgs/exercicios/Elevações_Barra.png")
var serrote_sentado = require("../../imgs/exercicios/Serrote_Sentado.png")

//Povoar o plano de treino com dados reais quando fizer a API ------------------------------------------------------------

const Supino_Normal_Halters: Exercicio = {

    nome: "Supino c/ Halters",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Pack_Deck: Exercicio = {

    nome: "Pack Deck",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Afundos: Exercicio = {

    nome: "Afundos",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Peito_Press_Maquina: Exercicio = {

    nome: "Máquina Press Peito",
    nm_repeticoes: "15",
    nm_series: "3"
}

const Tricep_Corda: Exercicio = {

    nome: "Tricep c/ Corda",
    nm_repeticoes: "12",
    nm_series: "4"
}


const Tricep_Frances_Barra: Exercicio = {

    nome: "Tricep Francês c/ Barra",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Tricep_KickBack_Corda: Exercicio = {

    nome: "Tricep Kick-Back c/ Corda",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Agachamento_Frontal: Exercicio = {

    nome: "Agachamento Frontal",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Agachamento_Halter: Exercicio = {

    nome: "Agachamento c/ Halter",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Agachamento_Normal_Barra: Exercicio = {

    nome: "Agachamento Normal c/ Barra",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Cadeira_Adutora: Exercicio = {

    nome: "Cadeira Adutora",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Cadeira_Extensora: Exercicio = {

    nome: "Cadeira Extensora",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Costas_Maquina: Exercicio = {

    nome: "Máquina de Costas",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Elevacoes_Barra: Exercicio = {

    nome: "Elevações na Barra",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Costas_Pushada: Exercicio = {

    nome: "Pushada",
    nm_repeticoes: "12",
    nm_series: "4"
}

const Serrote_Sentado: Exercicio = {

    nome: "Serrote",
    nm_repeticoes: "12",
    nm_series: "4"
}

const peito: PlanoTreino = {

    nome: "Peito",
    tipo: "Hipertrofia",
    grupos_musculares: "Peito",
    frequencia: "2/semana",
    data_fim: "",
    lista_exercicios: [Supino_Normal_Halters, Pack_Deck, Afundos, Peito_Press_Maquina]
}

const tricep: PlanoTreino = {

    nome: "Tricep",
    tipo: "Hipertrofia",
    grupos_musculares: "Tricep",
    frequencia: "2/semana",
    data_fim: "",
    lista_exercicios: [Tricep_Corda, Tricep_Frances_Barra, Tricep_KickBack_Corda, Afundos]
}

const costas: PlanoTreino = {

    nome: "Costas",
    tipo: "Hipertrofia",
    grupos_musculares: "Costas",
    frequencia: "2/semana",
    data_fim: "",
    lista_exercicios: [Costas_Maquina, Costas_Pushada, Elevacoes_Barra, Serrote_Sentado]
}

const pernas: PlanoTreino = {

    nome: "Pernas",
    tipo: "Hipertrofia",
    grupos_musculares: "Pernas",
    frequencia: "2/semana",
    data_fim: "",
    lista_exercicios: [Agachamento_Frontal, Agachamento_Halter, Agachamento_Normal_Barra,Cadeira_Adutora, Cadeira_Extensora]
}



//--------------------------------------------------------------------------------------------------------------------

class ShowPlanoTreino extends React.Component<any>{

    state: {
        
        planotreino: PlanoTreino
        exercicio_atual: Exercicio
        indice_plano: number
        lista_plano_treino: Array<PlanoTreino>
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            planotreino : {

                nome: "",
                tipo: "",
                grupos_musculares: "",
                frequencia: "",

                data_fim: "",
                lista_exercicios: []
            },
            exercicio_atual: {
                nome: "",
                nm_repeticoes: "",
                nm_series: ""
            },
            indice_plano: 0,
            lista_plano_treino: [peito,costas,pernas, tricep]

        }        
    }

    planoanterior(){
        
        var index = this.state.indice_plano

        if(index > 0){

            index--;
        }

        this.setState({indice_plano: index})

    }

    proximoplano(){

        var index = this.state.indice_plano

        if(index < this.state.lista_plano_treino.length-1){

            index++;
        }

        this.setState({indice_plano: index})    

    }

    exercicioToImagem(nome: any){

        switch (nome) {

            case "Supino c/ Halters": {return(supino_normal_halters)}
            case "Pack Deck": {return(pack_deck)}
            case "Afundos": {return(afundos)}
            case "Máquina Press Peito": {return(peito_press_maquina)}
            case "Tricep c/ Corda": {return(tricep_corda)}
            case "Tricep Francês c/ Barra": {return(tricep_frances_barra)}
            case "Tricep Kick-Back c/ Corda": {return(tricep_kickback)}
            case "Agachamento Frontal": {return(agachamento_frontal)}
            case "Agachamento c/ Halter": {return(agachamento_halter)}
            case "Agachamento Normal c/ Barra": {return(agachamento_normal)}
            case "Cadeira Adutora": {return(cadeira_adutora)}
            case "Cadeira Extensora": {return(cadeira_extensora)}
            case "Máquina de Costas": {return(costa_maquina)}
            case "Elevações na Barra": {return(elevacoes)}
            case "Pushada": {return(costas_pushada)}
            case "Serrote": {return(serrote_sentado)}
            default :
            break;
            
        }
    }


    render(){

        console.log(this.state.indice_plano)

    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Plano Treino</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
            
            <IonGrid className="margens">

                <IonRow>
                
                        <IonCol className="esq">{(this.state.indice_plano - 1 >= 0)?(
                        <IonButton disabled={false} size="large" className="botao" onClick={() => this.planoanterior()}>
                            <IonText>Plano Anterior ({this.state.lista_plano_treino[this.state.indice_plano-1].nome})</IonText>
                        </IonButton>
                        ):(
                        <IonButton disabled size="large" className="botao">
                            <IonText>Plano Anterior</IonText>
                        </IonButton>
                        )
                    
                        }
                        </IonCol>

                        <IonCol className="dir">{(this.state.indice_plano + 1 < this.state.lista_plano_treino.length)?(
                            <IonButton disabled={false} size="large" className="botao" onClick={() => this.proximoplano()}>
                                <IonText>Próximo Plano ({this.state.lista_plano_treino[this.state.indice_plano+1].nome})</IonText>
                            </IonButton>
                        ):(
                            <IonButton disabled size="large" className="botao">
                                <IonText>Próximo Plano</IonText>
                            </IonButton>
                        )
                        

                        }
                    </IonCol>
                

                </IonRow>

                <IonCard  className="background-orange">

                    <IonRow>
                        <IonCol className="margens-centrar">
                    <IonLabel className="nome-treino"> <b>Plano de Treino:</b> <i>{this.state.lista_plano_treino[this.state.indice_plano].nome}</i> (Até <i>01-02-2020</i>) </IonLabel>
                        </IonCol>
                    </IonRow>
                    
                    <div className="separador"></div>

                    <IonRow>
                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={caretForwardOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><b>Tipo:</b> {this.state.lista_plano_treino[this.state.indice_plano].tipo}</IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>

                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={barbellOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><b>Grupos Musculares:</b> {this.state.lista_plano_treino[this.state.indice_plano].grupos_musculares}</IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>

                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={hourglassOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><b>FrequÊncia:</b> {this.state.lista_plano_treino[this.state.indice_plano].frequencia}</IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>
                    </IonRow>

                    <div className="separador"></div>

                    <IonRow>
                        <div className="margens-nomes">
                        <IonLabel className="text-title">Lista de Exercícios: </IonLabel>
                        </div>
                    </IonRow>       

                    {
                        this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios.map((s, i) => (
                <IonCard className="card-exercicio">

                    <IonRow>
                    
                        <IonCol>  

                            <IonRow className="margens-nomes"> 
                                <IonLabel className="nome-exercicio"><b>{this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios[i].nome}</b></IonLabel>
                            </IonRow> 
                            
                            <IonRow className="margens-nomes"> 
                                <IonItem><IonIcon icon={informationOutline}></IonIcon><b>&nbsp;</b>
                                <IonLabel className="text-title"><b>Número de Repetições:</b> {this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios[i].nm_repeticoes}</IonLabel>                        
                                </IonItem>
                            </IonRow>  

                            <IonRow className="margens-nomes"> 
                            <IonItem><IonIcon icon={informationOutline}></IonIcon><b>&nbsp;</b>
                                <IonLabel className="text-title"><b>Número de Séries:</b> {this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios[i].nm_series}</IonLabel>                        
                                </IonItem>
                            </IonRow> 

                        </IonCol>

                        <IonCol>
                            <img alt="a carregar..." src={this.exercicioToImagem(this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios[i].nome)}></img>
                        </IonCol>

                    </IonRow>

                </IonCard>
            ))}

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

export default ShowPlanoTreino;

