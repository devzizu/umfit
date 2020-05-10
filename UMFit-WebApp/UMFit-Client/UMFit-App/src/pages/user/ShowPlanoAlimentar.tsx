
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { arrowForwardCircleSharp, hourglassOutline, pizzaOutline } from "ionicons/icons";
import React from "react";
import { getPlanosAlimentares } from "../../models/API/PlanoAlimentarAPI";
import { PlanoAlimentar, Refeicao } from "../../models/Other/PlanoAlimentar";
import { User } from "../../models/Other/User";
import "../css/ShowPlanoAlimentar.css";

const RefeicaoNotDef: Refeicao = {

    nome: "Não existem refeições planeadas!",
    descricao: "Marque uma avaliação!" 
}

const PlanNotDefined: PlanoAlimentar = {

    nome: "Não existem planos alimentares!",
    refeicoes_livres: "-",
    frequencia: "-",
    data_fim : "",
    lista_refeicoes: [RefeicaoNotDef]
}

class ShowPlanoAlimentar extends React.Component<any>{

    state: {
        
        planoAlimentar: PlanoAlimentar
        indice_plano: number
        lista_plano_alimentar: Array<PlanoAlimentar>
        user: User
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            planoAlimentar: {
                nome:"Ainda não existem planos alimentares!",
                refeicoes_livres:"",
                frequencia:"",
                data_fim: "",
                lista_refeicoes:[]
            },
            indice_plano: 0,
            lista_plano_alimentar: [PlanNotDefined],

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

        if(index < this.state.lista_plano_alimentar.length-1){

            index++;
        }

        this.setState({indice_plano: index})    

    }

    async componentDidMount(){

        await getPlanosAlimentares(this.state.user.email).then(

            async (value: any) =>{
                if (value.status === 200) {

                    var json = value.json();

                    await json.then((value: any[]) => {

                        var resultList: PlanoAlimentar[] = [];

                        for (var i = 0; i < value.length; i++) {

                            var refeicoesList = value[i].refeiçoes;

                            var planoRes: any = Object.assign(value[i], {lista_refeicoes: refeicoesList, frequencia: value[i].frequencia, refeicoes_livres: value[i].nRefeiçoes_livres});
                            delete planoRes.nRefeiçoes_livres;
                            delete planoRes.refeiçoes;
                            
                            planoRes.lista_refeicoes.map((exe: any) => {
                                
                                var newExerc = Object.assign(exe, {descricao: exe.descriçao});
                                delete newExerc.descriçao;
                                return("ok");
                            });

                            resultList.push(planoRes);
                        }

                        if(resultList.length > 0) 
                        this.setState({lista_plano_alimentar: resultList});

                        console.log(resultList);
                    });

                    } else {
                    console.log("REQUEST ERROR! Got status " + value.status);
                }
            })
            .catch(function(error: any) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
            
    }

    render(){

        console.log(this.state.indice_plano)

    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Plano Alimentar</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
            
            <IonGrid>

                    <div className="buttonsWrapper-ca">
                        <div className="leftBut-ca">
                        {
                            (this.state.indice_plano - 1 >= 0) ? (
                                <IonButton className="buttonNextBefore-ca" disabled={false} onClick={() => this.planoanterior()}>
                                    <div className="responsiveText-ca">
                                    Anterior ({this.state.lista_plano_alimentar[this.state.indice_plano-1].nome})
                                    </div>
                                </IonButton>
                            ):(
                                <IonButton className="buttonNextBefore-ca" disabled>
                                    <div className="responsiveText-ca">
                                    Anterior
                                    </div>
                                </IonButton>
                            )
                    
                        }
                        </div>
                        <div className="rightBut-ca">
                        {
                            (this.state.indice_plano + 1 < this.state.lista_plano_alimentar.length) ? (
                                <IonButton className="buttonNextBefore-ca" disabled={false} onClick={() => this.proximoplano()}>
                                    Próximo ({this.state.lista_plano_alimentar[this.state.indice_plano+1].nome})
                                </IonButton>
                            ):(
                                <IonButton className="buttonNextBefore-ca"  disabled>
                                    Próximo
                                </IonButton>
                            )
                        }
                        </div>
                    </div>

                <IonCard  className="background-orange">

                    <IonRow>
                        <IonCol className="margens-centrar">
                    <IonLabel className="nome-treino"> <b>Plano Alimentar:</b> <i>{this.state.lista_plano_alimentar[this.state.indice_plano].nome}</i> (Até <i>...</i>) </IonLabel>
                        </IonCol>
                    </IonRow>
                    
                    <div className="separador"></div>

                    <IonRow>
                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={pizzaOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><div className="responsiveText-ca"><b>Refeições Livres:</b> {this.state.lista_plano_alimentar[this.state.indice_plano].refeicoes_livres}</div></IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>

                        <IonCol>
                        <div className="margens-nomes">
                        <IonItem className="background-orange"><IonIcon icon={hourglassOutline}></IonIcon><b>&nbsp;</b>
                        <IonLabel className="text-title"><div className="responsiveText-ca"><b>Frequência:</b> {this.state.lista_plano_alimentar[this.state.indice_plano].frequencia}</div></IonLabel>
                        
                        </IonItem>
                        </div>
                        </IonCol>

                    </IonRow>

                    <div className="separador"></div>

                    <IonRow>
                        <div className="margens-nomes">
                        <IonLabel className="text-title"><div className="responsiveText-ca">Lista de Refeições:</div> </IonLabel>
                        </div>
                    </IonRow>       

                    {
                        this.state.lista_plano_alimentar[this.state.indice_plano].lista_refeicoes.map((s, i) => (
                <IonCard key={i+s.nome} className="card-exercicio">

                    <IonRow>
                    
                        <IonCol>  

                            <IonRow className="margens-nomes"> 
                                <IonLabel className="nome-exercicio"><div className="responsiveText-ca">{s.nome}</div></IonLabel>
                            </IonRow>                             
                            {
                                s.descricao.split(";").map((des, i) => (
                                    (des !== "") ?
                                    <IonRow key={i + des} className="margens-nomes">
                                        <IonItem>
                                        <IonIcon icon={arrowForwardCircleSharp}></IonIcon>
    
                                            <b>&nbsp;</b>
                                            <IonLabel className="text-title">
                                                <div className="responsiveText-ca">{des}
                                                </div>
                                            </IonLabel>                        
                                        </IonItem>
                                    </IonRow>
                                    : console.log(des)
                                ))
                            }

                        </IonCol>

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

export default ShowPlanoAlimentar;

