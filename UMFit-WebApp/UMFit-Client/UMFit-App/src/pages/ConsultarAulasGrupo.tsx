
import React from "react";

import "./css/ConsultarAulasGrupo.css"

import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonIcon, IonRow, IonGrid, IonItem, IonLabel, IonSelect, IonSelectOption, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { calendarOutline, bodyOutline, timerOutline, sendOutline, informationOutline } from "ionicons/icons";

//---------------------------------------------------------------------------------------------------------------------------------

interface AulaGrupo {
    hora: Date,
    dia: string,
    nome: string,
    lotacao_atual: number,
    lotacao_max: number,
    duracao: string,
    dificuldade: string,
    instrutor_email: string,
    espaço_ginasio: string
}

var diasDaSemana: string[] = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

var CyclingIMG = require('../imgs/aulas/cycling.png');

//---------------------------------------------------------------------------------------------------------------------------------

var AulaTestObject: AulaGrupo = {
    hora: new Date(), //Empty constructor gives the current date
    dia: "Segunda-feira",
    nome: "Cycling",
    lotacao_atual: 12,
    lotacao_max: 30,
    duracao: "1h30m",
    dificuldade: "Médio",
    instrutor_email: "jose.ne.personal@umfit.com",
    espaço_ginasio: "Salão A"
}

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

    componentDidMount() {

        //-------------------------------------------------------------------
        //Test code to generate AulaGrupo[][]

        var planoAulasSemanalTest: Map<string, AulaGrupo[]> = new Map();
        var aulasDoDia           : AulaGrupo[]   = [];
    
        for(var i = 0; i < 8; i++) { //8 per day

            var aulaDiff: AulaGrupo = JSON.parse(JSON.stringify(AulaTestObject));
            var dataHoraNow = new Date();
            aulaDiff.hora = new Date(dataHoraNow.setHours(dataHoraNow.getHours() + i));

            aulasDoDia.push(aulaDiff);
        } 
        for(i = 0; i < 7; i++) { //7 days a week
            planoAulasSemanalTest.set(diasDaSemana[i], aulasDoDia);
        }

        //-------------------------------------------------------------------

        this.setState({
           
            planoAulasSemanal: planoAulasSemanalTest,
            
            //Current day of week as a string
            diaSelecionado: diasDaSemana[(new Date()).getDay() - 1]

        });

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
                                    <IonLabel>Selecione o dia da semana</IonLabel>
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
                        {
                            this.state.planoAulasSemanal.get(this.state.diaSelecionado)?.map(
                                aulaDoDia => {
                                    return (
                                        
                                    <IonRow>

                                        <IonCard key={aulaDoDia.hora.toLocaleTimeString()} className="AulaDia_CardWrapper">
                                                    
                                            <IonCardHeader>

                                            <IonGrid>

                                                <IonRow className="ion-align-items-end">

                                                    <IonCol className="ion-align-self-start">                                                    
                                                        
                                                        <IonCardTitle className="AulaDia_CardTitle">{aulaDoDia.nome} | {aulaDoDia.duracao}</IonCardTitle>
                                                        <br></br>
                                                        <IonCardSubtitle>Dificuldade: {aulaDoDia.dificuldade}</IonCardSubtitle>
                                                        
                                                        <br></br>

                                                        <IonItem>
                                                            <IonIcon icon={bodyOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel><b>Instrutor: </b>{aulaDoDia.instrutor_email}</IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={timerOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel><b>Duração: </b>{aulaDoDia.duracao}</IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={sendOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel><b>Espaço: </b>{aulaDoDia.espaço_ginasio}</IonLabel>
                                                        </IonItem>

                                                        <IonItem>
                                                            <IonIcon icon={informationOutline}></IonIcon>
                                                            <b>&nbsp;&nbsp;</b>
                                                            <IonLabel><b>Lotação atual: </b>{aulaDoDia.lotacao_atual} inscritos (máximo {aulaDoDia.lotacao_max} alunos)</IonLabel>
                                                        </IonItem>

                                                    </IonCol>
                                                    
                                                    <IonCol></IonCol><IonCol></IonCol>
                                                    
                                                    <IonCol className="ion-align-self-end">
                                                        <img className="aulaImage" src={CyclingIMG} alt="Loading..."/>
                                                    </IonCol>

                                                </IonRow>

                                            </IonGrid>

                                            </IonCardHeader>

                                        </IonCard>

                                    </IonRow>
                                    );
                                }
                            )
                        }
                        </IonGrid>



                </IonContent>
    
            </IonPage>    
        );
    }
}

export default ConsultarAulasGrupo;