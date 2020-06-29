
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleSharp, addOutline, closeCircleSharp, trashOutline } from "ionicons/icons";
import React from "react";
import { getListaRefeicoes, setPlanoAlimentar } from "../../models/API/PlanoAlimentarAPI";
import { getAllClientsPremium, selectUser } from "../../models/API/UserAPI";
import { PlanoAlimentar, Refeicao } from '../../models/Other/PlanoAlimentar';
import "../css/CriarPlanoAlimentar.css";

class CriarPlanoAlimentar extends React.Component<any>{

    state: {
        
        nome_plano_alimentar: string
        refeicoes_livres: string
        frequencia: string
        data_fim:string

        lista_mails_inicial: Array<string>
        mail_inserido: string

        user_mail: string
        user_nome: string

        lista_refeicoes_inicial: Array<string>
        lista_refeicoes_selecionados: Array<Refeicao>

        nome_refeicao: string
        refeicao: Refeicao

        loading : string
        alert :string
        
        planoAlimentar: PlanoAlimentar
    }

    constructor(props: any) {

        super(props);
    
        this.state = {

            nome_plano_alimentar: "",
            refeicoes_livres: "",
            frequencia: "",
            data_fim: "",

            lista_mails_inicial: new Array<string>(),
            mail_inserido: "",

            user_mail: "",
            user_nome: "",

            loading: "",
            alert: "",

            lista_refeicoes_inicial: new Array<string>(),
            lista_refeicoes_selecionados: new Array<Refeicao>(),

            nome_refeicao: "",

            refeicao: {
                nome: "",
                descricao: ""
            },

            planoAlimentar : new PlanoAlimentar("","","","",new Array<Refeicao>())

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

    setNomePlano(nome: any){

        this.setState({nome_plano_alimentar: nome})
    }
    
    setFreq(freq: any) {
        this.setState({frequencia: freq})
    }

    setRefLiv(refeicoes: any) {
        this.setState({refeicoes_livres: refeicoes})
    }
    
    setNomeRefeicao(nome: any){

        this.setState({refeicao: Object.assign(this.state.refeicao,{nome: nome})})
    }

    setDescricao(descri: any){

        this.setState({exercicio: Object.assign(this.state.refeicao,{descricao: descri})})
    }

    addRefeicao(){

        var list_refeicoes = JSON.parse(JSON.stringify(this.state.lista_refeicoes_selecionados))

        var Exercicio = JSON.parse(JSON.stringify(this.state.refeicao))

        list_refeicoes.push(Exercicio)
        this.setState({lista_refeicoes_selecionados: list_refeicoes})

        this.setState({exercicio: Object.assign(this.state.refeicao,{descricao: ""})})
    }

    rmRefeicao(indice : any){

        var list_refeicoes = JSON.parse(JSON.stringify(this.state.lista_refeicoes_selecionados))

        list_refeicoes.splice(indice, 1)

        this.setState({lista_refeicoes_selecionados: list_refeicoes})
    }

    setSearchMail(stringSearch: any){

        this.setState({mail_inserido: stringSearch})
    }

    setSearchExercicio(stringSearch: any) {
        
        this.setState({nome_refeicao: stringSearch})

    }      

    limparPlanoAlimentar(){

        this.setState({

            nome_plano_alimentar: "",
            refeicoes_livres: "",
            frequencia: "",

            lista_refeicoes_selecionados: new Array<Refeicao>(),
            
            alert: "Plano limpo!",

            nome_refeicao: "",

            exercicio: {
                nome: "",
                nm_repeticoes: "", 
                nm_series: ""
            }
        })
    }

    addPlanoAlimentar(){
        this.setState({loading:"A adicionar plano..."})

        var pa: PlanoAlimentar = new PlanoAlimentar(  this.state.nome_plano_alimentar,
                                                      this.state.refeicoes_livres, 
                                                      this.state.frequencia,
                                                      this.state.data_fim, 
                                                      this.state.lista_refeicoes_selecionados)

        var resultado = {

            email: this.state.user_mail,
            planoAlimentar: pa,
            valueST : localStorage.getItem("token")
        }
        setPlanoAlimentar(resultado).then(
            async (value: any) =>{
                switch (value.status){
                    case 200 : this.setState({loading:"",alert:"Plano Adicionado!"});break;
                    case 400 : this.setState({loading:"",alert:"Verifique se os campos estão válidos"}); break;
                }});
        console.log(resultado)
    }

    componentDidMount(){
        var  refeicoes:string[] =  [""];
        var  emails:string[] =  [""];

        getAllClientsPremium().then(
            async (value) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();

                    await json.then((value) => {
                        emails = value.users;
                        this.setState({lista_mails_inicial:emails})
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            })
            .catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });

        getListaRefeicoes().then(
           async (value) =>{
               if (value.status === 200) {                             
                   var json = value.json();
               await  json.then((value : any) => {
                       console.log(value);
                       refeicoes = JSON.parse(value).refeicoes;
                       this.setState({lista_refeicoes_inicial: refeicoes});  
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
    
    const query = this.state.nome_refeicao
    const mail = this.state.mail_inserido
    
    var lista_ex_resultado = this.state.lista_refeicoes_inicial.filter(function(value){
        return value.toLowerCase().indexOf(query.toLowerCase()) >= 0;})    

    var lista_mails_resultado = this.state.lista_mails_inicial.filter(function(value){
        return value.toLowerCase().indexOf(mail.toLowerCase()) >= 0;})    
    
    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle id="page-title">Novo Plano Alimentar</IonTitle>
          </IonToolbar>
        </IonHeader>

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

            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitlePA">Email (para clientes Premium):</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-mails">

            <IonRow >
                    <IonCol>
                        <IonSearchbar className="searchMailPA"
                                    placeholder="E-Mail?" 
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
                                                        <IonLabel class="ion-text-wrap"><div className="detailsPA">{s}</div></IonLabel>
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
                <IonText className="responsiveTitlePA">Utilizador Selecionado:</IonText>            
            </IonCard>
            
            <IonCard className="card-left">
                <img src={require('../../imgs/perfil_pic.png')} width="100" height="100" alt="Loading..."/>
                <IonCardContent>
                    <b>Nome:</b> {this.state.user_nome}
                    <br></br>
                    <br></br>
                    <b>Email:</b> {this.state.user_mail}
                </IonCardContent>
            </IonCard>
        
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitlePA">Especificações do Plano Alimentar:</IonText>            
            </IonCard>


            <IonCard className="card-center"> 
                <IonList className="descricao-plano">
                    <IonItem >
                        <IonLabel class="ion-text-wrap"><div className="detailsPA">Nome: </div></IonLabel>
                        <IonInput value={this.state.nome_plano_alimentar} onIonChange={e => {this.setNomePlano(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap"><div className="detailsPA">Frequencia: </div></IonLabel>
                        <IonInput value={this.state.frequencia} onIonChange={e => {this.setFreq(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap"><div className="detailsPA">Refeicoes Livres: </div></IonLabel>
                        <IonInput value={this.state.refeicoes_livres} onIonChange={e => {this.setRefLiv(e.detail.value)}}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel class="ion-text-wrap" ><div className="detailsPA">Data de Fim:</div></IonLabel>
                        <IonDatetime className="minquarterWidth" value={this.state.data_fim} onIonChange={(e) => {this.setState({ data_fim: e.detail.value! })}}></IonDatetime>

                    </IonItem>

                </IonList> 
            </IonCard>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitlePA">Seleção de Refeições:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-refeicoes">

                <IonRow className="espaco-vertical-search">
                    <IonToolbar>
                        <IonSearchbar className="searchMailPA"
                                value={this.state.nome_refeicao} 
                                onIonChange={e => this.setSearchExercicio(e.detail.value!)}
                                placeholder="Refeição?"></IonSearchbar>
                        </IonToolbar>
                    
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonContent className="mailListPA">
                            <IonList>
                                <IonRadioGroup value={this.state.refeicao.nome} onIonChange={e => this.setNomeRefeicao(e.detail.value)}>
                                    {
                                        lista_ex_resultado.map(function(s :any){

                                            return( <IonItem key={s}>
                                                        <IonLabel class="ion-text-wrap"><div className="detailsPA">{s}</div></IonLabel>
                                                        <IonRadio value={s} slot="end"/>
                                                    </IonItem>)
                                        })      
                                    }  
                                </IonRadioGroup>
                            </IonList>
                        </IonContent>
                    </IonCol>

                </IonRow>
                <br></br>
                <br></br>
                <IonRow >    
                    <IonCol >
                        <IonText className="responsiveTitlePA">Descrição da refeição:</IonText>
                        <br></br>
                        <br></br>
                        <IonTextarea className="detailsMealPA" value={this.state.refeicao.descricao} onIonChange={e => this.setDescricao(e.detail.value!)}></IonTextarea>
                    </IonCol>

                </IonRow>

                <IonRow>
                    <IonCol class="ion-text-center">
                        <IonButton className="buttonAddRefeicao" onClick={async () =>{ this.addRefeicao()}}>
                            Adicionar refeição <b>&nbsp;&nbsp;</b><IonIcon slot="icon-only" icon={addCircleSharp} />
                        </IonButton>
                    </IonCol>
                </IonRow>                
            </IonGrid>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitlePA">Lista de refeições selecionadas:</IonText>            
            </IonCard>                        
                         
            <IonGrid className="grid-exercicios">
            
                <IonCard className="background-orange">
                    <IonCardContent>
                        <IonRow>

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><div className="detailsPA">Refeição / Descrição </div></IonLabel>
                            </IonCol >

                        </IonRow>
                    </IonCardContent>
                </IonCard>
                    {
                        this.state.lista_refeicoes_selecionados.map((s, i) => (
                            
                            <IonCard key={i + s.descricao + s.nome} >
                                <IonCardContent className="border-color">
                                    <IonRow>

                                        <IonCol className="search-content">
                                            <IonLabel className="detailsPA"><b>Tipo: </b>{s.nome}</IonLabel>
                                        </IonCol >

                                    </IonRow>
                                    <IonRow>

                                        <IonCol className="search-content">
                                            <IonText className="detailsPA"><b>Descrição: </b>{s.descricao}</IonText>
                                        </IonCol >

                                    </IonRow>

                                    <IonRow>
                                        <IonCol>

                                            <IonButton size="small" onClick={async () => {this.rmRefeicao.call(this, i)}}>
                                                Remover <b>&nbsp;</b><IonIcon slot="icon-only" icon={closeCircleSharp}/>
                                            </IonButton>

                                        </IonCol>
                                    </IonRow>

                                    </IonCardContent>
                                </IonCard>
                        ))
                    }                    
            </IonGrid>

            <IonGrid className="grid-exercicios">
                <IonRow>

                    <IonCol>
                            <IonButton className="botaoGridPA" color= "success" onClick={async () => {this.limparPlanoAlimentar.call(this)}}>
                                <IonText> Limpar</IonText>
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>
                        
                            <IonButton className="botaoGridPA" onClick={async () => {this.addPlanoAlimentar.call(this)}}>
                                <IonText> Adicionar</IonText>
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

export default CriarPlanoAlimentar;

