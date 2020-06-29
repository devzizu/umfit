
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, IonAlert, IonLoading } from "@ionic/react";
import { addCircleSharp, addOutline, closeCircleSharp, trashOutline } from "ionicons/icons";
import React from "react";
import { getListaExercicios, setPlanoTreino } from "../../models/API/PlanoTreinoAPI";
import { getAllClientsPremium, selectUser } from "../../models/API/UserAPI";
import { Exercicio, PlanoTreino } from "../../models/Other/PlanoTreino";
import "../css/CriarPlanoTreino.css";

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

        alert: string

        loading: string
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

            loading: "",
            alert:"",
    

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

            planotreino : new PlanoTreino("","","","","", new Array<Exercicio>())

        }        
    }

    async setUserMail(mail: any){
        var user = await selectUser(mail);
        user.json().then(
            (json)=>{
                var user =  JSON.parse(json);
                this.setState({user_nome : user.user.name,user_mail: mail})
            }
        )

        

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
        this.setState({alert: "Exercico Adicionado!",lista_ex_selecionados: list_ex})


    }

    rmExercico(indice : any){

        var list_ex = JSON.parse(JSON.stringify(this.state.lista_ex_selecionados))

        list_ex.splice(indice, 1)

        this.setState({alert: "Exercico Removido!",lista_ex_selecionados: list_ex})
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
            alert:"Plano limpo!",
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
        this.setState({loading : "A criar plano..."});

        var pt: PlanoTreino = new PlanoTreino(  this.state.nome_treino, 
                                                this.state.tipo_treino, 
                                                this.state.grup_muscular, 
                                                this.state.frequencia,
                                                this.state.data_fim, 
                                                this.state.lista_ex_selecionados
                                                )

        var resultado = {

            email: this.state.user_mail,
            planotreino: pt,
            valueST : localStorage.getItem("token")
        }
        setPlanoTreino(resultado).then(
            async (value: any) =>{
                this.setState({loading:""})
                switch (value.status){
                    case 200 : this.setState({alert : "Plano Adicionado"});break;
                    case 400 : this.setState({alert :"Verifique se os campos estão válidos"}); break;
                }});

        console.log(resultado)
    }

   async componentDidMount(){
        var emails : string[];
        await getAllClientsPremium().then(
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
            <IonTitle id="page-title">Novo Plano de Treino</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="separador"></div>

        <IonContent>
        <IonLoading
      isOpen={this.state.loading!==""}
      onDidDismiss={() => {this.setState({loading: ""})}}
      message={this.state.loading}
    />
        <IonAlert
          isOpen={this.state.alert!==""}
          onDidDismiss={() => this.setState({alert : ""})}
          header={'Aviso'}
          message={this.state.alert}
          buttons={['Ok, percebido!']}
        />

            <IonCard className="card-left">
                <IonText className="responsiveTitle">Email (para clientes Premium):</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-mails">

                <IonRow >
                    <IonCol>
                        <IonSearchbar className="searchMail"
                                    placeholder="E-Mail?" 
                                    value={this.state.mail_inserido} 
                                    onIonChange={e => this.setSearchMail(e.detail.value!)}>
                        </IonSearchbar>
                    </IonCol>
                </IonRow>

                <IonRow >
                    <IonCol>
                        <IonContent className="mailList">
                            <IonList>
                                <IonRadioGroup value={this.state.user_mail} onIonChange={e => this.setUserMail(e.detail.value)}>
                                    {
                                        lista_mails_resultado.map(function(s :any){

                                            return( <IonItem key={s}>
                                                        <IonLabel class="ion-text-wrap"><div className="detailsPlanoTreino">{s}</div></IonLabel>
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
                <IonText className="responsiveTitle">Utilizador Selecionado:</IonText>            
            </IonCard>
            
            <IonCard className="card-left">
                <img className="ProfilePicPlanoTreino" src={require('../../imgs/perfil_pic.png')} alt="Loading..."/>
                <IonCardContent className="detailsPlanoTreino">
                    <b>Nome:</b> {this.state.user_nome}
                    <br></br>

                    <b>Email:</b> {this.state.user_mail}
                </IonCardContent>
            </IonCard>
        
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitle">Especificações do Plano de treino:</IonText>            
            </IonCard>


            <IonCard className="card-center"> 
                <IonList className="descricao-plano">
                    <IonItem >
                        <IonLabel><div className="detailsPlanoTreino">Nome:</div></IonLabel>
                        <IonInput value={this.state.nome_treino} onIonChange={e => {this.setNomeTreino(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel><div className="detailsPlanoTreino">Tipo: </div></IonLabel>
                        <IonInput value={this.state.tipo_treino} onIonChange={e => {this.setTipo(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel><div className="detailsPlanoTreino">Grupos Musc.: </div></IonLabel>
                        <IonInput value={this.state.grup_muscular} onIonChange={e => {this.setGrpMu(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel><div className="detailsPlanoTreino">Frequência: </div></IonLabel>
                        <IonInput value={this.state.frequencia} onIonChange={e => {this.setFreq(e.detail.value)}}/>
                    </IonItem>
                    <IonItem>                 
                        <IonLabel class="ion-text-wrap" className="detailsPlanoTreino">  Data de Fim:</IonLabel>
                            <IonDatetime className="minquarterWidth" value={this.state.data_fim} onIonChange={(e) => {this.setState({ data_fim: e.detail.value! })}}></IonDatetime>
                         </IonItem>
                </IonList> 
            </IonCard>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitle">Seleção de Exercícios:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-exercicios">
                
                <IonRow className="espaco-vertical-search">
                    <IonToolbar>
                        <IonSearchbar className="searchMail"
                                value={this.state.nome_exercicio} 
                                onIonChange={e => this.setSearchExercicio(e.detail.value!)}
                                placeholder="Exercício?"></IonSearchbar>
                        </IonToolbar>
                    
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonContent className="mailList">
                            <IonList>
                                <IonRadioGroup value={this.state.exercicio.nome} onIonChange={e => this.setNomeEx(e.detail.value)}>
                                    {
                                        lista_ex_resultado.map(function(s :any){

                                            return( <IonItem key={s}>
                                                        <IonLabel>{s}</IonLabel>
                                                        <IonRadio value={s}/>
                                                    </IonItem>)
                                        })      
                                    }  
                                </IonRadioGroup>
                            </IonList>
                        </IonContent>
                    </IonCol>
                </IonRow>
                <br></br>

                    <IonRow>

                        <IonCol>
                            <IonText className="detailsPlanoTreino">Repetições</IonText>            
                        </IonCol>

                        <IonCol>
                            <IonInput className="repetSeriInput" type="number" value={this.state.exercicio.nm_repeticoes} onIonChange={e => this.setRepeticoesEx(e.detail.value!)}></IonInput>
                        </IonCol>

                        <IonCol></IonCol>
                        <IonCol></IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                    
                    <IonRow>

                        <IonCol>
                            <IonText className="detailsPlanoTreino">Séries</IonText>            
                        </IonCol>

                        <IonCol>
                            <IonInput className="repetSeriInput" type="number" value={this.state.exercicio.nm_series} onIonChange={e => this.setSeriesEx(e.detail.value!)}></IonInput>
                        </IonCol>

                        <IonCol></IonCol>
                        <IonCol></IonCol>
                        <IonCol></IonCol>

                    </IonRow>
                    <IonRow>
                        <IonItem>
                            <IonText><div className="detailsPlanoTreino">Novo Exercício:</div></IonText>
                            <IonInput className="newExercise" onIonChange={e => this.setNovoEx(e.detail.value!)}></IonInput>
                        </IonItem>
                    </IonRow>
                                    <br></br>
                <IonRow>
                    <IonCol>
                        <IonContent className="AddButton">
                            <IonButton onClick={async () =>{ this.addExercicio()}}>
                                Adicionar exercício &nbsp; <IonIcon icon={addCircleSharp} />
                            </IonButton>
                        </IonContent>
                    </IonCol>

                </IonRow>

            </IonGrid>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitle">Lista de exercícios selecionados:</IonText>            
            </IonCard>                        
                         
            <IonGrid className="final-ex-table">
                <IonCard className="background-orange">
                    <IonCardContent>
                        <IonRow>

                            <IonCol>
                                <IonLabel className="detailsPlanoTreino"><b>Exercício:</b></IonLabel>
                            </IonCol >

                            <IonCol>
                                <IonLabel className="detailsPlanoTreino"><b>Repetições:</b></IonLabel>
                            </IonCol >

                            <IonCol>
                                <IonLabel className="detailsPlanoTreino"><b>Séries:</b></IonLabel>
                            </IonCol >

                        </IonRow>
                    </IonCardContent>
                </IonCard>
                    {
                        this.state.lista_ex_selecionados.map((s, i) => (

                            <IonCard className="bordersGrid" key={s.nome} >
                                <IonCardContent>
                                    <IonRow>

                                        <IonCol className="search-content">
                                            <IonLabel className="detailsPlanoTreino">{s.nome}</IonLabel>
                                        </IonCol >

                                        <IonCol className="search-content">
                                            <IonLabel className="detailsPlanoTreino">{s.nm_repeticoes}</IonLabel>
                                        </IonCol >

                                        <IonCol className="search-content">
                                            <IonLabel className="detailsPlanoTreino">{s.nm_series}</IonLabel>
                                        </IonCol >

                                        <IonButton onClick={async () => {this.rmExercico.call(this, i)}}>
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
            <div className="separador"></div>

            <IonGrid className="grid-exercicios">
                <IonRow>
                    <IonCol>
                            <IonButton className="botaoGridPT" color= "success" onClick={async () => {this.limparPlanoTreino.call(this)}}>
                                Limpar
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>

                            <IonButton className="botaoGridPT" onClick={async () => {this.addPlanoTreino.call(this)}}>
                                Adicionar
                                <IonIcon slot="icon-only" icon={addOutline}/>
                            </IonButton>
                    
                            </IonCol>
                </IonRow>
            </IonGrid>

        </IonContent>
 
        

      </IonPage>
    );
    }
    
}

export default CriarPlanoTreino;

