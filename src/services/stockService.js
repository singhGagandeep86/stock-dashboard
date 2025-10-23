import axios from 'axios';

class StockService {
  constructor() {
    this.sheetId = '1m3h9Xce3SRMaq20li2Qg4HuSZowwxQSd9FkQmeuI7Dw';
    this.apiKey = 'AIzaSyDN75qeS4l6XHygT8AIbylsyGIPQ-H2NN8';

    this.apiClient = axios.create({
      baseURL: 'https://sheets.googleapis.com/v4/spreadsheets',
    });
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
}

export const stockService = new StockService();
