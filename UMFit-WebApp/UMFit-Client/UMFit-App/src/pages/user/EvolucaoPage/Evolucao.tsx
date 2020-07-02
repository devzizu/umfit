
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import React from "react";
import { Line } from "react-chartjs-2";
import { getEvolucao } from "../../../models/API/EvolucaoAPI";
//import{Line, Pie} from "react-chartjs-2";
import "../css/Evolucao.css";

//----------------------------------------------------------------------
//Graph settings

var generalGraphSettings = { 
    labels: [],
    datasets: [{ 
        fill: false, lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0, borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)', pointBackgroundColor: '#fff',
        pointBorderWidth: 5, pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)', pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2, pointRadius: 3, pointHitRadius: 10, 
        data: []
    }]
};

/*

var pieGraphSettings = {
	labels: [ 'Massa Magra (kg)', 'Massa Gorda (kg)'],
	datasets: [{ data: [], backgroundColor: ['#36A2EB', '#FF6384'],
		hoverBackgroundColor: [ '#36A2EB', '#FF6384' ] }]
};

*/

//----------------------------------------------------------------------

interface registoAvaliacao {
    data: Date,
    y: number
}
const customActionSheetOptions = {
    header: 'Gráfico de Evolução'
};
//----------------------------------------------------------------------

class Evolucao extends React.Component<any> {

    state: {

        peso: Array<registoAvaliacao>
        massaGorda: Array<registoAvaliacao>
        massaMagra: Array<registoAvaliacao>

        cintura: Array<registoAvaliacao>

        menuOpt: String
    }

    constructor(props: any) {

        super(props);   
            
        this.state = ({

            peso: new Array<registoAvaliacao>(),
            massaGorda: new Array<registoAvaliacao>(),
            massaMagra: new Array<registoAvaliacao>(),

            cintura: new Array<registoAvaliacao>(),
            
            //default option
            menuOpt: "compoCorporalOption"
        });
    }

    async componentDidMount() {
      const ret =  await getEvolucao();
      if(ret.status !== 200) return;
        ret.json().then(
            (jsonData : any)  => {
          
                
                this.setState({

                    peso: jsonData.pesos.map((elem: any) => {
                        
                        var dt = new Date (elem.data);
                        return Object.assign({}, {data: dt, y: elem.registo});
                    }                       
                    ),
                    cintura: jsonData.cinturas.map((elem: any) => {                        
                        var dt = new Date (elem.data);
                        return Object.assign({}, {data: dt, y: elem.registo});
                })
                
            });

            }   
        );
    }

    render() {


        //----------------------------------------------------------------------

        const noLegend={ legend: { display: false} }; 
        
        //----------------------------------------------------------------------

        var xPeso: any[] = [], yPeso: number[] = [];
        this.state.peso.forEach((ref)=>{
            xPeso.push(""+ref.data.getDate()+"/"+(ref.data.getMonth()+1));
            yPeso.push(ref.y);
        });
        var dataPeso: any = JSON.parse(JSON.stringify(generalGraphSettings));
        dataPeso.labels = xPeso;
        dataPeso.datasets[0].data = yPeso;

        //----------------------------------------------------------------------

/*

        var dataMG_MM_PIE: any = JSON.parse(JSON.stringify(pieGraphSettings));
        dataMG_MM_PIE.datasets[0].data = [this.state.massaMagra.pop()?.y,
                                          this.state.massaGorda.pop()?.y];

*/                                          

        //----------------------------------------------------------------------

        var xCintura : any[] = [], yCintura: number[] = [];
        this.state.cintura.forEach((ref) => {
            xCintura.push(""+ref.data.getDate()+"/"+(ref.data.getMonth()+1));
            yCintura.push(ref.y);
        });
        var dataCintura: any = JSON.parse(JSON.stringify(generalGraphSettings));
        dataCintura.labels = xCintura;
        dataCintura.datasets[0].data = yCintura;

        //----------------------------------------------------------------------

        var menuOp = this.state.menuOpt;
        
        if(this.state.menuOpt !== menuOp) {

            this.setState( { menuOpt: menuOp } )
        } 

        //----------------------------------------------------------------------

        return(

            <IonPage>
            
                {/* Page title */}

                <IonHeader>
                <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle id="page-title">Evolução Física</IonTitle>
                </IonToolbar>
                </IonHeader>
            
                {/* Menu superior para escolha de grupo de gráficos */}
            
                <IonList>
                    
                    {/*
                    <IonListHeader>
                        <IonLabel></IonLabel>
                    </IonListHeader>
                    */}

                    <IonItem>
    
                            <IonSelect className="SelectionMenuItem" interfaceOptions={customActionSheetOptions} value={this.state.menuOpt} placeholder="Select One" onIonChange={
                                e =>this.setState( {menuOpt:e.detail.value})
                            }>

                                <IonSelectOption value="compoCorporalOption">Composição corporal</IonSelectOption>
                                <IonSelectOption value="perimCorporalOption">Perímetros corporais</IonSelectOption>

                            </IonSelect>
                    </IonItem>

                </IonList>

                {/* Gráficos disponiveis */}

                <IonContent className="ionContent">
                
                <IonGrid className="grid">

                    <IonRow class="ion-justify-content-center">
                    
                        {( () => {
                            
                            //Apresentar diferentes menus mediante a seleção
                            switch(this.state.menuOpt) {
                                
                                //Caso a seleção de gráficos seja composição corporal
                                case "compoCorporalOption": 
                                
                                    return(

                                        <React.Fragment>
                                            
                                            {/* Gráfico de Evolução do Peso */}

                                            <IonCol sizeXs="12" size-Sm ="12" sizeMd="6" sizeLg="6">

                                                <IonCard className="titleCard">

                                                    <IonCardHeader>
                                                        <IonCardTitle><div className="textWrapper">Peso</div></IonCardTitle>
                                                        <IonCardSubtitle><div className="textWrapper">(em Kg)</div></IonCardSubtitle>
                                                    </IonCardHeader>

                                                </IonCard>

                                                <div className="evoStats">
                                                    <Line ref="lineChart" data={dataPeso} options={noLegend} />
                                                </div>

                                            </IonCol>

                                            <IonCol sizeXs="12" size-Sm ="12" sizeMd="6" sizeLg="6">

                                                <IonCard className="titleCard">

                                                    <IonCardHeader>
                                                        <IonCardTitle><div className="textWrapper">IMC</div></IonCardTitle>
                                                        <IonCardSubtitle><div className="textWrapper">(Índice)</div></IonCardSubtitle>
                                                    </IonCardHeader>

                                                </IonCard>

                                                <div className="evoStats">
                                                    <Line ref="lineChart" data={dataPeso} options={noLegend} />
                                                </div>

                                            </IonCol>

                                        </React.Fragment>
                                    );

                                //Caso a seleção de gráficos seja composição corporal
                                case "perimCorporalOption": 
                                
                                    return(

                                        <React.Fragment>
                                            
                                            {/* Gráfico de Evolução do Peso */}
                                            <IonCol sizeXs="12" size-Sm ="12" sizeMd="6" sizeLg="6">

                                                <IonCard className="titleCard">

                                                    <IonCardHeader>
                                                        <IonCardTitle><div className="textWrapper">Cintura</div></IonCardTitle>
                                                    </IonCardHeader>

                                                </IonCard>

                                                <div className="evoStats">
                                                    <Line ref="lineChart" data={dataCintura} options={noLegend} />
                                                </div>

                                            </IonCol>

                                        </React.Fragment>
                                    );

                                    default:
                                        
                                        return( 
                                            <IonCol sizeXs="12" size-Sm ="12" sizeMd="6" sizeLg="6">
                                            {/* Empty option */}
                                            </IonCol>
                                        );

                            } //close switch

                        } //close anonymouse function
                    ) ()}

                    </IonRow>

                </IonGrid>

            </IonContent>
            

        </IonPage>
        );
    }

}

export default Evolucao;