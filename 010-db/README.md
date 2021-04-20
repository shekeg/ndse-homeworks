# Домашнее задание к занятию «2.5 База данных и хранение данных»

**Правила выполнения домашней работы:** 
* Выполняйте домашнее задание в отдельной ветке проекта на гитхабе.
* В поле для сдачи работы прикрепите ссылку на ваш проект в Git.
* Присылать на проверку можно каждую задачу по отдельности или все задачи вместе. 
* Во время проверки по частям ваша домашняя работа будет со статусом «На доработке».
* Любые вопросы по решению задач задавайте в Slack.


#### Задание 1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации про использование [**CRUD Operations**](https://docs.mongodb.com/manual/crud/)

#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
 - запрос для *поиска* полей документов коллекции **books** по полю *title*
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

# Решение:

- Запрос на вставку

```bash
> db.books.insertMany([{title: 'title1', description: 'description1', authors: 'authors1'}, {title: 'title2', description: 'description2', authors: 'authors2'}])
{
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("607e57bb3ae6455f991d6e15"),
		ObjectId("607e57bb3ae6455f991d6e16")
	]
}
```

- Запрос на поиск

```bash
> db.books.find({ title: { $eq: 'title1'  } }, { title: 1, description: 1, authors: 1  })
{ "_id" : ObjectId("607e57bb3ae6455f991d6e15"), "title" : "title1", "description" : "description1", "authors" : "authors1" }
```

- Запрос на редактирование

```bash
> db.books.updateOne({_id: ObjectId('607e57bb3ae6455f991d6e15')}, {$set:{"description": 'description11', "authors": 'authors11'}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.books.find()
{ "_id" : ObjectId("607e57bb3ae6455f991d6e15"), "title" : "title1", "description" : "description11", "authors" : "authors11" }
{ "_id" : ObjectId("607e57bb3ae6455f991d6e16"), "title" : "title2", "description" : "description2", "authors" : "authors2" }
```
