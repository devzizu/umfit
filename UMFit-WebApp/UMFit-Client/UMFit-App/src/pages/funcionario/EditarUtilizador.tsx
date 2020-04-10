import React from "react";

import "../css/RemoveUser.css"
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonLabel, IonSearchbar, IonList, IonIcon, IonButton, IonSelectOption, IonSelect } from "@ionic/react";
import{person,informationCircle,atCircle, buildOutline} from 'ionicons/icons'
import { selectUser,updateUserCat, getAllClients } from "../../models/API/UserAPI";


//const testing = true;

interface SelectedUser{
    index:number,
    name:string,
    email:string,
    cat:string
}

const noSelection : SelectedUser = {index:-1, name:"string", email:"string", cat:"string"}

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
        
        await getAllClients()
        .then(
            async (value) =>{
                if (value.status === 200) {              
                    
                    var json = value.json();

                    await json.then((value) => {
                        init= value.users;
                    });
               
                    } else {
                    alert("REQUEST ERROR "+value.status);
                }
            }).catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
    

        this.setState({
            lista_inicial: init,
            render_next: init
        })

    }
    selectUser(index:number):void{
        
        var selection ={name:"", email:"", cat:"",index:index};
        
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
                                    cat:resValue.user.categoria,
                                    index:index}
                        this.setState({show_next : selection})
                    });
                } else {
                    alert("REQUEST ERROR "+value.status);
                }
            }).catch(function(error) {
              alert("Server is currently down... \n\n".concat("Error details: \n\n\t").concat(error));
            });
        
    }
    
        this.setState({show_next : selection})
    }

    setCat(e : any){
        e.stopPropagation();
        var tmp =this.state.show_next;
        tmp.cat=e.detail.value!;
        this.setState({ show_next: tmp })
    }

    editarUser(email: string) {
        var send = this.state.show_next;
        var receive = updateUserCat({userEmail: send.email,tipo : send.cat });
        receive.then(
            async (value) =>{
                if (value.status !== 200) alert("REQUEST ERROR : "+value.status);
            }
        )
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
                    <IonTitle id="page-title">
                        <IonIcon className="icon" icon ={buildOutline}></IonIcon>
                        Editar um Utilizador
                    </IonTitle>
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
                    <IonIcon className="icon" icon ={atCircle}></IonIcon>
                    {selected.index===index?
                    <React.Fragment >
                    <IonLabel color="primary" >{element}</IonLabel>
                    <IonList className="inlist" lines="none"  >
                            <IonItem className="inheritBackground" >
                            <IonIcon icon={person} className="icon" ></IonIcon>
                            <IonLabel color="primary" className="inheritBackground">{selected.name}</IonLabel>
                            </IonItem>

                            <IonItem>
                                <IonIcon className ="icon" icon={informationCircle}></IonIcon>
                                <IonLabel>Tipo de sócio: </IonLabel>    
                                <IonSelect value={selected.cat} onClick={(e)=> e.stopPropagation()} onIonChange={(e) =>this.setCat(e)}>
                                    <IonSelectOption value="Cliente Standard">Standard</IonSelectOption>
                                    <IonSelectOption value="Cliente Premium">Premium</IonSelectOption>
                                </IonSelect>

                            </IonItem>

                            <IonButton color="warning" expand="block" onClick={()=>this.editarUser(element)}>
                                Alterar     
                            </IonButton>
                              
                    </IonList>
                    </React.Fragment>
                    
                    :
                    <React.Fragment>
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