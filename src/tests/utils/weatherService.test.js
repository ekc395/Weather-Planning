// Test file for weatherService utility functions
// Created by: Ethan Chen

import { weatherService } from '../../utils/weatherService';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('weatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('getWeatherForecast', () => {
    test('successfully fetches weather data', async () => {
      const mockWeatherData = {
        daily: {
          time: ['2024-01-15', '2024-01-16'],
          weather_code: [0, 1],
          temperature_2m_max: [20, 22],
          temperature_2m_min: [10, 12]
        },
        hourly: {
          time: ['2024-01-15T00:00', '2024-01-15T01:00'],
          weather_code: [0, 1],
          temperature_2m: [15, 16]
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeatherData
      });

      const result = await weatherService.getWeatherForecast(40.7128, -74.0060, '2024-01-15', '2024-01-16');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.open-meteo.com/v1/forecast')
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('date', '2024-01-15');
      expect(result[0]).toHaveProperty('weatherCondition', 'sunny');
    });

    test('handles API error', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      await expect(
        weatherService.getWeatherForecast(40.7128, -74.0060, '2024-01-15', '2024-01-16')
      ).rejects.toThrow('Weather API error: 500');
    });
  });

  describe('findBestEventDate', () => {
    const mockWeatherData = [
      {
        date: '2024-01-15',
        weatherCondition: 'sunny',
        avgTemp: 75,
        hourlyData: [
          { time: '2024-01-15T10:00', weatherCondition: 'sunny', temperature: 75 },
          { time: '2024-01-15T11:00', weatherCondition: 'sunny', temperature: 76 }
        ]
      },
      {
        date: '2024-01-16',
        weatherCondition: 'rainy',
        avgTemp: 60,
        hourlyData: []
      }
    ];

    test('finds best date matching weather preference', () => {
      const result = weatherService.findBestEventDate(mockWeatherData, 'sunny', 'warm');

      expect(result).toEqual({
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '11:00',
        weather: 'sunny',
        temperature: 75,
        confidence: 'medium'
      });
    });

    test('returns null when no matching weather found', () => {
      const result = weatherService.findBestEventDate(mockWeatherData, 'snowy', 'cold');
      expect(result).toBeNull();
    });

    test('handles multiple weather conditions', () => {
      const result = weatherService.findBestEventDate(mockWeatherData, ['sunny', 'cloudy'], 'warm');
      expect(result).not.toBeNull();
      expect(result.date).toBe('2024-01-15');
    });
  });

  describe('getCurrentLocation', () => {
    test('successfully gets user location', async () => {
      const mockPosition = {
        coords: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      };

      // Mock geolocation
      const mockGeolocation = {
        getCurrentPosition: jest.fn((success) => success(mockPosition))
      };
      global.navigator.geolocation = mockGeolocation;

      const result = await weatherService.getCurrentLocation();

      expect(result).toEqual({
        latitude: 40.7128,
        longitude: -74.0060
      });
    });

    test('falls back to default location on error', async () => {
      const mockGeolocation = {
        getCurrentPosition: jest.fn((success, error) => error(new Error('Permission denied')))
      };
      global.navigator.geolocation = mockGeolocation;

      const result = await weatherService.getCurrentLocation();

      expect(result).toEqual({
        latitude: 40.7128,
        longitude: -74.0060
      });
    });
  });

  describe('geocodeLocation', () => {
    test('successfully geocodes location', async () => {
      const mockGeocodingData = {
        results: [{
          latitude: 40.7128,
          longitude: -74.0060,
          name: 'New York',
          country: 'United States'
        }]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeocodingData
      });

      const result = await weatherService.geocodeLocation('New York, NY');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://geocoding-api.open-meteo.com/v1/search')
      );
      expect(result).toEqual({
        latitude: 40.7128,
        longitude: -74.0060,
        name: 'New York',
        country: 'United States'
      });
    });

    test('handles location not found', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [] })
      });

      await expect(
        weatherService.geocodeLocation('Nonexistent City')
      ).rejects.toThrow('Location "Nonexistent City" not found');
    });
  });
});
