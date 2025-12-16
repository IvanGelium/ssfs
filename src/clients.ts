const apiUrl =
  'https://script.google.com/macros/s/AKfycby4LYUuc0aed9UsS6BDwBXitoLLUKp2Wzy2RSaaODfb4oStNaZMY1yR0l_XNdFKAGCS/exec'

class SecretSantaClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
    this.sessionToken = localStorage.getItem('santa_session')
  }

  async register(name, password, description = '') {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      mode: 'no-cors', // или 'cors' если настроено
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'register',
        name: name,
        password: password,
        description: description,
      }),
    })
    const test = await response.text()
    console.log('response.text(): ', test)
    console.log('raw: ', response)
    return response.json()
  }

  async login(name, password) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        name: name,
        password: password,
      }),
    })
    const result = await response.json()
    if (result.success) {
      this.sessionToken = result.sessionToken
      localStorage.setItem('santa_session', result.sessionToken)
    }
    return result
  }

  async getWard() {
    if (!this.sessionToken) {
      throw new Error('Необходима авторизация')
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'get_ward',
        sessionToken: this.sessionToken,
      }),
    })
    return response.json()
  }

  logout() {
    localStorage.removeItem('santa_session')
    this.sessionToken = null
  }
}

// Использование
const client = new SecretSantaClient(apiUrl)
export default client

// // Регистрация
// await client.register('Вася', 'пароль123', 'Люблю книги');

// // Вход
// await client.login('Вася', 'пароль123');

// // Получение подопечного (только один раз!)
// const result = await client.getWard();
// console.log(`Вы дарите: ${result.ward.name}`);
// console.log(`Описание: ${result.ward.description}`);
