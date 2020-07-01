
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import { analyticsOutline, bicycle, calendarOutline, cardOutline, checkmarkDoneOutline, femaleOutline, informationCircleOutline, locationOutline, mailOutline, maleOutline } from "ionicons/icons";
import React from "react";
import { User } from "../models/Other/User";
import './css/UserProfile.css';
import { HorizontalBar } from "react-chartjs-2";
import { estatisticasCliente } from "../models/API/AulaGrupoAPI";

var graphAulasGrupo = {
  labels: ["a"],
  datasets: [
    {
      label: 'Número de aulas',
      backgroundColor: 'rgb(206, 143, 27, 0.6)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(196, 131, 11, 0.4)',
      data: [1]
    }
  ]
};

interface PersonalStats {

    aulas_participadas: number,
    aula_preferida: string
}

interface MapStatsEntry {
  Key : string,
  Value: number
}

class UserProfile extends React.Component<any> {

  state: {
    user: User,
    stats: PersonalStats,
    graphStatsValues: MapStatsEntry[]
  }

  constructor(props: any) {

    super(props);

    this.state = {
      user: this.props.user,
      stats: {
          aulas_participadas: 0,
          aula_preferida: "Nenhuma"
      },
      graphStatsValues: []
    }

  }

  async componentDidMount() {

    console.log("In user profile:");
    console.log(this.props.user);

    //debug
    this.setState({
      user: this.props.user
      //user: getTestValueUser()
    });

    //---------------------------------------------------------------------------

    const res = await estatisticasCliente();

    res.json().then((data) => {
      
      var sum = 0;
      data.forEach((element:any) => {
        sum+=element.Value;
      });

      this.setState({
        graphStatsValues: data,
        stats: { aulas_participadas: sum, aula_preferida: data[0]===undefined? "Sem aulas": data[0].Key }
      });
    });

    //---------------------------------------------------------------------------
  }

  render() {

    console.log(graphAulasGrupo);
    var labelsAulas : string[] = [];
    var numbAulas : number[] = [];
    var options = {
      scales: {
        xAxes: [{
          ticks: {
             min: 0,
             stepSize: 1
           }
         }]
        }}
    this.state.graphStatsValues.forEach((elem) => labelsAulas.push(elem.Key));
    this.state.graphStatsValues.forEach((elem) => numbAulas.push(elem.Value));

    graphAulasGrupo.labels = labelsAulas;
    graphAulasGrupo.datasets[0].data = numbAulas;

    console.log(graphAulasGrupo);
    return(

    <IonPage>
            
            
        
        <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle id="page-title">Olá {this.state.user.nome}!</IonTitle>
                </IonToolbar>
            </IonHeader>
        
        <IonContent>

        <IonGrid>

          {/* ------------------------------------------------------------------------- */}

            <IonRow>

              <IonCol>

                <IonCard>

                  <IonCardHeader className="cardFirst">

                    <img className="profilePic" src={require('../imgs/perfil_pic.png')} alt="Loading..."/>
                    
                    <IonCardSubtitle>{this.state.user.categoria}</IonCardSubtitle>
                    <IonCardTitle>{this.state.user.nome}</IonCardTitle>

                  </IonCardHeader>


                </IonCard>

              </IonCol>

            </IonRow>

            <IonRow>

                <IonCol>

                    <IonCard className="cardSecond">

                      <IonCardHeader>
                        <IonCardTitle className="estatisticasHeaderTitle">
                          <IonIcon icon={analyticsOutline}></IonIcon>
                          &nbsp;Minhas informações:
                        </IonCardTitle>
                      </IonCardHeader>

                      <IonCardContent>

                          <IonIcon slot="start" icon={informationCircleOutline} />
                        <b>&nbsp;</b>{this.state.user.tipoDeUser}
                        <br></br>
                        <IonIcon slot="start" icon={mailOutline} />
                        <b> E-Mail:</b> {this.state.user.email}
                        <br></br>
                        {
                          this.state.user.genero === 1 ?
                          <IonIcon slot="start" icon={maleOutline} />
                          :
                          <IonIcon slot="start" icon={femaleOutline} />
                        }
                        <b> Género:</b> {this.state.user.genero===1 ? "Masculino" : "Feminino"}
                        <br></br>
                        <IonIcon slot="start" icon={locationOutline} />
                        <b> Localidade:</b> {this.state.user.localidade}
                        <br></br>
                        <IonIcon slot="start" icon={calendarOutline} />
                        <b> Data de Nascimento:</b> {this.state.user.data_nascimento.substr(0, this.state.user.data_nascimento.indexOf('T'))}
                        <br></br>
                        <IonIcon slot="start" icon={cardOutline} />
                        <b> NIF:</b> {this.state.user.nif}

                      </IonCardContent>

                    </IonCard>

                </IonCol>

            </IonRow>
            
          {/* ------------------------------------------------------------------------- */}
          
            { this.state.user.tipoDeUser==="Cliente" &&

                <>

                    <IonRow>

                        <IonCol>

                            <IonCard className="cardSecond">
                            
                            <IonCardHeader>
                                <IonCardTitle className="estatisticasHeaderTitle">
                                <IonIcon icon={analyticsOutline}></IonIcon>
                                &nbsp;Atividades:
                                </IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                    
                                    <IonRow>

                                    <IonCol>
                                        <IonCard className="cardStats">

                                        <IonCardHeader>
                                            <IonCardTitle className="estatisticasSingle">
                                            <IonIcon icon={bicycle}></IonIcon>
                                            &nbsp;Número de aulas participadas: {this.state.stats.aulas_participadas}
                                            </IonCardTitle>
                                        </IonCardHeader>

                                        </IonCard>
                                    </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                        <IonCard className="cardStats">

                                        <IonCardHeader>
                                            <IonCardTitle className="estatisticasSingle">
                                            <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                                            &nbsp;Aula preferida: {this.state.stats.aula_preferida}
                                            </IonCardTitle>
                                        </IonCardHeader>

                                        </IonCard>
                                    </IonCol>

                                    </IonRow>
                                    {this.state.stats.aula_preferida !== "Sem aulas" &&
                                    <IonRow>

                                        <HorizontalBar options={options} data={graphAulasGrupo} />

                                    </IonRow>
                                    }

                            </IonCardContent>

                            </IonCard>

                        </IonCol>

                </IonRow>          
                </>
            }

          </IonGrid>

          </IonContent>
          
        </IonPage>
    );
  }
}

/*
<IonContent class="background-image"></IonContent>
*/

export default UserProfile;
