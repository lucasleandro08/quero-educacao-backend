import { QueryFilters, PaginatedResponse } from '../types/offer';

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getOffers(filters: QueryFilters = {}): Promise<PaginatedResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.set(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    return this.request<PaginatedResponse>(
      `/offers${queryString ? `?${queryString}` : ''}`
    );
  }
}

export const apiService = new ApiService();