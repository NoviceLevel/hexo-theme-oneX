import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArchiveIcon from '@mui/icons-material/Archive';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ColorChoose from '../colorChoose';
import SideHeader from '../sideHeader';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  primaryColor?: string;
  onColorChange?: (color: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  search: <SearchIcon />,
  folder: <CategoryIcon />,
  label: <LocalOfferIcon />,
  archive: <ArchiveIcon />,
  account_circle: <AccountCircleIcon />,
};

export default function Drawer({ open, onClose, primaryColor, onColorChange }: DrawerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const drawerWidth = isMobile ? 250 : 300;
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);

  const drawerItems = themeConfig?.drawer || themeConfig?.Drawer || [
    { title: '首页', type: 'sitelink', href: '/', icon: 'home' },
    { title: 'hr', type: 'hr' },
    { title: '搜索', type: 'sitelink', href: '/search', icon: 'search' },
    { title: '分类', type: 'sitelink', href: '/categories', icon: 'folder' },
    { title: '标签', type: 'sitelink', href: '/tags', icon: 'label' },
  ];

  const handleItemClick = (item: any) => {
    if (item.type === 'sitelink') {
      window.location.hash = item.href;
    } else if (item.type === 'page') {
      window.location.hash = `/page/${item.name}`;
    } else if (item.type === 'link') {
      window.open(item.href, '_blank');
    }
    onClose();
  };

  const avatar = arrayRand(themeConfig?.img?.avatar);
  const drawerBg = arrayRand(themeConfig?.img?.drawerHeaderBg);

  return (
    <MuiDrawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: drawerWidth }}>
        <SideHeader
          avatar={avatar}
          name={site?.title || 'KonoSuba'}
          email={site?.author || ''}
          background={drawerBg}
        />
        <List>
          {drawerItems.map((item: any, index: number) => {
            if (item.type === 'hr') {
              return <Divider key={index} />;
            }
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleItemClick(item)}>
                  <ListItemIcon>{iconMap[item.icon] || <HomeIcon />}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Divider />
          <ColorChoose primaryColor={primaryColor} onColorChange={onColorChange} />
        </List>
      </Box>
    </MuiDrawer>
  );
}
