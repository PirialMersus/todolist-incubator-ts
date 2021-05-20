import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';
import EditableSpan, {EditableSpanPropsType} from "../components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpan changed'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    }
  },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  editItem: action('Value EditableSpan changed')
};
//
// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
