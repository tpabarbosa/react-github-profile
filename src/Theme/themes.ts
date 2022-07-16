import { AppThemeType } from "./theme.types";

export const dark: AppThemeType = {
    name: "dark",
    shadow:'#0078d4',
    primary: {
        color: '#d1d1d1',
        background: "#010102",
    },
    secondary: {
        color: '#cfcfcf',
        background:"#09001c",
    },
    tertiary: {
        color: '#8c9399',
        background:"#222222",
    },
    button: {
        color: '#d1d1d1',
        background: "#485c6e",
        hover: {
            color: '#fffcfc',
            background: "#1463ab",
        },
        disabled: {
            color: "#cfcfcf",
            background: "#8c9399",
        }
    },
    link: {
        color: '#d1d1d1',
        background: "#110133",
        hover: {
            color: '#1463ab',
            background: "transparent",
        },
        visited: {
            color: '#d1d1d1',
            background: "#110133",
        },
        active: {
            color: '#d1d1d1',
            background: "#110133",
        }
    }
};

export const light: AppThemeType = {
    name: "light",
    shadow:'#0078d4',
    primary: {
        color: "#07358b",
        background: "#fffcfc",
    },
    secondary: {
        color: "#07358b",
        background: "#f5f5f5",
    },
    tertiary: {
        color: '#07358b',
        background:"#e7e7e7",
    },
    button: {
        color: '#ffffff',
        background: "#4d8bc3",
        hover: {
            color: '#fffcfc',
            background: "#1463ab",
        },
        disabled: {
            color: "#cfcfcf",
            background: "#8c9399",
        }
    },
    link: {
        color: "#07358b",
        background: "#f3fde4",
        hover: {
            color: "#4d8bc3",
            background: 'transparent',
        },
        visited: {
            color: "#07358b",
            background: 'transparent',
        },
        active: {
            color: "#07358b",
            background: 'transparent',
        }
    }
}