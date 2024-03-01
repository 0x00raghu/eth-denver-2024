import Pusher from 'pusher-js';
import { TransakConfig, Transak } from '@transak/transak-sdk';

export const openTransak = (productsAvailed: string, address: string) => {
  console.log(productsAvailed, 'productsAvailed');
  const transakConfig = {
    apiKey: '69feba7f-a1c2-4cfa-a9bd-43072768b0e6',
    environment: 'STAGING',
    fiatCurrency: 'EUR',
    fiatAmount: '66',
    walletAddress: address,
    network: 'base',
    productsAvailed,
    widgetHeight: '700px',
    widgetWidth: '450px',
    defaultCryptoCurrency: 'USDC',
  };

  let transakWidget = new Transak(transakConfig);

  if (transakWidget) {
    transakWidget.init();

    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, async (orderData: any) => {
      let pusher = new Pusher('1d9ffac87de599c61283', { cluster: 'ap2' });
      let orderId = orderData.status.id;
      let channel = pusher.subscribe(orderId);

      channel.bind(`ORDER_COMPLETED`, (orderData: any) => {
        console.log(orderData, 'onlyOrderId');
        transakWidget.close();
      });

      channel.bind(`ORDER_FAILED`, (orderData: any) => {
        console.log(orderData, 'onlyOrderId');
        transakWidget.close();
      });
    });
  }
};
