import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/propertyFields/number';
import * as strings from 'TilesViewWebPartWebPartStrings';
import TilesViewWebPart from './components/TilesViewWebPart';
import { ITilesViewWebPartProps } from './components/ITilesViewWebPartProps';
import { ITileInfo } from './components/ITileConfig';

export interface ITilesViewWebPartWebPartProps {
  tilesDataCollection: ITileInfo[];
  height: number;
  title: string;
}

export default class TilesViewWebPartWebPart extends BaseClientSideWebPart<ITilesViewWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITilesViewWebPartProps > = React.createElement(
      TilesViewWebPart,
      {
        title: this.properties.title,
        tilesCollection: this.properties.tilesDataCollection,
        webURL : this.context.pageContext.web.absoluteUrl,
        height: this.properties.height,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneLabel(' ', {
                  text: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.ConfigurationPane,
              groupFields: [
                PropertyFieldCollectionData('tilesDataCollection', {
                  label: strings.TilesCollectionLabel,
                  key: 'tilesDataCollection',
                  panelHeader: strings.TilesCollectionPanelHeader,
                  manageBtnLabel: strings.TilesCollectionBtnManage,
                  value: this.properties.tilesDataCollection,
                  panelDescription : strings.TilesCollectionPanelDescription,
                  fields:[
                    {
                      id: "Title",
                      title: "Title",
                      type: CustomCollectionFieldType.string,
                      required: true,
                    },
                    {
                      id: "BackgroundImage",
                      title: "Background Image URL",
                      type: CustomCollectionFieldType.url,
                    },
                    {
                      id: "Description",
                      title: "Description about your Tile",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "Link",
                      title: "Link of your Tile",
                      type: CustomCollectionFieldType.url,
                      required: true,
                    }
                  ],
                  disabled: false
                }),
                PropertyFieldNumber('height', {
                  key: 'height',
                  label: strings.SetTileHeight,
                  value: this.properties.height,
                  minValue: 0,
                  description: strings.SetTileHeightDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
