import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Parameters, Preview } from '@storybook/angular';

import docJson from '../../../../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const parameters: Parameters = {
  options: {
    storySort: {
      order: [
        'Introduction',
        'Install and Configure',
        'Changelog',
        'Components',
        ['Button'],
        'Utilities',
        [
          'Helper Functions',
          'Service Mocking',
          'Directives',
          'Pipes',
          'Tokens and Theming',
          'Layout Helpers',
        ],
        'Decisions',
        ['adr-template', 'adr-24-11-15'],
      ],
    },
  },
};