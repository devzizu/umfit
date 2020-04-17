
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonItem, IonList, IonText, IonLabel, IonRadio, IonRadioGroup, IonButton, IonIcon, IonRow, IonCol, IonGrid, IonDatetime} from "@ionic/react";
import "../css/CriarPlanoTreino.css"
import {addCircleSharp, closeCircleSharp, addOutline, trashOutline } from "ionicons/icons";
import { PlanoTreino, Exercicio } from "../../models/Other/PlanoTreino";
import { getAllClients } from "../../models/API/UserAPI";
import { getListaExercicios, setPlanoTreino } from "../../models/API/PlanoTreinoAPI";

class CriarPlanoTreino extends React.Component<any>{

    state: {
        
        nome_treino: string
        tipo_treino: string
        grup_muscular: string
        frequencia: string
        data_inicio:string
        data_fim:string

        lista_mails_inicial: Array<string>
        mail_inserido: string

        user_mail: string
        user_nome: string

        lista_ex_inicial: Array<string>
        lista_ex_selecionados: Array<Exercicio>

        nome_exercicio: string
        exercicio: Exercicio
        
        planotreino: PlanoTreino
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            nome_treino: "",
            tipo_treino: "",
            grup_muscular: "",
            frequencia: "",
            data_inicio:"",
            data_fim:"",
    

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

            planotreino : new PlanoTreino("","","","","","", new Array<Exercicio>())

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

        var pt: PlanoTreino = new PlanoTreino(  this.state.nome_treino, 
                                                this.state.tipo_treino, 
                                                this.state.grup_muscular, 
                                                this.state.frequencia,
                                                this.state.data_inicio,
                                                this.state.data_fim, 
                                                this.state.lista_ex_selecionados
                                                
                                                )

        var resultado = {

            email: this.state.user_mail,
            planotreino: pt
        }
        setPlanoTreino(resultado).then(
            async (value: any) =>{
                if (value.status === 200){ 
                    alert("Plano Adicionado!")
                }});

        console.log(resultado)
    }

    componentDidMount(){
        var emails =  ["paulo.280999@gmail.com", "firmino.100999@gmail.com", "amelia.280999@gmail.com", "dillaz.280999@gmail.com", "bispo.280999@gmail.com", "nbc.280999@gmail.com"];
        getAllClients().then(
            async (value) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();

                    await json.then((value) => {
                        console.log(value);
                        emails= value.users;
                        this.setState({lista_mails_inicial:emails})
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            })
            .catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
        var exercicios :string[] = [""];
         getListaExercicios().then(
            async (value) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();
                    

                await  json.then((value : any) => {
                        console.log(value);
                        exercicios = JSON.parse(value).exercicios;
                        this.setState({lista_ex_inicial: exercicios});  
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            })
            .catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });

          

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
            <IonTitle id="page-title">Criar Plano Treino</IonTitle>
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
                <IonText className="text-title">Especificações do Plano de treino:</IonText>            
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
                    <IonItem>
                                                <IonLabel class="ion-text-wrap" className="quarterWidth">  Data de Inicio:</IonLabel>
                                                <IonDatetime className="minquarterWidth" value={this.state.data_inicio} onIonChange={(e) => {this.setState({ data_inicio: e.detail.value! })}}></IonDatetime>

                                               
                                                <IonLabel class="ion-text-wrap" className="quarterWidth">  Data de Fim:</IonLabel>
                                                <IonDatetime className="minquarterWidth" value={this.state.data_fim} onIonChange={(e) => {this.setState({ data_fim: e.detail.value! })}}></IonDatetime>
                                            </IonItem>
                </IonList> 
            </IonCard>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Seleção de Exercícios:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-exercicios">
                
                <IonRow className="espaco-vertical-search">
                    <IonToolbar>
                        <IonSearchbar className="background-orange"
                                value={this.state.nome_exercicio} 
                                onIonChange={e => this.setSearchExercicio(e.detail.value!)}
                                placeholder="nome do exercicicio"></IonSearchbar>
                        </IonToolbar>
                    
                </IonRow>
                
                <IonRow className="espaco-vertical-search">
                    <IonCol>
                        <IonContent>
                            <IonList>
                                <IonRadioGroup value={this.state.exercicio.nome} onIonChange={e => this.setNomeEx(e.detail.value)}>
                                    {
                                        lista_ex_resultado.map(function(s :any){

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
                    
                    <IonCol className="distancia-horizontal">
                        <IonText className="search-content">Número de repetições:</IonText>
                        <IonInput type="number" className="search-bar" value={this.state.exercicio.nm_repeticoes} onIonChange={e => this.setRepeticoesEx(e.detail.value!)}></IonInput>

                        <IonText className="search-content">  <br></br> Número de séries:</IonText>
                        <IonInput type="number" className="search-bar" value={this.state.exercicio.nm_series} onIonChange={e => this.setSeriesEx(e.detail.value!)}></IonInput>
                    </IonCol>


                    <IonCol className="distancia-horizontal">
                        <IonContent>
                            <IonButton size="large" onClick={async () =>{ this.addExercicio()}}>
                                <IonIcon slot="icon-only" icon={addCircleSharp} />
                            </IonButton>
                        </IonContent>
                    </IonCol>

                </IonRow>

                <IonRow>
                <IonList className="descricao-plano">
                    <IonItem>
                    <IonLabel class="ion-text-wrap">Novo Exercício:</IonLabel>
                    <IonInput onIonChange={e => this.setNovoEx(e.detail.value!)}></IonInput>
                    </IonItem>
                    </IonList>
                </IonRow>

            </IonGrid>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Lista de exercícios selecionados:</IonText>            
            </IonCard>                        
                         
            <IonGrid className="grid-exercicios">
                <IonCard className="background-orange">
                    <IonCardContent>
                        <IonRow>

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><b>Nome do Exercício</b></IonLabel>
                            </IonCol >

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><b>Número de Repetições</b></IonLabel>
                            </IonCol >

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><b>Número de Séries</b></IonLabel>
                            </IonCol >

                        </IonRow>
                    </IonCardContent>
                </IonCard>
                    {
                        this.state.lista_ex_selecionados.map((s, i) => (

                            <IonCard key={s.nome} >
                                <IonCardContent>
                                    <IonRow>

                                        <IonCol className="search-content">
                                            <IonLabel class="ion-text-wrap">{s.nome}</IonLabel>
                                        </IonCol >

                                        <IonCol className="search-content">
                                            <IonLabel class="ion-text-wrap">{s.nm_repeticoes}</IonLabel>
                                        </IonCol >

                                        <IonCol className="search-content">
                                            <IonLabel  class="ion-text-wrap">{s.nm_series}</IonLabel>
                                        </IonCol >

                                        <IonButton size="small" onClick={async () => {this.rmExercico.call(this, i)}}>
                                            <IonIcon slot="icon-only" icon={closeCircleSharp}/>
                                        </IonButton>

                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                        ))
                    }     

                    <IonContent >
                <IonButton size="large" className="botao-adicionar">
                    <IonText> Adicionar Plano de treino</IonText>
                    <IonIcon slot="icon-only" icon={addOutline}/>
                </IonButton>
            </IonContent>
               
            </IonGrid>

            <IonGrid className="grid-exercicios">
                <IonRow>

                    <IonCol>
                            <IonButton size="large" className="botao" color= "success" onClick={async () => {this.limparPlanoTreino.call(this)}}>
                                <IonText> Limpar Plano de treino</IonText>
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>
                    </IonCol>

                    <IonCol>
                        
                            <IonButton size="large" className="botao" onClick={async () => {this.addPlanoTreino.call(this)}}>
                                <IonText> Adicionar Plano de treino</IonText>
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

