import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, IonFooter } from "@ionic/react";
import { calendarOutline, personCircle, personCircleOutline } from "ionicons/icons";
import React from "react";
import { getAvaliacoesAgendadas, setAvaliacao } from "../../models/API/EvolucaoAPI";
import { getInstrutores } from "../../models/API/UserAPI";
import './css/AgendarAvaliacao.css';



export interface AvaliacaoAgendada{
    data : string
    instrutor_nome : string
    instrutor_email : string
}


interface SearchBar{
    query : string;
    list_init : string[];
    list_now : string[]
}
const avalInicial : AvaliacaoAgendada  = {
    data : new Date().toLocaleString(),
    instrutor_nome : "",
    instrutor_email: ""
}
const searchInit : SearchBar = {
    query : "",
    list_init : [],
    list_now : []
}

class AgendarAvaliacao extends React.Component<any>{
    state:{
        email : string;
        aval : AvaliacaoAgendada;
        avals : AvaliacaoAgendada[];
        instrutores : Map<string,string>;
       pickInstrutor : SearchBar; 
    }

    constructor(props : any){
        super(props);
        this.state={
            email :props.email,
            aval : avalInicial,
            avals : [],
            instrutores : new Map(),
            pickInstrutor : searchInit
        }
    }
    
    async componentDidMount(){
        var avals : AvaliacaoAgendada[] =[];
        var map : Map<string,string> = new Map<string,string>() ;
        var pick : SearchBar = this.state.pickInstrutor;
        const res = (await getAvaliacoesAgendadas(this.state.email));
        const res2 = (await getInstrutores());
        await res.json().then((data)=>{

            avals = JSON.parse(data).avaliacoes;
        });
        await res2.json().then((data)=>{
            var ret = data.instrutores;
            var i;
            for( i in ret){
           map.set(i,ret[i]);
           pick.list_init.push(i);
        }
        });

        
        this.setState({ avals: avals, pickInstrutor :pick ,instrutores : map });
    }

    setDate(date : string){
        var aval : AvaliacaoAgendada = this.state.aval;
        aval.data=date;
        this.setState({aval : aval });
    }
    setQuery(query : string){
        console.log(this.state);
        var pick = this.state.pickInstrutor;
        pick.query = query;
        if(query===""){pick.list_now=[]}
            else{
        pick.list_now = (this.state.pickInstrutor.list_init.filter((value)=> value.toLowerCase().indexOf(query.toLowerCase()) >= 0)).slice(0,4);}
        this.setState({
            pickInstrutor : pick
        })

    }
   async selectInstrutor(mail: string) {
        var aval = this.state.aval;
        var st = this.state.instrutores.get(mail);
        var nome = st ? st : "" ;
        console.log(st);
        
        var resetSearch :SearchBar ={query: "",list_now :[],list_init : this.state.pickInstrutor.list_init } 
        


        aval.instrutor_email = mail;    
        aval.instrutor_nome = nome;
        this.setState({ aval: aval, pickInstrutor: resetSearch })
    }

    setAgendacao() {
        setAvaliacao(this.state.email,this.state.aval).then(
            (data) => {
                console.log(data.status);
            }
        )
        alert("Avaliação Marcada");
        window.location.reload();
    }


    render(){
        var localVals = this.state.avals;
    
        




        return(
            <IonPage>
    
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle id="page-title">Agenda de Avaliações</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
    
    <IonCard className="cardAval">
        <IonCardHeader>
            <IonItem>
        <IonCardTitle className = "cardTitle"><b>Agendar Avaliação</b> </IonCardTitle>
        <IonButton color="success" onClick={()=>this.setAgendacao()} slot="end">
            Submeter
        </IonButton>
        </IonItem>
        </IonCardHeader>
        <IonItem>

        <IonIcon icon={calendarOutline}></IonIcon>
        <IonLabel className="data" > <b>&nbsp;</b>Data:</IonLabel>
              <IonDatetime  displayFormat="DD-MM-YYYY HH:mm" value={this.state.aval.data} onIonChange={e => this.setDate(e.detail.value!)}></IonDatetime>

        </IonItem>
        <IonItem>
        <IonIcon icon={personCircleOutline}></IonIcon>
        <IonLabel>
        &nbsp;Instrutor: 
        </IonLabel>
        <IonLabel slot="end">
              {this.state.aval.instrutor_nome}
        </IonLabel>
    </IonItem>
        <IonItem>
              <IonLabel>Instrutor:</IonLabel>
              <IonToolbar>
                    <IonSearchbar value={this.state.pickInstrutor.query} onIonChange={e => this.setQuery(e.detail.value!)} placeholder="Email do instrutor...">
                    </IonSearchbar>
            </IonToolbar>
            </IonItem>{this.state.pickInstrutor.list_now.length!==0? (
        <IonItem>
            <IonList>
                    {this.state.pickInstrutor.list_now.map(
                    (element)=> { return(
                    <IonItem key={element} className="item" button={true}  onClick={() =>this.selectInstrutor(element)}>
                        <IonIcon className="icon" icon ={personCircle}></IonIcon>
                        <IonLabel color="primary" >{element}</IonLabel>
                    </IonItem>
                    )}
                    )}
    </IonList>
    </IonItem>
            ):(<React.Fragment></React.Fragment>) }
            

</IonCard>

<IonRow className="avalRow">
{localVals.map((elem)=>
    
    <IonCard key={elem.data + elem.instrutor_nome} className="cardCol">
    <IonItem><IonIcon icon={calendarOutline }></IonIcon><IonLabel>&nbsp;Data: {elem.data}</IonLabel></IonItem>
    <IonItem><IonIcon icon={personCircleOutline}></IonIcon><IonLabel>&nbsp;Instrutor: {elem.instrutor_nome}</IonLabel></IonItem>
    </IonCard>
   
)}
</IonRow>

<IonCard className = "cardAval">

</IonCard>
</IonContent>
<IonFooter>
          <IonToolbar class="ion-text-center">
            <IonTitle border-top size="small">© UMFit 2020</IonTitle>
          </IonToolbar>
        </IonFooter>
</IonPage>
        )
}
    
}

export default AgendarAvaliacao;