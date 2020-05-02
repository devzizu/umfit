
import React from "react";

import "./css/ConsultarAulasGrupo.css"

import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonIcon, IonRow, IonGrid, IonItem, IonLabel, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { calendarOutline, bodyOutline, timerOutline, sendOutline, informationOutline } from "ionicons/icons";
import { getPlanoSemanalAulas } from "../models/API/AulaGrupoAPI";

//---------------------------------------------------------------------------------------------------------------------------------

interface AulaGrupo {
    hora: string,
    dia: string,
    nome: string,
    lotacao_atual: number,
    lotacao_max: number,
    duracao: string,
    dificuldade: string,
    instrutor_email: string,
    espaco_ginasio: string
}

var diasDaSemana: string[] = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

var CyclingIMG = require('../imgs/aulas/cycling.png');
var PilatesIMG = require('../imgs/aulas/pilates.png');
var CrossTrainingIMG = require('../imgs/aulas/cross-training.png');
var FuncionalIMG = require('../imgs/aulas/funcional.png');
var JumpIMG = require('../imgs/aulas/jump.png');
var KickboxingIMG = require('../imgs/aulas/kickboxing.png');
var SalsaIMG = require('../imgs/aulas/salsa.png');
var YogaIMG = require('../imgs/aulas/Yoga.png');
var LocalIMG = require('../imgs/aulas/local.png');
var TrxIMG = require('../imgs/aulas/trx.png');
var ZumbaIMG = require('../imgs/aulas/zumba.png');
var NatacaoIMG = require('../imgs/aulas/natacao.png');

//---------------------------------------------------------------------------------------------------------------------------------

class ConsultarAulasGrupo extends React.Component<any> {

    state: {
        planoAulasSemanal: Map<string, AulaGrupo[]>, //Map<DAY_OF_WEEK, AULAS>
        diaSelecionado: string
    }

    constructor(props: any) {

        super(props);

        this.state = {
            planoAulasSemanal: new Map(),
            diaSelecionado: ""
        }
    }

    async componentDidMount() {

        const res = await getPlanoSemanalAulas();

        const json = res.json();

        var planoAulasSemanalTest: Map<string, AulaGrupo[]> = new Map();

        json.then((data) => {

            var resultObj = JSON.parse(data);
            console.log(resultObj);
                       
            for (var i = 0; i < diasDaSemana.length; i++) {

                let diaString = diasDaSemana[i];
                var diaAulas: AulaGrupo[] = resultObj[diaString];
                
                planoAulasSemanalTest.set(diaString, diaAulas);
            }

            var day = (new Date()).getDay() - 1;
            var ususalSearchDay = diasDaSemana[(new Date()).getDay() - 1];
            var notUsual: Set<String> = new Set(["Sábado", "Domingo"]);
            if (notUsual.has(ususalSearchDay) || day === -1) {
                ususalSearchDay = "Segunda";
            }

            console.log("::: " + ((new Date()).getDay() - 1));

            this.setState({
                planoAulasSemanal: planoAulasSemanalTest,
                diaSelecionado: ususalSearchDay
            });
        });

        //-------------------------------------------------------------------
    }

    render() {
        
        console.log(this.state);

        return(
            
            <IonPage>

                <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle id="page-title">
                    Plano de aulas<b>&nbsp;</b>
                    <IonIcon icon={calendarOutline}></IonIcon>    
                    </IonTitle>
                </IonToolbar>
                </IonHeader>
    
                <IonContent className="PageContent">

                    <IonGrid>

                        <IonRow>

                            <IonCol>
                                <IonItem className="selectDayOfWeek_Item">
                                    <IonLabel>Dia da semana:</IonLabel>
                                    <IonSelect okText="Selecionar" cancelText="Cancelar" key={"DiasDaSemana"} value={this.state.diaSelecionado} placeholder="Select One" 
                                            onIonChange={(e) => { this.setState({ diaSelecionado: (e.detail.value)}) }}>
                                        {
                                            diasDaSemana.map(
                                                diaAsString => {
                                                    return <IonSelectOption key={diaAsString} value={diaAsString}>{diaAsString}</IonSelectOption>
                                                }
                                            )
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>

                        </IonRow>

                    </IonGrid>

                        <IonGrid>
                        { this.state.planoAulasSemanal.size > 0 ? ( 
                            this.state.planoAulasSemanal.get(this.state.diaSelecionado)?.map(
                                aulaDoDia => {
                                    return (
                                    <IonRow key={aulaDoDia.hora + aulaDoDia.instrutor_email}>

                                        <IonCard key={aulaDoDia.hora} className="AulaDia_CardWrapper">
                                                    
                                            <IonCardHeader>

                                            <IonGrid>

                                                <IonRow className="ion-align-items-end">

                                                    <IonCol className="ion-align-self-start">                                                    
                                                        
                                                        <IonCardTitle className="AulaDia_CardTitle">{aulaDoDia.nome} | {aulaDoDia.hora}</IonCardTitle>
                                                        <br></br>
                                                        <IonCardSubtitle>Dificuldade: {aulaDoDia.dificuldade}</IonCardSubtitle>
                                                        
                                                        <br></br>

                                                        <IonItem>
                                                            <IonIcon icon={bodyOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel className="textResponsive"><div className="textResponsive"><b>Instrutor: </b>{aulaDoDia.instrutor_email}</div></IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={timerOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel className="textResponsive"><div className="textResponsive"><b>Duração: </b>{aulaDoDia.duracao}</div></IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={sendOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel className="textResponsive"><div className="textResponsive"><b>Espaço: </b>{aulaDoDia.espaco_ginasio}</div></IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={informationOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel><div className="textResponsive"><b>Lotação atual: </b><br></br><br></br>{aulaDoDia.lotacao_atual} inscritos (máximo {aulaDoDia.lotacao_max} alunos)</div></IonLabel>
                                                        </IonItem>

                                                    </IonCol>
                                                    
                                                    <IonCol></IonCol><IonCol></IonCol>
                                                    
                                                    <IonCol className="ion-align-self-end">
                                                    {(() => {
                                                        switch(aulaDoDia.nome) {

                                                            case 'Cycling': return <img className="aulaImage" src={CyclingIMG} alt="Loading..."/>;
                                                            case 'Pilates': return <img className="aulaImage" src={PilatesIMG} alt="Loading..."/>;
                                                            case 'Cross Training': return <img className="aulaImage" src={CrossTrainingIMG} alt="Loading..."/>;
                                                            case 'Local': return <img className="aulaImage" src={LocalIMG} alt="Loading..."/>;
                                                            case 'Jump': return <img className="aulaImage" src={JumpIMG} alt="Loading..."/>;
                                                            case 'Kickboxing': return <img className="aulaImage" src={KickboxingIMG} alt="Loading..."/>;
                                                            case 'Funcional': return <img className="aulaImage" src={FuncionalIMG} alt="Loading..."/>;
                                                            case 'Salsa': return <img className="aulaImage" src={SalsaIMG} alt="Loading..."/>;
                                                            case 'Yoga': return <img className="aulaImage" src={YogaIMG} alt="Loading..."/>;
                                                            case 'Zumba': return <img className="aulaImage" src={ZumbaIMG} alt="Loading..."/>;
                                                            case 'TRX': return <img className="aulaImage" src={TrxIMG} alt="Loading..."/>;
                                                            case 'Natação': return <img className="aulaImage" src={NatacaoIMG} alt="Loading..."/>;
                                                        
                                                        }
                                                    })()}
                                                    </IonCol>

                                                </IonRow>

                                            </IonGrid>

                                            </IonCardHeader>

                                        </IonCard>

                                    </IonRow>
                                    );
                                }
                            )) : <div>A carregar plano semanal de aulas...</div>
                        }
                        </IonGrid>



                </IonContent>
    
            </IonPage>    
        );
    }
}

export default ConsultarAulasGrupo;