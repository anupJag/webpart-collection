import { SPHttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IAccordionWebPartProps {
  displayMode: DisplayMode;
  description: string;
  list : string;
  webURL : string;
  spContext : SPHttpClient;
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
  title : string;
}

export interface ILoadedWebPartProps {
  description: string;
  list : string;
  webURL : string;
  spContext : SPHttpClient;
}
