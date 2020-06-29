
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { barbellOutline, hourglassOutline, informationOutline } from "ionicons/icons";
import React from "react";
import { getPlanosTreino } from "../../models/API/PlanoTreinoAPI";
import { Exercicio, PlanoTreino } from "../../models/Other/PlanoTreino";
import { User } from "../../models/Other/User";
import "./css/ShowPlanoTreino.css";
var exercicio_default = require("../../imgs/exercicios/exercicio_default.png") 
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



const empty: PlanoTreino = {

    nome: "Não tem um plano ainda!",
    tipo: "",
    grupos_musculares: "",
    frequencia: "",
    data_fim: "",
    lista_exercicios: []
}
//--------------------------------------------------------------------------------------------------------------------

class ShowPlanoTreino extends React.Component<any>{

    state: {
        
        planotreino: PlanoTreino
        exercicio_atual: Exercicio
        indice_plano: number
        lista_plano_treino: Array<PlanoTreino>
        user: User
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
            lista_plano_treino: [empty],

            user: this.props.user

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
            case "Elevações": {return(elevacoes)}
            case "Puxada": {return(costas_pushada)}
            case "Serrote": {return(serrote_sentado)}
            default :  {return(exercicio_default)}
            break;
            
        }
    }

    async componentDidMount(){
        await getPlanosTreino(this.state.user.email).then(

            async (value: any) =>{
                if (value.status === 200) {

                    var json = value.json();

                    await json.then((value: any[]) => {

                        var resultList: PlanoTreino[] = [];

                        for (var i = 0; i < value.length; i++) {
                            if(value[i]===null) return;
                            var exerciciosList = value[i].exercicios;

                            var planoRes: any = Object.assign(value[i], {lista_exercicios: exerciciosList, grupos_musculares: value[i].grupo_muscular, tipo: "esqueceram-se de mim"});
                            delete planoRes.exercicios;
                            delete planoRes.grupo_muscular;
                            
                            planoRes.lista_exercicios.map((exe: any) => {
                                
                                var newExerc = Object.assign(exe, {nm_repeticoes: exe.repetiçoes, nm_series: exe.series});
                                delete newExerc.repetiçoes;
                                delete newExerc.series;
                                return("ok");
                            });

                            resultList.push(planoRes);
                        }

                        if(resultList.length === 0) 
                            this.setState({lista_plano_treino: [empty]});
                        else {
                        //console.log(resultList);
                        this.setState({lista_plano_treino: resultList});

                        }
                    });

                    } 
            });
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
            
            <IonGrid>

                    <div className="buttonsWrapper">
                        <div className="leftBut">
                        {
                            (this.state.indice_plano - 1 >= 0) ? (
                                <IonButton className="buttonNextBefore" disabled={false} onClick={() => this.planoanterior()}>
                                    Anterior ({this.state.lista_plano_treino[this.state.indice_plano-1].nome})
                                </IonButton>
                            ):(
                                <IonButton className="buttonNextBefore" disabled>
                                    Anterior
                                </IonButton>
                            )
                    
                        }
                        </div>
                        <div className="rightBut">
                        {
                            (this.state.indice_plano + 1 < this.state.lista_plano_treino.length) ? (
                                <IonButton className="buttonNextBefore" disabled={false} onClick={() => this.proximoplano()}>
                                    Próximo ({this.state.lista_plano_treino[this.state.indice_plano+1].nome})
                                </IonButton>
                            ):(
                                <IonButton className="buttonNextBefore"  disabled>
                                    Próximo
                                </IonButton>
                            )
                        }
                        </div>
                    </div>

                <IonCard  className="background-orange">

                    <IonRow>
                        <IonCol className="margens-centrar">
                    <IonLabel className="nome-treino"> <b>Plano de Treino:</b> <i>{this.state.lista_plano_treino[this.state.indice_plano].nome}</i> (Até <i>...</i>) </IonLabel>
                        </IonCol>
                    </IonRow>
                    
                    <div className="separador"></div>

                    <IonRow>
                        {/*
                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={caretForwardOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><b>Tipo:</b> {this.state.lista_plano_treino[this.state.indice_plano].tipo}</IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>
                        */}
                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={barbellOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><div className="responsiveText"><b>Grupos Musculares:</b> {this.state.lista_plano_treino[this.state.indice_plano].grupos_musculares}</div></IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>

                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={hourglassOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><div className="responsiveText"><b>Frequência:</b> {this.state.lista_plano_treino[this.state.indice_plano].frequencia}</div></IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>
                    </IonRow>

                    <div className="separador"></div>

                    <IonRow>
                        <div className="margens-nomes">
                        <IonLabel className="text-title"><div className="responsiveText">Lista de Exercícios:</div> </IonLabel>
                        </div>
                    </IonRow>       

                    {
                        this.state.lista_plano_treino[this.state.indice_plano].lista_exercicios.map((s, i) => (
                <IonCard key={i} className="card-exercicio">

                    <IonRow>
                    
                        <IonCol>  

                            <IonRow className="margens-nomes"> 
                                <IonLabel className="nome-exercicio"><div className="responsiveText">{s.nome}</div></IonLabel>
                            </IonRow> 
                            
                            <IonRow className="margens-nomes"> 
                                <IonItem><IonIcon icon={informationOutline}></IonIcon><b>&nbsp;</b>
                                <IonLabel className="text-title"><div className="responsiveText">Número de Repetições: {s.nm_repeticoes}</div></IonLabel>                        
                                </IonItem>
                            </IonRow>  

                            <IonRow className="margens-nomes"> 
                            <IonItem><IonIcon icon={informationOutline}></IonIcon><b>&nbsp;</b>
                                <IonLabel className="text-title"><div className="responsiveText">Número de Séries: {s.nm_series}</div></IonLabel>                        
                                </IonItem>
                            </IonRow> 

                        </IonCol>

                            <img className="exeImage" alt="a carregar..." src={this.exercicioToImagem(s.nome)}></img>
                    </IonRow>

                </IonCard>
            ))}

                </IonCard>
            </IonGrid>

        </IonContent>
 
        
      </IonPage>
    );
    }
    
}

export default ShowPlanoTreino;

