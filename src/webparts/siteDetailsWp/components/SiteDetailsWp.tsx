import * as React from 'react';
import styles from './SiteDetailsWp.module.scss';
import { ISiteDetailsWpProps } from './ISiteDetailsWpProps';
import { escape, random } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'
import { IOwnersInfo } from './IOwnerDeatils'
import { IFacepilePersona } from 'office-ui-fabric-react/lib/Facepile';
import SiteDetails from './SiteDetails/SiteDetails';
import { IWebInfo } from './IWebDetails';

export default class SiteDetailsWp extends React.Component<ISiteDetailsWpProps, {}> {
  
  state = {
    owners : [],
    webCreatedDate: undefined,
    showModal : false
  }
  

  componentDidMount(){
    
    this._LoadWebDetails(this.props.clientContext, this.props.webURL).then((data : IWebInfo) => {
        let createdDate = new Date(data.Created);
        this.setState({
          webCreatedDate : createdDate.toDateString()
        });
    }).catch((error : Error) => {
      console.log("Error while fetching Web Details: " + error.message);
    });

    this._LoadOwnerDetails(this.props.clientContext, this.props.webURL).then((ownerArray : IOwnersInfo[]) => {
        const facePilePersona : IFacepilePersona[] = [];
        ownerArray.forEach((owner : IOwnersInfo) => {
          let imageInitailsTemp : string = owner.Title.toString().split(' ')[0].charAt(0) + owner.Title.toString().split(' ')[1].charAt(0);
          let imageColor : number = random(0, 14, false);
          facePilePersona.push({
            imageUrl: this.props.webURL + "/_layouts/15/userphoto.aspx?size=L&username=" + owner.Email,
            personaName: owner.Title,
            imageInitials : imageInitailsTemp,
            initialsColor : imageColor,
          });
        });

        this.setState({
          owners : [...facePilePersona]
        });
    }).catch((error : Error) => {
        console.log("Error Occured: " + error.message);
    })
  }

  protected _LoadWebDetails = (context: SPHttpClient, url: string) : Promise<IWebInfo> => {
    return new Promise<IWebInfo>((resolve : (webInfo : IWebInfo) => void, reject : (error : any) => void) => {
        context.get(`${url}/_api/web?$select=Created`, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        }).then((response : SPHttpClientResponse) => {
          return response.json();
        }).then((data: IWebInfo) => {
          resolve(data); 
        }).catch((error : any) => {
          reject(error);
        });
    });
  }


  protected _LoadOwnerDetails = (context: SPHttpClient, url: string) : Promise<IOwnersInfo[]> => {
    return new Promise<IOwnersInfo[]>((resolve : (owners : IOwnersInfo[]) => void, reject : (error : any) => void) => {
        context.get(`${url}/_api/web/associatedOwnerGroup/users?$select=Title,Email`, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        }).then((response : SPHttpClientResponse) => {
          return response.json();
        }).then((owners : any) => {
          let ownerDetails = owners.value;
          let ownerArray : IOwnersInfo[] = [];
          ownerDetails.forEach((owner : IOwnersInfo) => {
            ownerArray.push(owner);
          });
          console.log(ownerArray);
          resolve(ownerArray);
        }).catch((error : any) => {
          reject(error);
        });
    });
  }

  protected _ModalClickHandler = () => {
    let modalState: boolean = this.state.showModal;
    this.setState({
      showModal : !modalState
    });
  }

  protected _ModalDismissedHandler = () => {
    this.setState({
      showModal : false
    });
  }
  
  public render(): React.ReactElement<ISiteDetailsWpProps> {
    return (
            <SiteDetails 
              Title={this.props.webTitle}
              Description={this.props.webDescription}
              Owners={this.state.owners}
              CreatedDate = {this.state.webCreatedDate}
              ModalClicked = {this._ModalClickHandler}
              ModalOpen = {this.state.showModal}
              ModalDismissed = {this._ModalDismissedHandler}
            />
    );
  }
}
