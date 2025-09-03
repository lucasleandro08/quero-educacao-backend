import { readFileSync } from 'fs';
import { join } from 'path';
import { RawOffer, ProcessedOffer } from '../domain/offer.js';
import { KIND_MAPPINGS, LEVEL_MAPPINGS, formatCurrency, calculateDiscountPercentage } from '../domain/mappings.js';
export class DataLoader {
  private static instance: DataLoader;
  private cachedData: ProcessedOffer[] | null = null;

  private constructor() {}

  static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  loadOffers(): ProcessedOffer[] {
    if (this.cachedData) {
      return this.cachedData;
    }

    try {
      const dataPath = join(process.cwd(), 'data.json');
      const rawData = readFileSync(dataPath, 'utf-8');
      const rawOffers: RawOffer[] = JSON.parse(rawData);
      
      this.cachedData = this.processOffers(rawOffers);
      return this.cachedData;
    } catch (error) {
      throw new Error(`Failed to load offers data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private processOffers(rawOffers: RawOffer[]): ProcessedOffer[] {
    return rawOffers.map(offer => ({
      courseName: offer.courseName,
      rating: offer.rating,
      fullPrice: formatCurrency(offer.fullPrice),
      offeredPrice: formatCurrency(offer.offeredPrice),
      discountPercentage: calculateDiscountPercentage(offer.fullPrice, offer.offeredPrice),
      kind: KIND_MAPPINGS[offer.kind],
      level: LEVEL_MAPPINGS[offer.level],
      iesLogo: offer.iesLogo,
      iesName: offer.iesName
    }));
  }

  //get raw data
  loadRawOffers(): RawOffer[] {
    try {
      const dataPath = join(process.cwd(), 'data.json');
      const rawData = readFileSync(dataPath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Failed to load raw offers data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}