import React, { useEffect } from 'react';
import { useCallback, useContext, useState } from 'react';

const appDataContext = React.createContext();

const defaultLists = [
    {
        id: 1,
        name: 'Продажи',
        colorId: 5,
    },
    {
        id: 2,
        name: 'Фронтенд',
        colorId: 4,
    },
    {
        id: 3,
        name: 'Фильмы и сериалы',
        colorId: 3,
    },
    {
        id: 4,
        name: 'Книги',
        colorId: 2,
    },
    {
        id: 5,
        name: 'Личное',
        colorId: 1,
    },
    {
        name: 'Спорт',
        colorId: 3,
        id: 6,
    },
    {
        name: 'Курс по ReactJS ToDo',
        colorId: 7,
        id: 7,
    },
    {
        name: 'ewrwerwer',
        colorId: 4,
        id: 8,
    },
];

const defaultTasks = [
    {
        id: 1,
        listId: 2,
        text: 'Изучить JavaScript',
        completed: true,
    },
    {
        id: 2,
        listId: 2,
        text: 'Изучить паттерны проектирования',
        completed: true,
    },
    {
        id: 3,
        listId: 2,
        text: 'ReactJS Hooks (useState, useReducer, useEffect и т.д.)',
        completed: true,
    },
    {
        id: 4,
        listId: 2,
        text: 'Redux (redux-observable, redux-saga)',
        completed: true,
    },
    {
        listId: 2,
        text: '123',
        completed: true,
        id: 5,
    },
    {
        listId: 1,
        text: 'test',
        completed: true,
        id: 6,
    },
    {
        listId: 1,
        text: 'qweqwe',
        completed: true,
        id: 7,
    },
    {
        listId: 1,
        text: 'qweqwe',
        completed: true,
        id: 8,
    },
    {
        listId: 1,
        text: '123',
        completed: true,
        id: 9,
    },
    {
        listId: 4,
        text: 'Купить 1984!',
        completed: true,
        id: 10,
    },
    {
        listId: 2,
        text: '222',
        completed: true,
        id: 12,
    },
    {
        listId: 7,
        text: 'Сделали сайдбар',
        completed: true,
        id: 15,
    },
    {
        listId: 7,
        text: 'Сделали список задач',
        completed: true,
        id: 16,
    },
    {
        listId: 7,
        text: 'Сделали удаление и редактирование задач и списков',
        completed: true,
        id: 17,
    },
    {
        listId: 8,
        text: 'tttt',
        completed: false,
        id: 18,
    },
    {
        listId: 6,
        text: 'wewrwerewrwe',
        completed: false,
        id: 19,
    },
];

const updateItemField = (itemId, fieldName, fieldValue) => {
    return (anyListWithId) => {
        const curTaskIndex = anyListWithId.findIndex(({ id }) => id === itemId);
        const curTask = anyListWithId[curTaskIndex];

        return [
            ...anyListWithId.slice(0, curTaskIndex),
            {
                ...curTask,
                [fieldName]: fieldValue,
            },
            ...anyListWithId.slice(curTaskIndex + 1),
        ];
    };
};

export const useAppData = () => useContext(appDataContext);

export const AppDataProvider = ({ children }) => {
    const [lists, setLists] = useState(() => {
        const localLists = localStorage.getItem('lists');
        return localLists ? JSON.parse(localLists) : defaultLists;
    });

    const [tasks, setTasks] = useState(() => {
        const localTasks = localStorage.getItem('tasks');
        return localTasks ? JSON.parse(localTasks) : defaultTasks;
    });

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addList = useCallback((list) => {
        setLists((s) => [...s, list]);
    }, []);

    const removeList = useCallback((listId) => {
        setLists((l) => l.filter(({ id }) => id !== listId));
    }, []);

    const addTask = useCallback((task) => {
        setTasks((t) => [...t, task]);
    }, []);

    const deleteTask = useCallback((taskId) => {
        setTasks((t) => t.filter(({ id }) => id !== taskId));
    }, []);

    const onCompleteTask = useCallback((taskId, completed = false) => {
        setTasks(updateItemField(taskId, 'completed', completed));
    }, []);

    const onEditTaskText = useCallback((taskId, text) => {
        setTasks(updateItemField(taskId, 'text', text));
    }, []);

    const onEditListName = useCallback((listId, name) => {
        setLists(updateItemField(listId, 'name', name));
    }, []);

    return (
        <appDataContext.Provider
            value={{
                lists,
                tasks,
                removeList,
                addList,
                onEditListName,
                addTask,
                deleteTask,
                onCompleteTask,
                onEditTaskText,
            }}
        >
            {children}
        </appDataContext.Provider>
    );
};
