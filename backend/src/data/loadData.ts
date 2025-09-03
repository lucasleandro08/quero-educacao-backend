// backend/src/data/loadData.ts
import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { RawOffer, ProcessedOffer } from '../domain/offer.js';
import { KIND_MAPPINGS, LEVEL_MAPPINGS, formatCurrency, calculateDiscountPercentage } from '../domain/mappings.js';

export class DataLoader {
  private static instance: DataLoader;
  private cachedData: ProcessedOffer[] | null = null;
  private cachedRawData: RawOffer[] | null = null;

  private constructor() {}

  static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  static resetCache(): void {
    if (DataLoader.instance) {
      DataLoader.instance.cachedData = null;
      DataLoader.instance.cachedRawData = null;
    }
  }

  loadRawOffers(): RawOffer[] {
    if (this.cachedRawData) {
      return this.cachedRawData;
    }

    try {
      const dataPath = this.findDataFilePath();
      const rawData = this.readAndCleanFile(dataPath);
      const parsedData = JSON.parse(rawData);
      const offersArray = this.normalizeJsonData(parsedData);

      this.validateOffersArray(offersArray);
      this.validateOffersStructure(offersArray);
      
      this.cachedRawData = offersArray;
      return offersArray;
    } catch (error) {
      this.handleLoadError(error);
    }
  }

  loadOffers(): ProcessedOffer[] {
    if (this.cachedData) {
      return this.cachedData;
    }

    const rawOffers = this.loadRawOffers();
    this.cachedData = this.processOffers(rawOffers);
    return this.cachedData;
  }

  private findDataFilePath(): string {
    const strategies = this.getPathStrategies();
    
    for (const strategy of strategies) {
      try {
        const path = strategy();
        if (path && existsSync(path)) {
          return path;
        }
      } catch {
        continue;
      }
    }

    throw new Error('data.json file not found in expected locations');
  }

  private getPathStrategies(): Array<() => string> {
    return [
      () => join(process.cwd(), 'data.json'),
      () => join(process.cwd(), '..', 'data.json'),
      () => this.getPathWithDirname('..', '..', 'data.json'),
      () => this.getPathWithDirname('..', '..', '..', 'data.json'),
      () => join(process.cwd(), 'backend', 'data.json'),
      () => resolve(process.cwd(), 'backend', '..', 'data.json')
    ];
  }

  private getPathWithDirname(...pathSegments: string[]): string {
    try {
      // @ts-ignore
      return join(__dirname, ...pathSegments);
    } catch {
      return '';
    }
  }

  private readAndCleanFile(filePath: string): string {
    const rawData = readFileSync(filePath, 'utf-8');
    const cleanData = this.stripBOM(rawData);
    
    if (!cleanData.trim()) {
      throw new Error('Data file is empty');
    }
    
    return cleanData;
  }

  private stripBOM(content: string): string {
    return content.replace(/^\uFEFF/, '');
  }

  private normalizeJsonData(parsedData: any): RawOffer[] {
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
    
    if (this.isObjectWithOffers(parsedData)) {
      if (Array.isArray(parsedData.offers)) {
        return parsedData.offers;
      }
      throw new Error('Property "offers" must contain an array');
    }
    
    throw new Error(`Unsupported data format. Expected array or object with "offers" property, received: ${typeof parsedData}`);
  }

  private isObjectWithOffers(data: any): boolean {
    return data && typeof data === 'object' && 'offers' in data;
  }

  private validateOffersArray(offers: any[]): void {
    if (offers.length === 0) {
      throw new Error('Offers array is empty');
    }
  }

  private validateOffersStructure(offers: any[]): void {
    const requiredFields = ['courseName', 'rating', 'fullPrice', 'offeredPrice', 'kind', 'level', 'iesName'];
    const samplesToValidate = Math.min(offers.length, 3);
    
    for (let i = 0; i < samplesToValidate; i++) {
      const missingFields = this.getMissingFields(offers[i], requiredFields);
      if (missingFields.length > 0) {
        throw new Error(`Offer ${i + 1} is missing required fields: ${missingFields.join(', ')}`);
      }
    }
  }

  private getMissingFields(offer: any, requiredFields: string[]): string[] {
    return requiredFields.filter(field => !(field in offer));
  }

  private processOffers(rawOffers: RawOffer[]): ProcessedOffer[] {
    return rawOffers.map(offer => this.processOffer(offer));
  }

  private processOffer(offer: RawOffer): ProcessedOffer {
    return {
      courseName: offer.courseName,
      rating: offer.rating,
      fullPrice: formatCurrency(offer.fullPrice),
      offeredPrice: formatCurrency(offer.offeredPrice),
      discountPercentage: calculateDiscountPercentage(offer.fullPrice, offer.offeredPrice),
      kind: KIND_MAPPINGS[offer.kind],
      level: LEVEL_MAPPINGS[offer.level],
      iesLogo: offer.iesLogo,
      iesName: offer.iesName
    };
  }

  private handleLoadError(error: unknown): never {
    if (error instanceof SyntaxError) {
      throw new Error(`JSON parsing error: ${error.message}`);
    }
    
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to load data: ${message}`);
  }
}
