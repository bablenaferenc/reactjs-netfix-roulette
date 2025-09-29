import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';

const meta = {
  title: 'Example/App',
  component: App,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SelectFirstTile: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tile = canvas.getByRole('group', { name: "Open movie details Inception" });
    await expect(tile).toBeInTheDocument();
    await userEvent.click(tile);
  },
};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SelectFirstMovieForEdit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: "Open menu Inception" });
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);
    const editButton = canvas.getByRole('button', { name: "Edit Inception" });
    await expect(editButton).toBeInTheDocument();
    await userEvent.click(editButton);
  },
};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const SelectFirstMovieForDelete: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: "Open menu Inception" });
    await expect(menuButton).toBeInTheDocument();
    await userEvent.click(menuButton);
    const deleteButton = canvas.getByRole('button', { name: "Delete Inception" });
    await expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);
  },
};
