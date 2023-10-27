import Space from 'main/Model/Realm/Space';
import {ImageSourcePropType} from 'react-native';

const findIconById = (id: number | undefined): ImageSourcePropType => {
  if (!id) {
    id = 0;
  }
  switch (id + 1) {
    case 1:
      return require('../Assets/IconSpace/icon-space-1.png');
    case 2:
      return require('../Assets/IconSpace/icon-space-2.png');
    case 3:
      return require('../Assets/IconSpace/icon-space-3.png');
    case 4:
      return require('../Assets/IconSpace/icon-space-4.png');
    case 5:
      return require('../Assets/IconSpace/icon-space-5.png');
    case 6:
      return require('../Assets/IconSpace/icon-space-6.png');
    default:
      return require('../Assets/IconSpace/icon-space-1.png');
  }
};

const convertSpaceRealmToSpaceItem = (item: Space) => {
  return {
    id: item._id,
    name: item.name,
    isSecret: item.isSecret,
    count: 0,
    color: item.color,
    icon: findIconById(item.icon),
  };
};

export {convertSpaceRealmToSpaceItem, findIconById};
