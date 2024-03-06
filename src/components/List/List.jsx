import React from 'react';
import classNames from 'classnames';
import removeSvg from '../../assets/img/remove.svg';
import { Badge } from '../Badge/Badge';
import { colors } from '../../constants';
import { useAppData } from '../../appDataContext';
import './List.scss';

export const List = ({
    items: lists,
    isRemovable,
    onClick,
    onClickItem,
    activeItem,
}) => {
    const { removeList, tasks } = useAppData();

    const onRemoveList = (listId) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            removeList(listId);
        }
    };

    const getColor = (colorId) => {
        return colors.find(({ id }) => id === colorId);
    };

    return (
        <ul onClick={onClick} className="list">
            {lists.map((list) => {
                const tasksCount = tasks.filter(
                    ({ listId }) => listId === list.id
                ).length;
                return (
                    <li
                        key={list.id}
                        className={classNames(list.className, {
                            active: list.active
                                ? list.active
                                : activeItem && activeItem.id === list.id,
                        })}
                        onClick={
                            onClickItem ? () => onClickItem(list.id) : null
                        }
                    >
                        <i>
                            {list.icon ? (
                                list.icon
                            ) : (
                                <Badge color={getColor(list.colorId).name} />
                            )}
                        </i>
                        <span>
                            {list.name}
                            {!!tasksCount && `(${tasksCount})`}
                        </span>
                        {isRemovable && (
                            <img
                                className="list__remove-icon"
                                src={removeSvg}
                                alt="Remove icon"
                                onClick={() => onRemoveList(list.id)}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
