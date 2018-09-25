import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLabel
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteDetailsWpWebPartStrings';
import SiteDetailsWp from './components/SiteDetailsWp';
import { ISiteDetailsWpProps } from './components/ISiteDetailsWpProps';

export interface ISiteDetailsWpWebPartProps {
  
}

export default class SiteDetailsWpWebPart extends BaseClientSideWebPart<ISiteDetailsWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISiteDetailsWpProps > = React.createElement(
      SiteDetailsWp,
      {
        webURL: this.context.pageContext.web.absoluteUrl,
        webTitle : this.context.pageContext.web.title,
        webDescription : this.context.pageContext.web.description,
        clientContext : this.context.spHttpClient,
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneLabel(' ', {
                  text: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
