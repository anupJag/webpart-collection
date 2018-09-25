import { ITileInfo } from './ITileConfig';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ITilesViewWebPartProps {
  tilesCollection: ITileInfo[];
  webURL : string;
  height : number;
  displayMode: DisplayMode;
  fUpdateProperty: (value: string) => void;
  fPropertyPaneOpen: () => void;
  title : string;
}
