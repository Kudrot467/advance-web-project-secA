import { Injectable } from '@nestjs/common';

@Injectable()
export class AboutService {
  getAboutInfo(): string {
    return 'Welcome to TripNest! We are a booking website specializing in travel accommodations. For more info please call : 16999';
  }
}
