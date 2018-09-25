import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import * as strings from 'AccordionWebPartWebPartStrings';
import AccordionWebPart from './components/AccordionWebPart';
import { IAccordionWebPartProps } from './components/IAccordionWebPartProps';

export interface IAccordionWebPartWebPartProps {
  description: string;
  list : string;
  title : string;
}

export default class AccordionWebPartWebPart extends BaseClientSideWebPart<IAccordionWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAccordionWebPartProps> = React.createElement(
      AccordionWebPart,
      {
        title: this.properties.title,
        description: this.properties.description,
        list : this.properties.list,
        webURL : this.context.pageContext.web.absoluteUrl,
        spContext : this.context.spHttpClient,
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

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: 'Accordion Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldListPicker('list', {
                  baseTemplate: 100,
                  label: strings.SelectList,
                  includeHidden : false,
                  disabled: false,
                  context : this.context,
                  deferredValidationTime : 0,
                  selectedList : this.properties.list,
                  properties : this.properties,
                  key: 'listPickerFieldId',
                  onPropertyChange : this.onPropertyPaneFieldChanged.bind(this),
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  onGetErrorMessage: null
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
