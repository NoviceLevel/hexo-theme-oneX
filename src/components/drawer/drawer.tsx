import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArchiveIcon from '@mui/icons-material/Archive';
import SearchIcon from '@mui/icons-material/Search';
import ColorChoose from '../colorChoose';
import SideHeader from '../sideHeader';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  primaryColor?: string;
  onColorChange?: (color: string) => void;
}

export default function Drawer({ open, onClose, primaryColor, onColorChange }: DrawerProps) {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Search', icon: <SearchIcon />, path: '/search' },
    { text: 'Archives', icon: <ArchiveIcon />, path: '/archives' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Tags', icon: <LocalOfferIcon />, path: '/tags' },
  ];

  return (
    <MuiDrawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        <SideHeader />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => { window.location.hash = item.path; onClose(); }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ColorChoose primaryColor={primaryColor} onColorChange={onColorChange} />
        </List>
      </Box>
    </MuiDrawer>
  );
}
