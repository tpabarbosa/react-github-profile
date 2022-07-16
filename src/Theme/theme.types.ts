export type ThemeMode = 'dark' | 'light';

export type AppThemeType = {
    name: ThemeMode;
    shadow: string;
    primary: {
        color: string;
        background: string;
    },
    secondary: {
        color: string;
        background: string;
    },
    tertiary: {
        color: string;
        background: string;
    },
    button: {
        color: string;
        background: string;
        hover: {
            color: string;
            background: string;
        };
        disabled: {
            color: string;
            background: string;
        }
    };
    link: {
        color: string;
        background: string;
        hover: {
            color: string;
            background: string;
        },
        visited: {
            color: string;
            background: string;
        },
        active: {
            color: string;
            background: string;
        }
    };
}
