<script>
  let amountFrom = '';
  let amountTo = ''
  let currencyFrom = 'USD';
  let currencyTo = 'EUR';

  const currencies = ['USD', 'EUR', 'RUB', 'AZN'];

  function convertCurrency() {
  const API_KEY = 'cc42639f38903857ab43ad53';
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyFrom}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let exchangeRate = data.conversion_rates[currencyTo];
      amountTo = (amountFrom * exchangeRate).toFixed(2);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных:', error);
    });
  }

  function updateAmountFrom() {
    const API_KEY = 'cc42639f38903857ab43ad53';
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyTo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let exchangeRate = data.conversion_rates[currencyFrom];
      amountFrom = (amountTo * exchangeRate).toFixed(2);
      console.log(amountTo);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных:', error);
    });
  }
</script>

<h1>Конвертер Валют</h1>

<div>
  <label for="amountFrom">Из валюты: </label>
  <input type="number" id="amountFrom" bind:value={amountFrom} on:input={convertCurrency} />
  <select bind:value={currencyFrom} on:change={convertCurrency}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>

<div>
  <label for="amountTo">В валюту: </label>
  <input type="number" id="amountTo" bind:value={amountTo} on:input={updateAmountFrom} />
  <select bind:value={currencyTo} on:change={convertCurrency}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>

<div class="thanks">
  Спасибо за такое тестовое задание, было очень интересно! <br >
  Благодаря этому изучил новую технологию Svelte, изучу еще и добавлю в свое резюме!
</div>

<style>
  .thanks{
    border: 2px solid #1c40a1;
    border-radius: 10px;
    font-size: 20px;
    padding: 15px;
    margin-top: 50px;
  }

  input{
    padding: 8px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: none;
  }
  label{
    font-size: 20px;
  }
  select{
    padding: 8px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>