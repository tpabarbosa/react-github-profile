import { createGlobalStyle, ThemeProps, withTheme } from 'styled-components';
import { AppThemeType } from '../Theme/theme.types';
  
const ThemeCSS = createGlobalStyle<ThemeProps<AppThemeType>>(({theme}) => `

    body  {
      background-color: ${ theme.primary.background};
      color: ${ theme.primary.color};
      font-family: 'Josefin Sans', sans-serif;
    }

    .primary {
      background-color: ${ theme.primary.background};
      color: ${ theme.primary.color};
    }

    .secondary {
      background-color: ${ theme.secondary.background};
      color: ${ theme.secondary.color};
    }

    .tertiary {
      background-color: ${ theme.tertiary.background};
      color: ${ theme.tertiary.color};
    }


    .btn { 
      background-color: ${ theme.button.background};
      color: ${ theme.button.color};
      cursor: pointer;
    }

    .btn:hover { 
      background-color: ${ theme.button.hover.background};
      color: ${ theme.button.hover.color};
    }

    .btn:disabled { 
      background-color: ${ theme.button.disabled.background};
      color: ${ theme.button.disabled.color};
      cursor: default;
    }

    .link { 
      cursor: pointer;
    }

    .link:visited { 
      background-color: ${ theme.link.visited.background};
      color: ${ theme.link.visited.color};
    }
    
    .link:hover { 
      background-color: ${ theme.link.hover.background};
      color: ${ theme.link.hover.color};
    }

    
`);
  
export default withTheme(ThemeCSS);