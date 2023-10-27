import LineItem from 'main/Model/Realm/LineItem';
import Tag from 'main/Model/Realm/Tag';
import { typeTag } from 'main/Type/Tag';

const convertTagRealmToTagItem = (tagRealm: Tag): typeTag => {
  return {
    id: tagRealm._id,
    name: tagRealm.name,
    color: tagRealm.color,
  };
};

const isExistTagInLineItem = (
  lineItem: Realm.List<LineItem>,
  id: string,
  idMovie: string
): boolean => {
  let ans = false;
  lineItem.forEach((item) => {
    item.tags.map((tag,index) => {
      if (item.tags[index]._id === id && item.id === idMovie) {
        ans = true;
      }
    })
  });
  return ans;
};


export { convertTagRealmToTagItem, isExistTagInLineItem };
