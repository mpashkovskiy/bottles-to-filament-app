# Bottles To Filament App

Требования:
* (node.js)[https://nodejs.org/en/]
* прошитый Arduino

## Прошивка Arduino

1. Выбираем плату на странице http://johnny-five.io/platform-support/ (например http://johnny-five.io/platform-support/#arduino-mega);
2. Смотрим название прошивки (например Firmware: StandardFirmataPlus);
3. В Arduino IDE открываем File -> Examples -> Firmata -> [ИМЯ ПРОШИВКИ];
4. Нажимаем Upload.

## Запуск

1. Убедитесь что Arduino прошит и подключен к компьютеру
2. Выполните `make start` или запустите исполняемый файл