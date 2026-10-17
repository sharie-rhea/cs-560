import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#16a34a', // green-600
          secondary: '#6b7280', // gray-500
          accent: '#7e22ce', // purple-700
          error: '#dc2626', // red-600
          info: '#3b82f6', // blue-500
          success: '#10b981', // green-500
          warning: '#f59e0b', // amber-500
          background: '#ffffff',
          surface: '#ffffff',
          'surface-variant': '#f9fafb', // gray-50
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-background': '#111827', // gray-900
          'on-surface': '#111827',
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: 'lg',
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
    },
    VCard: {
      elevation: 0,
      border: true,
    },
    VList: {
      density: 'comfortable',
    },
  },
});
