// https://ru.reactjs.org/docs/reconciliation.html

import React from 'react';

// Для экономии ресурсов при ререндере React сравнивает два DOM дерева (старое и новое).
// Сравнение идет от корневых эл-тов к ветвям.

// Сначала сравниваются типы(теги) эл-тов. Если они поменялись, то вся ветка ререндрится, состояния (данные) теряются. (componentWillUnmount, затем componentDidMount)
// Это может вызвать нежелательный ререндер, если React, пробегаясь по ветвям обнаружит не тот тег, что он ожидал
// Можно решить эту проблему, добавив тегу атрибут `key`. Тогда React увидит, что тег переместился и не будет ререндерить ветку, просто довнесет изменения.

// Затем сравниваются атрибуты тегов. Если они поменялись, то обновляются только атрибуты (ветка стоит дальше)



// Ключи в React также позволяют решить проблему бессмысленного ререндера.
// Например, если у нас есть список эл-тов, в который мы добавляем новый эл-т в начало,
// то без ключей придется его полностью ререндерить, тк все эл-ты поменяли свой индекс
// <ul>
//   <li>Санкт-Петербург</li>
//   <li>Москва</li>
// </ul>
//
// <ul>
//   <li>Ростов-на-Дону</li>
//   <li>Санкт-Петербург</li>
//   <li>Москва</li>
// </ul>

// Ключи позволяют React'у видеть изменения в порядке эл-тов, где конкретно произошли изменения и ререндерить только эти эл-ты
// <ul>
//   <li key="2015">Санкт-Петербург</li>
//   <li key="2016">Москва</li>
// </ul>
//
// <ul>
//   <li key="2014">Ростов-на-Дону</li>
//   <li key="2015">Санкт-Петербург</li>
//   <li key="2016">Москва</li>
// </ul>

// В текущей версии (18) React отслеживает ключи только у соседей, но не в других местах