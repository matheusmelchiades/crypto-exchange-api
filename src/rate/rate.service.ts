import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppGateway } from 'src/app.gateway';
import { AppService } from 'src/app.service';
import { CreateExchangeDto } from 'src/dto/create-exchange.dto';

@Injectable()
export class RateService {
  private readonly logger = new Logger(RateService.name);

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly appGateway: AppGateway,
  ) {}

  async getRatesByCurrency(
    currencyBase = 'BTC',
    currencies = ['USD', 'EUR', 'GBP'],
  ): Promise<CreateExchangeDto[]> {
    const apiUrl = this.configService.get('API_RATE') || '';
    const apiKey = this.configService.get('API_RATE_KEY') || '';

    return this.httpService.axiosRef
      .get(`${apiUrl}/${currencyBase}`, {
        headers: {
          'X-CoinAPI-Key': apiKey,
        },
        params: {
          invert: false,
          filter_asset_id: currencies.join(),
        },
      })
      .then(({ data: { asset_id_base = '', rates = [] } }) =>
        rates?.map((rate) => ({
          currencyFrom: asset_id_base,
          amountFrom: 1,
          currencyTo: rate?.asset_id_quote,
          amountTo: rate?.rate,
          type: 'live_price',
        })),
      )
      .catch((err) => {
        this.logger.error('Error to get rate in external API: ' + err.message);
        return [];
      });
  }

  async getAllRates(): Promise<CreateExchangeDto[]> {
    const cryptoCurrenciesEnv =
      this.configService.get('CRYPTO_CURRENCIES') || '';
    const fiatCurrenciesEnv = this.configService.get('FIAT_CURRENCIES') || '';
    const cryptoCurrencies = cryptoCurrenciesEnv.split(',');
    const fiatCurrencies = fiatCurrenciesEnv.split(',');

    const promises = await Promise.all(
      cryptoCurrencies.map((cryptoCurrency) =>
        this.getRatesByCurrency(cryptoCurrency, fiatCurrencies),
      ),
    );

    return promises.flat();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Start Job');

    const rates = await this.getAllRates();

    this.logger.debug('Get all rates');

    await this.appService.createMany(rates);

    this.logger.debug('Save all rates');

    this.appGateway.hasUpdate();

    this.logger.debug('Report rates');

    this.logger.debug('Finish Job');
  }
}
