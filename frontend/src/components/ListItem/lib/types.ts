import { ListItem, ViewMode } from '@types';

export interface ListItemProps {
  item: ListItem;
  viewMode: ViewMode;
}
export interface ItemProps {
  handleClick: (id: number) => void;
  item: ListItem;
}
