import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRange, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, calendarOutline, personCircleOutline, trashOutline } from "ionicons/icons";
import React from "react";
import { criarAvaliacao, getAvaliacoesAgendadasInstrutor } from "../../models/API/EvolucaoAPI";
import { selectUser } from "../../models/API/UserAPI";
import { Avaliacao, ComposicaoCorporal, Perimetros } from "../../models/Other/Avaliacao";
import { User } from "../../models/Other/User";
import "../css/CriarAvaliacao.css";
import { AvaliacaoAgendada } from "../user/AgendarAvaliacao";
const noIndex : number = -1 
class CriarAvaliacao extends React.Component<any>{
    
    state: {
        avaliacoes : AvaliacaoAgendada[]
        selecionada :AvaliacaoAgendada
        indexed : number
        showAlert : boolean;
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
            avaliacoes : [],
            indexed : noIndex,
            showAlert : false,
            selecionada:{
                instrutor_email:"",
                instrutor_nome:"",
                data:""
            },
            composicao_corporal: {
                peso: "0",
                altura: "0",
                imc: "0",
                idade_metabolica: 60,
                massa_magra: "0",
                massa_gorda: "0"
            },

            perimetros: {
                cintura: "0",
                abdomen: "0",
                ombro: "0",
                torax: "0",
                braco_dir: "0",
                braco_esq: "0",
                coxa_dir: "0",
                coxa_esq: "0",
                gemeo_dir: "0",
                gemeo_esq: "0",
                antebraco_dir: "0",
                antebraco_esq: "0"
            },

            lista_mails_inicial: new Array<string>(),
            mail_inserido: "",

            user_mail: "",
            user_nome: "",

            avaliacao : new Avaliacao(  new ComposicaoCorporal("0","0","0",60,"0","0"),
                                        new Perimetros("0","0","0","0","0","0","0","0","0","0","0","0")),
            
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
                peso: "0",
                altura: "0",
                imc: "0",
                idade_metabolica: 60,
                massa_magra: "0",
                massa_gorda: "0"
            },

            perimetros: {
                cintura: "0",
                abdomen: "0",
                ombro: "0",
                torax: "0",
                braco_dir: "0",
                braco_esq: "0",
                coxa_dir: "0",
                coxa_esq: "0",
                gemeo_dir: "0",
                gemeo_esq: "0",
                antebraco_dir: "0",
                antebraco_esq: "0"
            },
            avaliacao : new Avaliacao(  new ComposicaoCorporal("0","0","0",60,"0","0"),
                                        new Perimetros("0","0","0","0","0","0","0","0","0","0","0","0")),
            
        })
    }

    async addAvaliacao(nome :string, mail :string, data : string ){
        if (data==="") {this.setState({showAlert:true}); return("");}
        var pt: Avaliacao = new Avaliacao(  this.state.composicao_corporal,
                                                this.state.perimetros)

                                                
        await criarAvaliacao(data, mail, this.state.user.email, pt).then(
            async (value: any) =>{
                console.log(value)
                
                switch (value.status){

                    case 200 : alert("Avaliação Adicionada!");break;
                    default: alert("Verifique se os campos estão válidos"); break;

                }});
                window.location.reload();
    }

    async componentDidMount(){
        var avs : AvaliacaoAgendada[]=[];
        var res = await getAvaliacoesAgendadasInstrutor(this.state.user.email);
        await res.json().then(  (value: any) =>{
                        avs = JSON.parse(value).avaliacoes;
                         this.setState({avaliacoes:avs});
                        
                });
    }


    render(){
    var selection : AvaliacaoAgendada = this.state.indexed<0? {instrutor_email:"",
                                            instrutor_nome:"",
                                            data: ""} : this.state.avaliacoes[this.state.indexed];
    var emailS = selection.instrutor_email;
    var nomeS = selection.instrutor_nome;
    var data = selection.data;

    return(
      <IonPage>

        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="title" id="page-title">Criar Avaliação</IonTitle>

          </IonToolbar>
        </IonHeader>

        <IonContent>
        <IonAlert
          isOpen={this.state.showAlert}
          onDidDismiss={() => this.setState({showAlert : false})}
          header={'Aviso'}
          message={'Tem de selecionar a data e o cliente!'}
          buttons={['Ok, percebido!']}
        />
            <div className="separador"></div>
            <IonCard className="card-left">
                <IonText className="responsiveTitleCAval">Selecione uma avaliação para realizar: </IonText>
                
            </IonCard>
            <IonRow  >
                {this.state.avaliacoes.map((elem,index)=>
                    this.state.indexed===index? 

                    <IonCard ion-activatable className="cardColSelected" color="primary" button={true} onClick={()=>{ console.log("NICE");this.setState({selecionada:elem, indexed : noIndex})}}  key={elem.data + elem.instrutor_nome} >
                    <IonItem ><IonIcon icon={calendarOutline }></IonIcon><IonLabel><div className="responsiveTextCardCavl">&nbsp;Data: {elem.data}</div></IonLabel></IonItem>
                    <IonItem ><IonIcon icon={personCircleOutline}></IonIcon><IonLabel><div className="responsiveTextCardCavl">&nbsp;Cliente: {elem.instrutor_nome}</div></IonLabel></IonItem>
                    </IonCard>
                     : 
                    <IonCard ion-activatable className="cardColUnselected" button={true} onClick={()=>{console.log("NICE NICE");this.setState({selecionada:elem, indexed : index })}}  key={elem.data + elem.instrutor_nome} >
                    <IonItem  ><IonIcon icon={calendarOutline }></IonIcon><IonLabel><div className="responsiveTextCardCavl">&nbsp;Data: {elem.data}</div></IonLabel></IonItem>
                    <IonItem ><IonIcon icon={personCircleOutline}></IonIcon><IonLabel><div className="responsiveTextCardCavl">&nbsp;Cliente: {elem.instrutor_nome}</div></IonLabel></IonItem>
                    </IonCard> 
                    
 
                    
                )
               
                }
                
            </IonRow>
            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitleCAval">Utilizador Selecionado:</IonText>

            </IonCard>

            <IonCard className="card-left">
                <img className="responsiveProfilePicCAval" src={require('../../imgs/perfil_pic.png')} width="100" height="100" alt="Loading..."/>
                <IonCardContent className="responsiveTextCardCavl">
                    <b>Nome:</b> {nomeS}
                    <br></br>
                    <br></br>
                    <b>Email:</b> {emailS}
                </IonCardContent>
            </IonCard>

            <div className="separador"></div>

            <IonCard className="card-left">
                <IonText className="responsiveTitleCAval">Inserir dados para avaliação:</IonText>
            </IonCard>

            <IonCard className="card-left">
                <IonText className="seccaoCAval">Composição Corporal:</IonText>
            </IonCard>

        
            <IonGrid className="grid">
        
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.composicao_corporal.altura} onIonChange={e => {this.setAlturaCC(e.detail.value)}}>Altura: </IonInput>
                            </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="kg" value={this.state.composicao_corporal.peso} onIonChange={e => {this.setPesoCC(e.detail.value)}}>Peso: </IonInput>
                            </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                        <IonInput className="responsiveTextCardCavl" value={this.state.composicao_corporal.imc} onIonChange={e => {this.setImcCC(e.detail.value)}}>IMC: </IonInput>
                        </IonCard>   
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonLabel className="responsiveTextCardCavl">Idade Metabolica: </IonLabel>

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
                            <IonInput className="responsiveTextCardCavl" placeholder="kg" value={this.state.composicao_corporal.massa_magra} onIonChange={e => {this.setMassaMagraCC(e.detail.value)}}>Massa Magra: </IonInput>
                            </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="kg" value={this.state.composicao_corporal.massa_gorda} onIonChange={e => {this.setMassaGordaCC(e.detail.value)}}>Massa Gorda: </IonInput>
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
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.cintura} onIonChange={e => {this.setCinturaP(e.detail.value)}}>Cintura: </IonInput>  
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.abdomen} onIonChange={e => {this.setAbdomenP(e.detail.value)}}>Abdomen: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.ombro} onIonChange={e => {this.setOmbroP(e.detail.value)}}>Ombro: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.torax} onIonChange={e => {this.setToraxP(e.detail.value)}}>Torax: </IonInput>
                        </IonCard>
                    </IonCol>
                </IonRow>
                
                <IonRow>
                    
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.braco_dir} onIonChange={e => {this.setBracoDirP(e.detail.value)}}>Braço Dir.: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.braco_esq} onIonChange={e => {this.setBracoEsqP(e.detail.value)}}>Braço Esq.: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.coxa_dir} onIonChange={e => {this.setCoxaDirP(e.detail.value)}}>Coxa Dir.: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.coxa_esq} onIonChange={e => {this.setCoxaEsqP(e.detail.value)}}>Coxa Esq.: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                    
                <IonRow>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.gemeo_dir} onIonChange={e => {this.setGemeoDirP(e.detail.value)}}>Gemeo Dir.: </IonInput>
                        </IonCard>
                    </IonCol>

                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.gemeo_esq} onIonChange={e => {this.setGemeoEsqP(e.detail.value)}}>Gemeo Esq.: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
                
                <IonRow>
        
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.antebraco_dir} onIonChange={e => {this.setAntebracoDirP(e.detail.value)}}>Anteb. Dir.: </IonInput>
                        </IonCard>
                    </IonCol>
                        
                    <IonCol>
                        <IonCard className="card">
                            <IonInput className="responsiveTextCardCavl" placeholder="cm" value={this.state.perimetros.antebraco_esq} onIonChange={e => {this.setAntebracoEsqP(e.detail.value)}}>Anteb. Esq.: </IonInput>
                        </IonCard>
                    </IonCol>

                </IonRow>
            
            </IonGrid>

            <div className="separador"></div>

            <IonGrid className="grid-avaliacao">
                <IonRow>

                    <IonCol>
                            <IonButton className="botaoCAval" color= "success" onClick={async () => {this.limparAvaliacao.call(this)}}>
                                Limpar
                                <IonIcon slot="icon-only" icon={trashOutline}/>
                            </IonButton>

                            <IonButton className="botaoCAval" onClick={async () => {this.addAvaliacao(nomeS,emailS,data)}}>
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

export default CriarAvaliacao;
