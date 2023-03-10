// https://www.youtube.com/watch?v=dMNGzYVfwsc

// dependency injection это архитектурный паттерн, позволяющий создавать зависимые объекты за пределом класса, в котором они используются
// и передавать их с помощью одного из трех методов - Constructor injection, Property injection, Setter injection

/*
 * SOLID - основные принципы ООП проектирования
 *
 * S - Single responsibility      (Единственная ответственность)
 * O - Open-closed                (Открытость-закрытость)
 * L - Liskov substitution        (Подстановка Барбары Лисков)
 * I - Interface segregation      (Разделение интрефейса)
 * D - Dependency inversion       (Инверсия зависимостей)  - Модули верхних уровней не должны напрямую зависеть от нижних уровней. Между ними должна быть абстракция (интерфейс)
 */

// Пример Constructor injection (передаем объекты через конструктор класса)
interface IFruit1 {                                  // создаем абстракцию
    giveJuice(): number
}

class Apple1 implements IFruit1 {                     // создаем объект на базе абстракции
    public giveJuice(): number {
        return 50;
    }
}

class Orange1 implements IFruit1 {                    // создаем объект на базе абстракции
    public giveJuice(): number {
        return 150;
    }
}

class Juicer1 {                                      // создаем класс, принимающий абстракцию для работы
    public constructor(private fruit: IFruit1) {     // в классе создаем переменную для объекта через конструктор
    }

    public makeJuice() {
        return this.fruit.giveJuice();
    }
}

const appleJuice = new Juicer1(new Apple1()).makeJuice();
const orangeJuice = new Juicer1(new Orange1()).makeJuice();



// Пример Property injection (Передаем объекты через св-во класса)
// Так лучше не делать, потому что мы скрываем зависимости (их можно обнаружить, только если провалиться внутрь класса)
interface IFruit2 {                                  // создаем абстракцию
    giveJuice(): number
}

class Apple2 implements IFruit2 {                     // создаем объект на базе абстракции
    public giveJuice(): number {
        return 50;
    }
}

class Juicer2 {                                      // создаем класс, принимающий абстракцию для работы
    // возможно тут будет декоратор
    private fruit: IFruit2                           // создаем переменную для объекта как св-во класса

    public makeJuice() {
        return this.fruit.giveJuice();
    }
}



// Пример Setter injection (Передаем объекты через сеттер класса)
// Используется только когда класс может работать и без объекта (опциональная зависимость)
// Тут также есть сокрытие зависимостей (их можно обнаружить, только если провалиться внутрь класса)
interface IFruit3 {                                   // создаем абстракцию
    giveJuice(): number
}

class Apple3 implements IFruit3 {                     // создаем объект на базе абстракции
    public giveJuice(): number {
        return 50;
    }
}

class Juicer3 {
    private fruit: IFruit3;

    // Возможно тут будет декоратор
    public setDependency(fruit: IFruit3) {          // в классе создаем сеттер для объекта
        this.fruit = fruit;
    }
}



// IoC-контейнер - библиотека или фреймворк, отвечает за создание инстансов классов(экземпляров) и зависимости
// для React - react-simple-di, react-ioc, typescript-ioc, inversify-js