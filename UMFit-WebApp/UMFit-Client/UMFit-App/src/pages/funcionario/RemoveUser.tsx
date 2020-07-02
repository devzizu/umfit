import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import { atCircle, home, informationCircle, person } from 'ionicons/icons';
import React from "react";
import { getAllUsers, removeUser, selectUser } from "../../models/API/UserAPI";
import "../css/RemoveUser.css";



//const testing = true;

interface SelectedUser{
    index:number,
    name:string,
    email:string,
    cat:string,
    localidade:string
}
interface UserBasicInfo{
    name:string,
    email:string,
    cat:string,
    localidade:string
}

const noSelection : SelectedUser = {index:-1, name:"string", email:"string", cat:"string", localidade:"string"}

class RemoveUser extends React.Component<any> {
    state:{
        query:string,
        lista_inicial:string[],
        render_next:string[],
        show_next:SelectedUser
    }

    constructor(props: any) {

        super(props);

        this.state = {  
            query : "",
            lista_inicial: [],
            render_next: [],
            show_next :noSelection
        }
    }

    async componentDidMount(){
        
        var init:string[]=["Email1","email2","oogle.1","gloogloog.2","net.net","yeet@3","3.@yeet",];
        
        await getAllUsers()
        .then(
            async (value) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();

                    await json.then((value) => {
                        console.log(value);
                        init= value.users;
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            }).catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
    
        init.splice(init.indexOf(this.props.email), 1);

        this.setState({
            lista_inicial: init,
            render_next: init
        })
    }
    selectUser(index:number):void{
        var selection ={name:"", email:"", cat:"", localidade:"",index:index};
        //var apiCall:UserBasicInfo = {name:"ByeBye", email:"net.net", cat:"Bot", localidade:"LocalHost"} ;
        if(index===this.state.show_next.index) selection=noSelection; 
        else{
        
        var res = selectUser(this.state.render_next[index]);
        res.then(
            async (value) =>{
                if (value.status === 200) {              
                    var json = value.json();
                    await json.then((value) =>  {
                        const resValue = JSON.parse(value);
                        console.log(resValue.user)
                        selection = {name:resValue.user.name,
                                    email:resValue.user.email,
                                    cat:resValue.user.cat,
                                    localidade:resValue.user.localidade,
                                    index:index}
                                    this.setState({show_next : selection})
                        console.log("USer Selected");
                    });
                } else {
                    alert("REQUEST ERROR "+value.status);
                }
            }).catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
        
    }
    
        this.setState({show_next : selection})
        console.log("END")
    }

    removeUser(email :string):void{
        var res = removeUser(email,this.state.show_next.cat[0]);
        res.then(
            async (value) =>{
                if (value.status === 200) {
                    alert("Utilizador Removido!")
                } else {
                    alert("REQUEST ERROR "+value.status);
                }
            }).catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });

            
        var clearSelect=noSelection;
        var renderBefore = this.state.lista_inicial;
        renderBefore.splice(renderBefore.indexOf(email),1);
        this.setState({
            show_next:clearSelect,
            lista_inicial:renderBefore,
        })
        this.setQuery(this.state.query)
    }

    setQuery(stringSearch: any) {

        
        var resultado = this.state.lista_inicial
            .filter(function(value){return value.toLowerCase().indexOf(stringSearch.toLowerCase()) >= 0;});
        this.setState({
        
            query: stringSearch,
            render_next: resultado,
            show_next:noSelection
        })
         
    
    }
    render() {
        var selected= this.state.show_next;
        var renderList = this.state.render_next;

        return(
            
            <IonPage>

                <IonHeader>
                <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle id="page-title">Remover utilizador</IonTitle>
                </IonToolbar>
                </IonHeader>

                <IonToolbar>
                <IonSearchbar value={this.state.query} onIonChange={e => this.setQuery(e.detail.value!)} placeholder="Email do utilizador...">
                </IonSearchbar>
                </IonToolbar>
    
                <IonContent className="PageContent">
                
                <IonList>
                {renderList.map(
                (element,index)=>
                <IonItem key={element} className="item" button={true}  onClick={() =>this.selectUser(index)}>
                    {selected.index===index?
                    <React.Fragment >
                    <IonList lines="none" className="inheritBackground" >
                        <IonItem className="inheritBackground" >
                        <IonIcon className="icon" icon ={atCircle}></IonIcon>
                        <IonLabel color="primary" >{element}</IonLabel>
                        </IonItem>
                            <IonItem className="inheritBackground" >
                            <IonIcon icon={person} className="icon" ></IonIcon>
                            <IonLabel color="primary" className="inheritBackground">{selected.name}</IonLabel>
                            </IonItem>
    
                            <IonItem className="inheritBackground">
                            <IonIcon icon={informationCircle} className="icon"></IonIcon> 
                                <IonLabel color="Dark">{selected.cat}</IonLabel>
                            </IonItem>
                            <IonItem>
                            <IonIcon icon={home} className="icon" ></IonIcon> 
                                <IonLabel color="Dark">{selected.localidade}</IonLabel>
                            </IonItem>
                            
                                <IonButton color="danger" expand="block" onClick={()=>this.removeUser(element)}>
                                    REMOVER     
                                </IonButton>
                              
                    </IonList>
                    </React.Fragment>
                    
                    :
                    <React.Fragment>
                    <IonIcon className="icon" icon ={atCircle}></IonIcon>
                    <IonLabel color="primary" >{element}</IonLabel>
                    </React.Fragment>
                    }
                    
                    </IonItem> 
                    )}
                
                </IonList>
                </IonContent>
                
            </IonPage>    
        );
    }
    
}
export default RemoveUser;