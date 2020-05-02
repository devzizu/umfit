import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonFooter, IonContent, IonCard, IonCardContent, IonSearchbar, IonInput, IonItem, IonList, IonText, IonLabel, IonRadio, IonRadioGroup, IonButton, IonIcon, IonRow, IonCol, IonGrid, IonRange} from "@ionic/react";
import "../css/CriarAvaliacao.css"
import { addOutline, trashOutline} from "ionicons/icons";
import { Avaliacao, ComposicaoCorporal, Perimetros } from "../../models/Other/Avaliacao";
import { getAllClients, selectUser} from "../../models/API/UserAPI";
import { criarAvaliacao } from "../../models/API/EvolucaoAPI";
import { User } from "../../models/Other/User";

class CriarAvaliacao extends React.Component<any>{

    state: {

        composicao_corporal: ComposicaoCorporal
        perimetros: Perimetros

        lista_mails_inicial: Array<string>
        mail_inserido: string

        user_mail: string
        user_nome: string

        avaliacao: Avaliacao
        user: User
    }

    constructor(props: any) {

        super(props);

        this.state = {

            composicao_corporal: {
                peso: "",
                altura: "",
                imc: "",
                idade_metabolica: 60,
                massa_magra: "",
                massa_gorda: ""
            },

            perimetros: {
                cintura: "",
                abdomen: "",
                ombro: "",
                torax: "",
                braco_dir: "",
                braco_esq: "",
                coxa_dir: "",
                coxa_esq: "",
                gemeo_dir: "",
                gemeo_esq: "",
                antebraco_dir: "",
                antebraco_esq: ""
            },

            lista_mails_inicial: new Array<string>(),
            mail_inserido: "",

            user_mail: "",
            user_nome: "",

            avaliacao : new Avaliacao(  new ComposicaoCorporal("","","",60,"",""),
                                        new Perimetros("","","","","","","","","","","","")),
            
            user: this.props.user

        }
    }

    async setUserMail(mail: any){

        var user = await selectUser(mail);
        user.json().then(
            (json)=>{
                var user =  JSON.parse(json);
                this.setState({user_nome : user.user.name,user_mail: mail})}
                
            )
    }

    setPesoCC(peso: any){

        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{peso: peso})})
    }

    setAlturaCC(altura: any) {
        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{altura: altura})})
    }

    setImcCC(imc: any) {
        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{imc: imc})})
    }

    setIdadeMetabolicaCC(idadeMeta: any) {
        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{idade_metabolica: idadeMeta})})
    }

    setMassaMagraCC(massa: any){
        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{massa_magra: massa})})
    }

    setMassaGordaCC(massa: any){
        this.setState({composicao_corporal: Object.assign(this.state.composicao_corporal,{massa_gorda: massa})})
    }

    setCinturaP(cintura: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{cintura: cintura})})
    }

    setAbdomenP(abdomen: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{abdomen: abdomen})})
    }

    setOmbroP(ombro: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{ombro: ombro})})
    }

    setToraxP(torax: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{torax: torax})})
    }

    setBracoDirP(braco: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{braco_dir: braco})})
    }

    setBracoEsqP(braco: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{braco_esq: braco})})
    }

    setCoxaDirP(coxa: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{coxa_dir: coxa})})
    }

    setCoxaEsqP(coxa: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{coxa_esq: coxa})})
    }

    setGemeoDirP(gemeo: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{gemeo_dir: gemeo})})
    }

    setGemeoEsqP(gemeo: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{gemeo_esq: gemeo})})
    }

    setAntebracoDirP(antebraco: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{antebraco_dir: antebraco})})
    }

    setAntebracoEsqP(antebraco: any){
        this.setState({perimetros: Object.assign(this.state.perimetros,{antebraco_esq: antebraco})})
    }

    setSearchMail(stringSearch: any){

        this.setState({mail_inserido: stringSearch})
    }

    limparAvaliacao(){



        this.setState({

            composicao_corporal: {
                peso: "",
                altura: "",
                imc: "",
                idade_metabolica: 60,
                massa_magra: "",
                massa_gorda: ""
            },

            perimetros: {
                cintura: "",
                abdomen: "",
                ombro: "",
                torax: "",
                braco_dir: "",
                braco_esq: "",
                coxa_dir: "",
                coxa_esq: "",
                gemeo_dir: "",
                gemeo_esq: "",
                antebraco_dir: "",
                antebraco_esq: ""
            }
        })
    }

    async addAvaliacao(){

        var pt: Avaliacao = new Avaliacao(  this.state.composicao_corporal,
                                                this.state.perimetros)

                                                
        await criarAvaliacao("2020-04-30 18:00:00", this.state.user_mail, this.state.user.email, pt).then(
            async (value: any) =>{
                console.log(value)
                
                switch (value.status){

                    case 200 : alert("Avaliação Adicionada!");break;
                    case 400 : alert("Verifique se os campos estão válidos"); break;

                }});
    }

    async componentDidMount(){

        var emails : string[];
        await getAllClients().then(
            async (value: any) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();

                    await json.then((value: any) => {
                        emails= value.users;
                        this.setState({lista_mails_inicial:emails})
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            })
            .catch(function(error: any) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
 
    }


    render(){

    const mail = this.state.mail_inserido

    var lista_mails_resultado = this.state.lista_mails_inicial.filter(function(value){
        return value.toLowerCase().indexOf(mail.toLowerCase()) >= 0;})

    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="title" id="page-title">Criar Avaliação</IonTitle>
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
                    <b>Nome:</b> {this.state.user_nome}
                    <br></br>
                    <br></br>
                    <b>Email:</b> {this.state.user_mail}
                </IonCardContent>
            </IonCard>

            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="text-title">Inserir dados para avaliação:</IonText>
            </IonCard>

            <IonCard className="card-left">
                <IonText className="text-title">Composição Corporal</IonText>
            </IonCard>

        
            <IonGrid className="grid">
        
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.composicao_corporal.altura} onIonChange={e => {this.setAlturaCC(e.detail.value)}}>Altura: </IonInput>
                            </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="kg" value={this.state.composicao_corporal.peso} onIonChange={e => {this.setPesoCC(e.detail.value)}}>Peso: </IonInput>
                            </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                        <IonInput className="info-text" value={this.state.composicao_corporal.imc} onIonChange={e => {this.setImcCC(e.detail.value)}}>IMC: </IonInput>
                        </IonCard>   
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonLabel className="info-text">Idade Metabolica: </IonLabel>

                            <IonRange pin={true} min={1} max={120} value={this.state.composicao_corporal.idade_metabolica} onIonChange={e => this.setIdadeMetabolicaCC(e.detail.value as number)} className="imc-barra">
                                <IonLabel slot="start">1</IonLabel>
                                <IonLabel slot="end">120</IonLabel>
                            </IonRange>
                            
                            </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="kg" value={this.state.composicao_corporal.massa_magra} onIonChange={e => {this.setMassaMagraCC(e.detail.value)}}>Massa Magra: </IonInput>
                            </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="kg" value={this.state.composicao_corporal.massa_gorda} onIonChange={e => {this.setMassaGordaCC(e.detail.value)}}>Massa Gorda: </IonInput>
                            </IonCard>
                    </IonCol>
                </IonRow>
            
            </IonGrid>

            <IonCard className="card-left">
                <IonText className="text-title">Perimetros</IonText>
            </IonCard>

            <IonGrid className="grid">

                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.cintura} onIonChange={e => {this.setCinturaP(e.detail.value)}}>Cintura: </IonInput>  
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.abdomen} onIonChange={e => {this.setAbdomenP(e.detail.value)}}>Abdomen: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.ombro} onIonChange={e => {this.setOmbroP(e.detail.value)}}>Ombro: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.torax} onIonChange={e => {this.setToraxP(e.detail.value)}}>Torax: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.braco_dir} onIonChange={e => {this.setBracoDirP(e.detail.value)}}>Braço Direito: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.braco_esq} onIonChange={e => {this.setBracoEsqP(e.detail.value)}}>Braço Esquerdo: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.coxa_dir} onIonChange={e => {this.setCoxaDirP(e.detail.value)}}>Coxa Direita: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.coxa_esq} onIonChange={e => {this.setCoxaEsqP(e.detail.value)}}>Coxa Esquerda: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                    
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.gemeo_dir} onIonChange={e => {this.setGemeoDirP(e.detail.value)}}>Gemeo Direito: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.gemeo_esq} onIonChange={e => {this.setGemeoEsqP(e.detail.value)}}>Gemeo Esquerdo: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>
        
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.antebraco_dir} onIonChange={e => {this.setAntebracoDirP(e.detail.value)}}>Antebraço Direito: </IonInput>
                        </IonCard>
                    </IonCol>
                        
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="info-text" placeholder="cm" value={this.state.perimetros.antebraco_esq} onIonChange={e => {this.setAntebracoEsqP(e.detail.value)}}>Antebraço Esquerdo: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
            
            </IonGrid>

            <div className="separador"></div>

            <IonGrid className="grid-avaliacao">
                <IonRow>

                    <IonCol>
                            <IonButton size="large" className="botao" color= "success" onClick={async () => {this.limparAvaliacao.call(this)}}>
                                <IonText> Limpar Avaliação</IonText>
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>
                    </IonCol>

                    <IonCol>

                            <IonButton size="large" className="botao" onClick={async () => {this.addAvaliacao.call(this)}}>
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

export default CriarAvaliacao;
