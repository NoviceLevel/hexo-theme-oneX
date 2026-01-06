import { Box, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { colorPalettes } from '../../lib/themes';

interface ColorChooseProps {
  primaryColor?: string;
  onColorChange?: (color: string) => void;
}

export default function ColorChoose({ primaryColor = 'cyan', onColorChange }: ColorChooseProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2, justifyContent: 'center' }}>
      {Object.entries(colorPalettes).map(([colorName, palette]) => {
        const color = palette?.primary && typeof palette.primary === 'object'
          ? (palette.primary as { main: string }).main
          : '#ccc';
        const isSelected = colorName === primaryColor;

        return (
          <IconButton
            key={colorName}
            onClick={() => onColorChange?.(colorName)}
            sx={{
              width: 32,
              height: 32,
              bgcolor: color,
              border: isSelected ? '2px solid #fff' : 'none',
              boxShadow: isSelected ? `0 0 0 2px ${color}` : 'none',
              '&:hover': { bgcolor: color, opacity: 0.8 },
            }}
          >
            {isSelected && <CheckIcon sx={{ color: '#fff', fontSize: 16 }} />}
          </IconButton>
        );
      })}
    </Box>
  );
}
