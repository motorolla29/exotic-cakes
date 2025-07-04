# 🍰 Exotic Cakes — Интернет-магазин необычной выпечки

---

## 🔍 Описание проекта

**Exotic Cakes** — это full-stack проект, представляющий собой онлайн-магазин уникальной выпечки, оформленной как:

- 🏠 Домики
- 🌴 Пальмы
- 🚗 Машины
- 👟 Кроссовки
- 🎂 И другие необычные формы по фантазии кондитера

Покупатели могут выбрать любую категорию выпечки, узнать историю пекарни, найти адрес на карте, добавить мерч (футболки, кепки, кружки и т. д.) с логотипом в корзину и совершить заказ с указанием адреса доставки в пределах Лондона. Платежи проходят через **Stripe (sandbox)**, а детали заказа отправляются на почту.

---

## 💡 Основной функционал

1. **Главная страница** 🏠

   - Интегрированное видео (сгенерированное на Hailuo AI Minimax) на автоплее через **React Player**
   - Промо-картинки (сгенерированные в нейросетях Midjourney, FLUX) с короткими анимациями
   - Кнопки-переходы к основным разделам: каталог, локация, о нас, мерч

2. **Каталог выпечки** 🍰

   - Отображение товаров с подгрузкой по кнопке «Посмотреть ещё»
   - Фильтр по категориям выпечки
   - Плавная загрузка фото через **BlurHash** (миниатюра→амплитудное размытие→основное изображение)
   - Карточки товара содержат:
     - Название и краткое описание
     - Фотографии
     - Размер и состав наполнения
     - Кнопку «Добавить в корзину»

3. **Страница «Location»** 📍

   - Встроенная карта (Maplibre GL) с указанием пина на местоположение пекарни
   - Меню на текущую неделю
   - Адрес пекарни и часы работы
   - Кнопка «Построить маршрут» (открывает внешний сервис навигации)

4. **Страница «About»** ℹ️

   - Краткая история пекарни
   - Несколько нейросетевых иллюстраций

5. **Магазин мерча** 👕

   - Товары: футболки, кепки, кружки, термосы и другие сувениры с логотипом “Exotic Cakes”
   - Карточки мерча с фотографиями, ценой
   - Меню выбора опций товара
   - Кнопка «Добавить в корзину»

6. **Корзина и оформление заказа (Checkout)** 🛒

   - Просмотр добавленных товаров (выпечка + мерч)
   - Выбор адреса доставки:
     - Указать вручную через автокомплит (ограничен пределами Лондона)
     - Выбрать точку на карте
     - Ограничения пределами Лондона
   - Отображение итоговой стоимости (товары + доставка)

7. **Оплата через Stripe (sandbox)** 💳

   - Интеграция Stripe Checkout в режиме тестирования
   - После успешной оплаты:
     - Заказ сохраняется в базе
     - Письмо с деталями заказа отправляется на указанный email клиента
     - Пользователь перенаправляется на страницу «Спасибо за заказ»

8. **Email письмо с деталями заказа (гость)** 📧

   - После оформления клиент получает email с деталями заказа: список товаров, сумма, адрес и дата доставки

9. **Анимации и UX** ✨

   - Плавные переходы между разделами
   - Анимации загрузки карточек и модалок (Framer Motion, либо CSS Transitions)

---

## 🏗️ Технологический стек

- **Фронтенд:**

  - React (функциональные компоненты + хуки)
  - MobX (управление состоянием)
  - React Router (роутинг между страницами)
  - React Player (встроенное видео на главной)
  - BlurHash (`react-blurhash` + плавная загрузка картинок)
  - Maplibre GL (карта на странице «Location» и выбор адреса для доставки)
  - SASS для стилизации
  - react-stripe-js & @stripe/stripe-js (оплата через Stripe)

- **Бэкенд (Serverless Functions на Vercel):**

  - Node.js (JavaScript)
  - Vercel Serverless Functions (API routes)
  - MongoDB (Mongoose ORM)
  - nodemailer (отправка email с деталями заказа)
  - Stripe SDK (создание платежей в sandbox)

- **Хостинг и деплой:**

  - Vercel (фронтенд + API functions)
  - MongoDB Atlas (удалённая база данных)
