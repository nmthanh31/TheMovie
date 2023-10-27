import {ImageSourcePropType} from 'react-native';

export interface typeTabScreen {
  name: string;
  componentScreen: React.ComponentType<any>;
  source: ImageSourcePropType;
  sourceActive: ImageSourcePropType;
}
