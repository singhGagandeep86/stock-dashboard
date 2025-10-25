import axios from 'axios';
import { ref } from 'vue';

import appleLogo from '@/assets/Images/logo/apple.png'
import metaLogo from '@/assets/Images/logo/meta.png'
import microsoftLogo from '@/assets/Images/logo/microsoft.png'
import googleLogo from '@/assets/Images/logo/google.png'
import amazonLogo from '@/assets/Images/logo/amazon.png'
import teslaLogo from '@/assets/Images/logo/tesla.png'
import nvidiaLogo from '@/assets/Images/logo/nvidia.png'

class StockService {
  constructor() {
    this.sheetId = '1m3h9Xce3SRMaq20li2Qg4HuSZowwxQSd9FkQmeuI7Dw';
    this.apiKey = 'AIzaSyDN75qeS4l6XHygT8AIbylsyGIPQ-H2NN8';

    this.apiClient = axios.create({
      baseURL: 'https://sheets.googleapis.com/v4/spreadsheets',
    });

    this.revenueOfCompanies = ref([]);
    this.companies = ref([]);
    this.arrayOfRevenue = ref([]);
    this.lastQuarterOfCompanies = ref([]);
  }


  async fetchData(sheetName = 'Sheet1') {
    try {
      const response = await this.apiClient.get(
        `/${this.sheetId}/values/${encodeURIComponent(sheetName)}?key=${this.apiKey}`
      );
      return response.data.values;
    } catch (error) {
      console.error(' Fehler beim Laden der Daten:', error);
      return [];
    }
  }

  async loadAll() {
    const Apple = await this.fetchData('$AAPL');
    const Meta = await this.fetchData('$META');
    const Microsoft = await this.fetchData('$MSFT');
    const Google = await this.fetchData('$GOOG');
    const Amazon = await this.fetchData('$AMZN');
    const Tesla = await this.fetchData('$TSLA');
    const Nvidia = await this.fetchData('$NVDA');


    this.revenueOfCompanies.value = [Apple[8], Meta[4], Microsoft[8], Google[4], Amazon[8], Tesla[13], Nvidia[4]];
    this.lastQuarterOfCompanies.value = [Apple[2], Meta[2], Microsoft[2], Google[2], Amazon[2], Tesla[2], Nvidia[2]];

    this.arrayOfRevenue.value = this.revenueOfCompanies.value.map(item => Object.values(item));
    this.companies.value = [
      { name: 'Apple', logo: appleLogo },
      { name: 'Meta', logo: metaLogo },
      { name: 'Microsoft', logo: microsoftLogo },
      { name: 'Google', logo: googleLogo },
      { name: 'Amazon', logo: amazonLogo },
      { name: 'Tesla', logo: teslaLogo },
      { name: 'Nvidia', logo: nvidiaLogo }
    ];
  }
}

export const stockService = new StockService();
