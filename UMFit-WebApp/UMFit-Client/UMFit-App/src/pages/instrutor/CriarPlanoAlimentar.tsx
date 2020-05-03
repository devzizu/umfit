
import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonItem, IonList, IonText, IonLabel, IonRadio, IonRadioGroup, IonButton, IonIcon, IonRow, IonCol, IonGrid, IonTextarea, IonDatetime} from "@ionic/react";
import "../css/CriarPlanoAlimentar.css"
import {addCircleSharp, closeCircleSharp, addOutline, trashOutline } from "ionicons/icons";
import { PlanoAlimentar, Refeicao } from '../../models/Other/PlanoAlimentar';
import { getAllClients } from "../../models/API/UserAPI";
import { getListaRefeicoes, setPlanoAlimentar } from "../../models/API/PlanoAlimentarAPI";

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

    setUserMail(mail: any){

        this.setState({user_mail: mail})
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

            nome_refeicao: "",

            exercicio: {
                nome: "",
                nm_repeticoes: "", 
                nm_series: ""
            }
        })
    }

    addPlanoAlimentar(){

        var pa: PlanoAlimentar = new PlanoAlimentar(  this.state.nome_plano_alimentar,
                                                      this.state.refeicoes_livres, 
                                                      this.state.frequencia,
                                                      this.state.data_fim, 
                                                      this.state.lista_refeicoes_selecionados)

        var resultado = {

            email: this.state.user_mail,
            planoAlimentar: pa
        }
        setPlanoAlimentar(resultado).then(
            async (value: any) =>{
                switch (value.status){
                    case 200 : alert("Plano Adicionado!");break;
                    case 400 : alert("Verifique se os campos estão válidos"); break;
                }});
        console.log(resultado)
    }

    componentDidMount(){
        var  refeicoes:string[] =  [""];
        var  emails:string[] =  [""];

        getAllClients().then(
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
            <IonTitle id="page-title">Criar Plano Alimentar</IonTitle>
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
                <IonText className="text-title">Especificações do Plano Alimentar:</IonText>            
            </IonCard>


            <IonCard className="card-center"> 
                <IonList className="descricao-plano">
                    <IonItem >
                        <IonLabel class="ion-text-wrap">Nome: </IonLabel>
                        <IonInput value={this.state.nome_plano_alimentar} onIonChange={e => {this.setNomePlano(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap">Frequencia: </IonLabel>
                        <IonInput value={this.state.frequencia} onIonChange={e => {this.setFreq(e.detail.value)}}/>
                    </IonItem>

                    <IonItem>
                        <IonLabel class="ion-text-wrap">Refeicoes Livres: </IonLabel>
                        <IonInput value={this.state.refeicoes_livres} onIonChange={e => {this.setRefLiv(e.detail.value)}}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel class="ion-text-wrap" className="quarterWidth">  Data de Fim:</IonLabel>
                        <IonDatetime className="minquarterWidth" value={this.state.data_fim} onIonChange={(e) => {this.setState({ data_fim: e.detail.value! })}}></IonDatetime>

                    </IonItem>

                </IonList> 
            </IonCard>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Seleção de Refeições:</IonText>            
            </IonCard>

            <IonGrid className="layout-selecao-refeicoes">
                
                <IonRow className="espaco-vertical-search">
                    <IonToolbar>
                        <IonSearchbar className="background-orange"
                                value={this.state.nome_refeicao} 
                                onIonChange={e => this.setSearchExercicio(e.detail.value!)}
                                placeholder="nome da refeição"></IonSearchbar>
                        </IonToolbar>
                    
                </IonRow>
                
                <IonRow className="espaco-vertical-search">
                    <IonCol>
                        <IonContent>
                            <IonList>
                                <IonRadioGroup value={this.state.refeicao.nome} onIonChange={e => this.setNomeRefeicao(e.detail.value)}>
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
                        <IonText className="search-content">Descricao da refeicao:</IonText>
                        <IonTextarea className="search-bar" value={this.state.refeicao.descricao} onIonChange={e => this.setDescricao(e.detail.value!)}></IonTextarea>
                    </IonCol>

                </IonRow>
               
                <IonButton className="botao-adicioanr-refeicao" size="large" onClick={async () =>{ this.addRefeicao()}}>
                    <IonIcon slot="icon-only" icon={addCircleSharp} />
                </IonButton>
                
            </IonGrid>
            
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Lista de refeições selecionadas:</IonText>            
            </IonCard>                        
                         
            <IonGrid className="grid-exercicios">
            
                <IonCard className="background-orange">
                    <IonCardContent>
                        <IonRow>

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><b>Refeição</b></IonLabel>
                            </IonCol >

                            <IonCol className="search-content">
                                <IonLabel class="ion-text-wrap"><b>Descrição</b></IonLabel>
                            </IonCol >

                        </IonRow>
                    </IonCardContent>
                </IonCard>
                    {
                        this.state.lista_refeicoes_selecionados.map((s, i) => (
                            
                            <IonCard key={s.nome} >
                                <IonCardContent className="border-color">
                                    <IonRow>

                                        <IonCol className="search-content">
                                            <IonLabel class="ion-text-wrap">{s.nome}</IonLabel>
                                        </IonCol >

                                        <IonCol className="search-content">
                                            <IonTextarea>{s.descricao}</IonTextarea>
                                        </IonCol >

                                        <IonButton size="small" onClick={async () => {this.rmRefeicao.call(this, i)}}>
                                            <IonIcon slot="icon-only" icon={closeCircleSharp}/>
                                        </IonButton>

                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                        ))
                    }                    
            </IonGrid>

            <IonGrid className="grid-exercicios">
                <IonRow>

                    <IonCol>
                            <IonButton size="large" className="botao" color= "success" onClick={async () => {this.limparPlanoAlimentar.call(this)}}>
                                <IonText> Limpar Plano Alimentar</IonText>
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>
                    </IonCol>

                    <IonCol>
                        
                            <IonButton size="large" className="botao" onClick={async () => {this.addPlanoAlimentar.call(this)}}>
                                <IonText> Adicionar Plano Alimentar</IonText>
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

export default CriarPlanoAlimentar;

