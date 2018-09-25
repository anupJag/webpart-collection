import * as React from 'react';
import styles from './AccordionWebPart.module.scss';
import { IAccordionWebPartProps } from './IAccordionWebPartProps';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'AccordionWebPartWebPartStrings';
import LoadedController from './LoadedController';

export default class AccordionWebPart extends React.Component<IAccordionWebPartProps, {}> {


  public render(): React.ReactElement<IAccordionWebPartProps> {
    return (
      <div className={ styles.accordionWebPart }>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.fUpdateProperty} />
          {
            this.props.list != undefined ? 
              <LoadedController 
                  description={this.props.description}
                  list={this.props.list}
                  spContext={this.props.spContext}
                  webURL={this.props.webURL}
              />
            :
            (
              <Placeholder
                iconName='Edit'
                iconText={strings.noTilesIconText}
                description={strings.noTilesConfigured}
                buttonLabel={strings.noTilesBtn}
                onConfigure={this.props.fPropertyPaneOpen} />
            )
          }  
      </div>
    );
  }
}
