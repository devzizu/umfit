
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonItem, IonList, IonText, IonLabel, IonRadio, IonRadioGroup, IonButton, IonIcon, IonRow, IonCol, IonGrid} from "@ionic/react";
import "../css/CriarAvaliacao.css"
import {addCircleSharp, closeCircleSharp, addOutline, trashOutline } from "ionicons/icons";
import { Avaliacao, Exercicio } from "../../models/Other/Avaliacao";

class CriarPlanoTreino extends React.Component<any>{

    state: {
        
        nome_treino: string
        tipo_treino: string
        grup_muscular: string
        frequencia: string

        lista_mails_inicial: Array<string>
        mail_inserido: string

        user_mail: string
        user_nome: string

        lista_ex_inicial: Array<string>
        lista_ex_selecionados: Array<Exercicio>

        nome_exercicio: string
        exercicio: Exercicio
        
        avaliacao: Avaliacao
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            nome_treino: "",
            tipo_treino: "",
            grup_muscular: "",
            frequencia: "",

            lista_mails_inicial: new Array<string>(),
            mail_inserido: "",

            user_mail: "",
            user_nome: "",

            lista_ex_inicial: new Array<string>(),
            lista_ex_selecionados: new Array<Exercicio>(),

            nome_exercicio: "",

            exercicio: {
                nome: "",
                nm_repeticoes: "", 
                nm_series: ""
            },

            avaliacao : new Avaliacao("","","","", new Array<Exercicio>())

        }        
    }

    setUserMail(mail: any){

        this.setState({user_mail: mail})
    }

    setNomeTreino(nome: any){

        this.setState({nome_treino: nome})
    }

    setTipo(tip: any) {
        this.setState({tipo_treino: tip})
    }
    
    setGrpMu(grp: any) {
        this.setState({grup_muscular: grp})
    }
    
    setFreq(freq: any) {
        this.setState({frequencia: freq})
    }

    setNovoEx(string: string){

        this.setState({exercicio: Object.assign(this.state.exercicio,{nome: string})})
 
    }

    setNomeEx(nome: any){

        this.setState({botao_premido: true})
        this.setState({exercicio: Object.assign(this.state.exercicio,{nome: nome})})
    }

    setRepeticoesEx(nr_reps: any){

        this.setState({exercicio: Object.assign(this.state.exercicio,{nm_repeticoes: nr_reps})})
    }

    setSeriesEx(nr_sers: any){

        this.setState({exercicio: Object.assign(this.state.exercicio,{nm_series: nr_sers})})
    }

    addExercicio(){

        console.log("ADICIONEI EXERCICIO")
        var list_ex = JSON.parse(JSON.stringify(this.state.lista_ex_selecionados))

        var Exercicio = JSON.parse(JSON.stringify(this.state.exercicio))

        list_ex.push(Exercicio)
        this.setState({lista_ex_selecionados: list_ex})
    }

    rmExercico(indice : any){

        var list_ex = JSON.parse(JSON.stringify(this.state.lista_ex_selecionados))

        list_ex.splice(indice, 1)

        this.setState({lista_ex_selecionados: list_ex})
    }

    setSearchMail(stringSearch: any){

        this.setState({mail_inserido: stringSearch})
    }

    setSearchExercicio(stringSearch: any) {
        
        this.setState({nome_exercicio: stringSearch})

    }      

    limparPlanoTreino(){



        this.setState({

            nome_treino: "",
            tipo_treino: "",
            grup_muscular: "",
            frequencia: "",

            lista_ex_selecionados: new Array<Exercicio>(),

            nome_exercicio: "",

            exercicio: {
                nome: "",
                nm_repeticoes: "", 
                nm_series: ""
            }
        })
    }

    addPlanoTreino(){

        var pt: Avaliacao = new Avaliacao(  this.state.nome_treino, 
                                                this.state.tipo_treino, 
                                                this.state.grup_muscular, 
                                                this.state.frequencia, 
                                                this.state.lista_ex_selecionados)

        var resultado = {

            email: this.state.user_mail,
            planotreino: pt
        }
        
        console.log(resultado)
    }

    componentDidMount(){
    
        this.setState({lista_ex_inicial: ["Supino Reto","Supino Inclinado","Supino Declinado","Supino c/halters","Pack Deck","Aberturas","Cross-Over","Flexoes","Tricep Francês","Barra à Testa","Afundos","Bicep Curl","Bicep Martelo","Bicep Concentrado","Bicep c/barra","Elevaçoes"]});    
        this.setState({lista_mails_inicial: ["paulo.280999@gmail.com", "firmino.100999@gmail.com", "amelia.280999@gmail.com", "dillaz.280999@gmail.com", "bispo.280999@gmail.com", "nbc.280999@gmail.com"]})
        
    }
    

    render(){
    
    const query = this.state.nome_exercicio
    const mail = this.state.mail_inserido
    
    var lista_ex_resultado = this.state.lista_ex_inicial.filter(function(value){
        return value.toLowerCase().indexOf(query.toLowerCase()) >= 0;})    

    var lista_mails_resultado = this.state.lista_mails_inicial.filter(function(value){
        return value.toLowerCase().indexOf(mail.toLowerCase()) >= 0;})    

    console.log(this.state.exercicio.nome)
    
    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Criar Avaliação</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>

            <IonCard className="card-left">
                <IonText className="text-title">Email:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-mails">

                <IonRow >
                    <IonCol>
                        <IonSearchbar className="background-orange"
                                    placeholder="email do cliente" 
                                    value={this.state.mail_inserido} 
                                    onIonChange={e => this.setSearchMail(e.detail.value!)}>
                        </IonSearchbar>
                    </IonCol>
                </IonRow>

                <IonRow >
                    <IonCol>
                        <IonContent className="comprimento-lista-mails">
                            <IonList>
                                <IonRadioGroup value={this.state.user_mail} onIonChange={e => this.setUserMail(e.detail.value)}>
                                    {
                                        lista_mails_resultado.map(function(s :any){

                                            return( <IonItem key={s}>
                                                        <IonLabel class="ion-text-wrap">{s}</IonLabel>
                                                        <IonRadio value={s} slot="end"/>
                                                    </IonItem>)
                                            })      
                                    }  
                                </IonRadioGroup>
                            </IonList>
                        </IonContent>
                    </IonCol>
                </IonRow>

            </IonGrid>      
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Utilizador Selecionado:</IonText>            
            </IonCard>
            
            <IonCard className="card-left">
                <img src={require('../../imgs/perfil_pic.png')} width="100" height="100" alt="Loading..."/>
                <IonCardContent>
                    <b>Nome:</b> {this.state.user_mail.substring(0, this.state.user_mail.indexOf('@'))}
                    <br></br>
                    <br></br>
                    <b>Email:</b> {this.state.user_mail}
                </IonCardContent>
            </IonCard>
        
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Inserir dados para avaliação:</IonText>            
            </IonCard>


            <IonCard className="card-center"> 
                <IonList className="descricao-plano">
                    <IonItem >
                        <IonLabel class="ion-text-wrap">Nome: </IonLabel>
                        <IonInput value={this.state.nome_treino} onIonChange={e => {this.setNomeTreino(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap">Tipo: </IonLabel>
                        <IonInput value={this.state.tipo_treino} onIonChange={e => {this.setTipo(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap">Grupos Musculares: </IonLabel>
                        <IonInput value={this.state.grup_muscular} onIonChange={e => {this.setGrpMu(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap">Frequência Recomendada: </IonLabel>
                        <IonInput value={this.state.frequencia} onIonChange={e => {this.setFreq(e.detail.value)}}/>
                    </IonItem>
                </IonList> 
            </IonCard>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Seleção de Exercícios:</IonText>            
            </IonCard>
            
            <div className="separador"></div>           

            <IonGrid className="grid-exercicios">
                <IonRow>

                    <IonCol>
                            <IonButton size="large" className="botao" color= "success" onClick={async () => {this.limparPlanoTreino.call(this)}}>
                                <IonText> Limpar Avaliação</IonText>
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>
                    </IonCol>

                    <IonCol>
                        
                            <IonButton size="large" className="botao" onClick={async () => {this.addPlanoTreino.call(this)}}>
                                <IonText> Adicionar Avaliação</IonText>
                                <IonIcon slot="icon-only" icon={addOutline}/>
                            </IonButton>
                       
                    </IonCol>
                    
                </IonRow>
            </IonGrid>

        </IonContent>
 
        <IonFooter class="ion-no-border">
            <IonContent className="info-text"> © UMFit - 2020</IonContent>
        </IonFooter>

      </IonPage>
    );
    }
    
}

export default CriarPlanoTreino;

