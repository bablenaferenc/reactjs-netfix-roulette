import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import MovieTile from './MovieTile';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'NetflixRoulette/MovieTile',
  component: MovieTile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    movie: { control: 'object' },
    onClick: { action: 'clicked' },
    onEdit: { action: 'edited' },
    onDelete: { action: 'deleted' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), onEdit: fn(), onDelete: fn() },
} satisfies Meta<typeof MovieTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {
      id: 1,
      imageUrl: 'https://placehold.co/600x400',
      name: 'Sample Movie',
      releaseYear: 2023,
      genres: ['Action', 'Drama'],
    },
  },
};
