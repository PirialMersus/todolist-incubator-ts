import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import Task, {TaskPropsType} from "../components/Task/Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside task')
const changeTaskTitleCallback = action('Title changed inside task')
const removeTaskCallback = action('Remove button inside task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    editItem: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
    clickOnCheckBox: changeTaskStatusCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todoListId: 'todoListId1'
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todoListId: 'todoListId1'
};


