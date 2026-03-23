import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ItemGrid } from './ui/ItemGrid';
import { ItemRow } from './ui/ItemRow';
import { ListItemProps } from './lib/types';

export const AdListItem = ({ item, viewMode }: ListItemProps) => {
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(`${id}`);

  return (
    <List.Item>
      {viewMode === 'grid' ? (
        <ItemGrid item={item} handleClick={handleClick} />
      ) : (
        <ItemRow item={item} handleClick={handleClick} />
      )}
    </List.Item>
  );
};
