class Api {
  constructor(url, token) { 
    this.baseUrl = url;
    this.token = token;
  }

  getUserInfo(param) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res); 
        param(res.name, res.about, res.avatar);

      })
      .catch(err => console.log(err));
  }
  loadCards(param) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .then(res => {
         // Надо исправить: вы обращаетесь в классе к переменной cardList объявленной глобально. 
         // передайте переменную в качестве параметров в класс 
        param.render(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
	/**
  * Здравствуйте.
  
 Хочу заметить что данные авторизации лучше передать при создании класса API в ввиде объекта	
  
   * Вызывать же методы класса Api лучше из других классов
   *
   * 
   * Надо исправить: вы обращаетесь в классе к функции объявленной глобально
  * Цель данного спринта, это освоение ООП, соответственно перенесите функцию в класс, сделав из функции метод класса. 
    * После можно будет вызвать новый метод из текущего класса, предварительно передав класс в ввиде параметра.
   * Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных, классов или функций 
   * объявленных глобально, а только от тех данных которые были переданны через параметры 
   * 
     * Класс Api это отдельный класс, который ничего не знает о других классах и методах
     * Вы можете только получать данные из этого класса и использовать эти данные.
     * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
     * предварительно скажу, что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
     * Который только возвращает/записывает данные, а вы можете получить только обращаясь к этим методам.
     * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратиться к методам сервера или базы.
     * Получается отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
     * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
     *
  * Надо исправить: Необходимо вынести такие параметры как IP адрес, url или данные авторизации за класс и передавать 
    в качестве параметра при инициализации класса 

   * работа принимается только при исправлении всех "Надо исправить"
   *
  */

  /** 
   * Работа принимается
   * Дополню немножко, как бы я сделал взаимодействие между классами в файле script 
   * 
   * * Примерно такое бы получиться:
      const container = document.querySelector('.places-list'); // место куда записывать карточки
      const cards = []; // массив с карточками
      const words = {ru: { validationLenght: 'Должно быть от 2 до 30 символов'}};
      const config = {authorization: "ключ",ip: "http://95.216.175.5/cohort7",}; // настройки
      const api = new Api(config);
      const card = new Card(api);
      const validation = new FormValidator({words:words});
      const cardList = new CardList({card:card, api:api});
      cardList.render(container, cards);
      const popupCard = new PopupCard({ validation:validation,api:api});
      const popupProfile = new PopupProfile({ validation:validation,api:api});
      const popupImage = new PopupImage();
    *
   * 
   * 
   */