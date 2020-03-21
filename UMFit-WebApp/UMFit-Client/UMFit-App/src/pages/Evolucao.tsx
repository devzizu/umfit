
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

import CanvasJSReact from "../external-libs/canvasjs.react";

import "./css/Evolucao.css";

interface registoAvaliacao {
    data: Date,
    peso: number
}

class Evolucao extends React.Component {

    state: {
        values: Array<registoAvaliacao>
    }

    constructor(props: any) {

        super(props);        

        this.state = ({
            values: new Array<registoAvaliacao>()
        });
    }

    componentDidMount() {

        this.setState({
            values: [
                {x: new Date(2020, 0, 21), y: 98},
                {x: new Date(2020, 3, 2), y: 95},
                {x: new Date(2020, 5, 23), y: 93},
                {x: new Date(2020, 7, 12), y: 88},
                {x: new Date(2020, 10, 18), y: 82}
            ]
        });
    }

    render() {
        
        const options = {
			animationEnabled: true,
			exportEnabled: false,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Bounce Rate by Week of Year"
			},
			axisY: {
				title: "Bounce Rate",
				includeZero: false,
				suffix: "%"
			},
			axisX: {
				title: "Week of Year",
				prefix: "W",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "No mês {x} tinhas {y} kg",
				dataPoints:this.state.values
			}]

        }

        return(
            <IonPage>

                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle id="page-title">Evolução</IonTitle>
                    </IonToolbar>
                </IonHeader>

            <IonContent>
                <CanvasJSReact.CanvasJSChart options = {options} />
            </IonContent>

            </IonPage>
        );
    }

}

export default Evolucao;