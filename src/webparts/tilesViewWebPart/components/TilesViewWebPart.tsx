import * as React from 'react';
import styles from './TilesViewWebPart.module.scss';
import { ITilesViewWebPartProps } from './ITilesViewWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITileInfo } from './ITileConfig';
import Tile from './TilesComponent/Tile';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'TilesViewWebPartWebPartStrings';

export default class TilesViewWebPart extends React.Component<ITilesViewWebPartProps, {}> {
  public render(): React.ReactElement<ITilesViewWebPartProps> {
    return (
      <div className={ styles.tilesViewWebPart }>
        <WebPartTitle displayMode={this.props.displayMode}
                    title={this.props.title}
                    updateProperty={this.props.fUpdateProperty} 
        />
        {(this.props.tilesCollection && this.props.tilesCollection.length > 0) ? 
          <div className={ styles.tilesList }>
            {
              this.props.tilesCollection.map((tile : ITileInfo) => {
                let backgroundImage: string = tile.BackgroundImage ? tile.BackgroundImage : 
                this.props.webURL + "/_layouts/15/images/blank.gif";

                return(
                  <Tile Title={tile.Title} Description={tile.Description} BackgroundImage={backgroundImage} Link={tile.Link} Height={this.props.height}/>
                );
              })
            }
          </div>
          : 
          (
            <Placeholder
              iconName='Edit'
              iconText={strings.noTilesIconText}
              description={strings.noTilesConfigured}
              buttonLabel={strings.noTilesBtn}
              onConfigure={this.props.fPropertyPaneOpen} />
          )}
      </div>
    );
  }
}
