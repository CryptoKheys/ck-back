import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Call, CallDocument, CreateCallDto } from '../schemas/call.schema';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CallsService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>,
    private http: HttpService,
  ) {}

  async createCall(createCall: CreateCallDto): Promise<Call> {
    const createdCall = new this.callModel(createCall);
    return createdCall.save();
  }

  async findRawCalls() {
    return await this.callModel.find().lean().exec();
  }

  async findAllCalls() {
    const callsDB = await this.callModel.find().lean().exec();
    const callsArr = [];

    for (const call of callsDB) {
      const coinInfo = await this.getCallInfos(call.id).toPromise();
      callsArr.push({ ...call, ...coinInfo });
    }

    return callsArr;
  }

  async deleteCall(id: string) {
    return this.callModel.deleteOne({ _id: id });
  }

  async updateCall(body) {
    // const updatedCall = new this.callModel(body);
    const { __v, ...callToUpdate } = body;
    return this.callModel.updateOne(
      { _id: body._id },
      { $set: { ...callToUpdate } },
    );
  }

  getCallInfos(id: string): Observable<any> {
    const CG_base = 'https://api.coingecko.com/api/v3/coins/';
    const CG_options =
      '?localization=false&tickers=true&community_data=false&developer_data=false';
    const CG_full = `${CG_base}${id}${CG_options}`;
    return this.http.get(CG_full).pipe(
      map((resp) => resp.data),
      map((coinInfo) => {
        return {
          id: coinInfo.id,
          name: coinInfo.name,
          symbol: coinInfo.symbol,
          image: coinInfo.image.small,
          currentPrice: coinInfo.market_data.current_price.usd,
          marketCap: coinInfo.market_data.market_cap.usd,
          mcapRank: coinInfo.market_data.market_cap_rank,
          sentimentVotesUpPercentage: coinInfo.sentiment_votes_up_percentage,
          priceChange24h: coinInfo.market_data.price_change_24h,
          priceChangePercentage24h:
            coinInfo.market_data.price_change_percentage_24h,
          price_changePercentage7d:
            coinInfo.market_data.price_change_percentage_7d,
          priceChangePercentage14d:
            coinInfo.market_data.price_change_percentage_14d,
          priceChangePercentage30d:
            coinInfo.market_data.price_change_percentage_30d,
        };
      }),
    );
  }
}
