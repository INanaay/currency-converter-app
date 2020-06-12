<template>
  <div class="main-container">
  <div class="converter">

    <div class="currency-container">
      <div class="dropdown_title">From</div>
      <v-select :clearable="false" v-model="selectedFrom" label="name"
                :options=currencies></v-select>
      <div class="input_container">
        <input v-bind:value="value"
               v-on:input="value = $event.target.value" placeholder="0"
               @keypress="isNumber($event)">
      </div>
    </div>

    <div class="confirm">
     <button v-on:click="convert">
       Convert
     </button>
  </div>

    <div class="currency-container">
      <div class="dropdown_title">To</div>
      <v-select :clearable="false" label="name"  v-model="selectedTo"
                :options=currencies></v-select>
      <div class="input_container">
        <input  v-model="convertedValue" placeholder="0" :disabled="true">
      </div>
    </div>

  </div>
    <div class="chart-container">
      <h2>{{chartTitle}} Daily Exchange Volume</h2>
      <vue-apex-charts width="500" type="bar" :options="chartOptions" :series="series">
      </vue-apex-charts>
    </div>
  </div>
</template>


<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueApexCharts from 'vue-apexcharts';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import currencies from '../assets/currencies.json';
import api from '../utils/ApiManager';

export default {
  name: 'MainPage',
  components: {
    vSelect,
    VueNumberInput,
    VueApexCharts,
  },
  data() {
    return {
      currencies,
      value: 1,
      selectedFrom: currencies[4],
      selectedTo: currencies[2],
      convertedValue: null,
      history: null,
      chartTitle: currencies[2].name,
      chartOptions: {

      },
      series: [],
    };
  },
  methods: {
    updateChart() {
      const dates = [];
      const data = [];

      this.chartTitle = this.selectedTo.name;
      this.history.forEach((element) => {
        const tsMs = element.time * 1000;
        const tempDate = new Date(tsMs);
        const month = (`0${tempDate.getMonth() + 1}`).slice(-2);
        const day = (`0${tempDate.getDate()}`).slice(-2);

        dates.push(`${day}/${month}`);
        data.push(element.volume);
      });
      this.series = [{
        data,
      }];
      this.chartOptions = {
        xaxis: {
          categories: dates,
        },
        dataLabels: {
          enabled: false,
        },
      };
    },
    isNumber(evt) {
      // eslint-disable-next-line no-param-reassign
      evt = (evt) || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
        return false;
      }
      return true;
    },
    async convert() {
      if (!this.selectedTo || !this.selectedFrom || !this.value) {
        alert('You must enter all fields correctly');
        return;
      }
      const response = await api.convertCurrency(this.selectedFrom.code,
        this.selectedTo.code, this.value);
      if (response.status === 200) {
        this.convertedValue = response.data.converted_value;
        this.history = response.data.history;
        this.updateChart();
      }
    },
  },

  mounted() {
    this.convert();
  },

};
</script>

<style>

  .converter {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    padding: 50px;
  }

  .currency-container {
    display: flex;

    flex-direction: column;
    flex: 5;
  }

  .dropdown_title {
    font-size: 13px;
    margin-bottom: 5px;
    color: rgba(0,0,0,0.6);
    text-transform: uppercase;
  }

  .confirm {
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: center;
  }

  >>> .v-select .dropdown-toggle .clear {
    display: none;
  }

  .input_container {
    position: relative;
    margin-top: 20px;
  }

  .input_container input {
    height: 100px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 52px;
    font-weight: 200;
    text-indent: 50px;
    margin-bottom: 20px;
    color: rgba(0,0,0,0.6);
    background: transparent;
    border-bottom:  1px solid #eee;
  }

  .confirm button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    margin-top: 15px;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  @media screen and (max-width: 765px){
    .converter {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .confirm {
      margin-bottom: 30px;
    }
  }

  .chart-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

</style>
