import models from '../models'

export default async () => {
  await models.Post.create(
    {
      title: 'День Хиросимы',
      isActive: false,
      category: '1',
      sortNumber: '500',
      body: 'Ведь именно в этот день ровно 70 лет назад произошла страшная катастрофа – атомная бомбардировка японского города Хиросима.',
      previewPicture: 'http://bunker42.com/upload/iblock/6a8/6a89a766fd20db124a82fbc6f62822a0.jpg',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'Новая экспозиция',
      isActive: false,
      category: '1',
      sortNumber: '500',
      body: 'Ежегодно 6 августа во всем мире проходят акции в поддержку уничтожения всех видов ядерного оружия.',
      previewPicture: 'http://bunker42.com/upload/iblock/1aa/1aa366177944eada7d88f87bde8d0623.jpg',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'Новая экскурсия SOVIET RUSSIA',
      isActive: false,
      category: '2',
      sortNumber: '500',
      body: 'Экскурсия "Soviet Russia" - это не только увлекательное путешествие на глубину 65 метров.',
      previewPicture: 'http://bunker42.com/upload/iblock/a5e/a5e7a6987a0ef11b2f15a2f039e94f9b.jpg',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'Олимпиада "Музеи. Парки. Усадьбы".',
      isActive: false,
      category: '2',
      sortNumber: '500',
      body: 'Олимпиада проходит с 1 ноября 2013 года по май 2014 года.',
      previewPicture: 'http://bunker42.com/upload/iblock/59c/59c54dd97b8cf5605fa088f783cddc99.jpg',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'К 23 февраля!',
      isActive: false,
      category: '2',
      sortNumber: '500',
      body: 'Уважаемые мужчины! Коллектив "Бункера - 42 на Таганке" поздравляет Вас с Днем Защитника Отечества!',
      previewPicture: 'http://bunker42.com/upload/iblock/acd/acda80230fecbda86ea4cfe08a0d4f28.png',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'Акция! Билет в подарок!',
      isActive: false,
      category: '2',
      sortNumber: '500',
      body: 'Предложение для тех, кто служил и не только! При покупке 5 билетов на экскурсии 6 в подарок!',
      previewPicture: 'http://bunker42.com/upload/iblock/542/5426f5285d4fd067bdf1e02166469d26.gif',
      userId: '1'
    }
  )
}
