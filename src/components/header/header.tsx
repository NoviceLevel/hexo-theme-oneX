import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { RootState } from '../../store';
import { arrayRand } from '../../lib/random';

export default function Header() {
  const theme = useTheme();
  const themeConfig = useSelector((state: RootState) => state.themeConfig.config);
  const site = useSelector((state: RootState) => state.site.data);
  const navTitle = useSelector((state: RootState) => state.nav.title);

  useEffect(() => {
    const siteTitle = site?.title || 'KonoSuba';
    if (navTitle && navTitle !== siteTitle) {
      document.title = `${navTitle} | ${siteTitle}`;
    } else {
      document.title = siteTitle;
    }
  }, [navTitle, site?.title]);

  useEffect(() => {
    const favicon = arrayRand(themeConfig?.head?.favicon);
    if (favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;

      let appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (!appleLink) {
        appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        document.head.appendChild(appleLink);
      }
      appleLink.href = favicon;
    }
  }, [themeConfig?.head?.favicon]);

  useEffect(() => {
    let metaTheme = document.querySelector("meta[name='theme-color']") as HTMLMetaElement;
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = theme.palette.primary.main;
  }, [theme.palette.primary.main]);

  useEffect(() => {
    if (site?.author) {
      let metaAuthor = document.querySelector("meta[name='author']") as HTMLMetaElement;
      if (!metaAuthor) {
        metaAuthor = document.createElement('meta');
        metaAuthor.name = 'author';
        document.head.appendChild(metaAuthor);
      }
      metaAuthor.content = site.author;
    }
  }, [site?.author]);

  useEffect(() => {
    if (site?.description) {
      let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = site.description;
    }
  }, [site?.description]);

  return null;
}
