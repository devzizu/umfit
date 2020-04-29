import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { calendarOutline, personCircle, personCircleOutline } from "ionicons/icons";
import React from "react";
import '../css/AgendarAvaliacao.css';



interface AvaliacaoAgendada{
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
    data : new Date().toLocaleDateString(),
    instrutor_nome : "",
    instrutor_email: ""
}
const searchInit : SearchBar = {
    query : "",
    list_init : [],
    list_now : []
}
const avalsInicial :AvaliacaoAgendada[] =[
    {
        data : new Date().toLocaleDateString(),
        instrutor_nome : "a name",
        instrutor_email: "a"
    },{
        data : new Date().toLocaleDateString(),
        instrutor_nome : "b name",
        instrutor_email: "b"
    },{
        data : new Date().toLocaleDateString(),
        instrutor_nome : "b name",
        instrutor_email: "c"
    },{
        data : new Date().toLocaleDateString(),
        instrutor_nome : "b name",
        instrutor_email: "d"
    },{
        data : new Date().toLocaleDateString(),
        instrutor_nome : "b name",
        instrutor_email: "e"
    }
]
class AgendarAvaliacao extends React.Component{
    state:{
       aval : AvaliacaoAgendada;
       avals : AvaliacaoAgendada[];
       pickInstrutor : SearchBar; 
    }

    constructor(props : any){
        super(props);
        this.state={
            aval : avalInicial,
            avals : [],
            pickInstrutor : searchInit
        }
    }
    
    async componentDidMount(){
        var avals : AvaliacaoAgendada[] =avalsInicial;
        var instrutores : string[] = ["Yee@1","lol@ggMale.com","owoBuntu@chk.me.dasddy","Yede@1","lol@ggMalue.com","owoBuntou@chk.me.ddy","Yee@ss1","lol@ggMaleom","owoBuntu@chk.me.dd55y","Yee@1420","lol@gjgMale.co0000m","owoBuutynhgntu@chk.me.ddy","Ysee@1","loal@ggMale.com","owaoBuntu@chk.me.ddy"];
        var pick : SearchBar = this.state.pickInstrutor;
        //await getAvaliacoesAgendadas().then()
        //await getInstrutores().then()
        pick.list_init = instrutores;
        this.setState({ avals: avals, pickInstrutor :pick });
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
        var nome = "Josue";
        //Reset Search ao selecionar (sq irritante, further testing required)   
        var resetSearch :SearchBar ={query: "",list_now :[],list_init : this.state.pickInstrutor.list_init } 
        //await getInstrutor(mail).then({SET NOME; SET EMAIL})


        aval.instrutor_email = mail;    
        aval.instrutor_nome = nome;
        this.setState({ aval: aval, pickInstrutor: resetSearch })
    }

    setAgendacao() {
        //setAvaliacao().then
        alert("Avaliação Marcada");
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
  
   
              <IonDatetime  displayFormat="DD-MM-YYYY" value={this.state.aval.data} onIonChange={e => this.setDate(e.detail.value!)}></IonDatetime>

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
    
    <IonCard key={Math.random()} className="cardCol">
    <IonItem><IonIcon icon={calendarOutline }></IonIcon><IonLabel>&nbsp;Data: {elem.data}</IonLabel></IonItem>
    <IonItem><IonIcon icon={personCircleOutline}></IonIcon><IonLabel>&nbsp;Instrutor: {elem.instrutor_nome}</IonLabel></IonItem>
    </IonCard>
   
)}
</IonRow>

<IonCard className = "cardAval">

</IonCard>
</IonContent>
</IonPage>
        )
}
    
}

export default AgendarAvaliacao;