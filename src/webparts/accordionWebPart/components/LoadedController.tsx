import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IAccordionWebPartProps, ILoadedWebPartProps } from './IAccordionWebPartProps';
import { IAccordionInfo } from './IAccordionData';
import { Spinner } from 'office-ui-fabric-react/lib/components/Spinner';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import AccordionTiles from './AccordionTilesComponent/AccordionTiles';

export default class LoadedController extends React.Component<ILoadedWebPartProps, {}>{
    
    constructor(props: ILoadedWebPartProps){
      super(props);
      this.state={
        loading: true,
        accordionData : null,
      }
    }
  
    state:{
        accordionData : IAccordionInfo[]
        loading : true
      }

    componentDidMount(){
      debugger;
      this._LoadAccordionData(this.props.spContext, this.props.webURL).then((accordionData : IAccordionInfo[]) => {
        this.setState({
          accordionData : accordionData
        });
      }).catch((error : Error) => {
        console.log(error.message);
      })
      this.setState({
        loading: false
      });
    }

    protected _LoadAccordionData = (context : SPHttpClient, url: string) : Promise<IAccordionInfo[]> => {
      return new Promise((resolve : (accordData : IAccordionInfo[]) => void, reject : (error : any) => void) => {
          debugger;
          context.get(`${url}/_api/web/lists/getbyid('${this.props.list}')/items?$select=Title,Detail`, SPHttpClient.configurations.v1,{
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'odata-version': ''
            }
          }).then((response : SPHttpClientResponse) => {
            return response.json();
          }).then((data : any) => {
            let accordDataResponse : IAccordionInfo[] = [];
            (data.value).map((item : IAccordionInfo) => {
              accordDataResponse.push(item);
            });
            console.log(accordDataResponse);
            resolve(accordDataResponse);
            return;
          }).catch((error : Error) => {
            reject(error);
            return;
          });
      });
    }
    

    public render() : React.ReactElement<IAccordionWebPartProps>{
      const loading: JSX.Element = this.state.loading ? <div><Spinner label={'Loading options...'} /></div> : <div />;

      return(
            <div>
                {
                  this.state.loading ?
                  <div><Spinner label={'Loading Accordion...'} /></div> :
                  (
                    (this.state.accordionData && this.state.accordionData.length > 0) ?
                    this.state.accordionData.map((item: IAccordionInfo, index : number) => {
                      return(<AccordionTiles 
                        Header={item.Title}
                        Body={item.Detail}
                        key={index}
                      />);
                    }) :
                    <div>Something is not right</div>
                  )
                }
            </div>
        );
    }
}