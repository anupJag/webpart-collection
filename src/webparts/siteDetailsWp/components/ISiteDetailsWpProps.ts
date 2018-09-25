import { SPHttpClient } from '@microsoft/sp-http'

export interface ISiteDetailsWpProps {
  webURL: string;
  webTitle: string;
  webDescription : string;
  clientContext : SPHttpClient;
}
