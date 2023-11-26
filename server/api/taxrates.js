// predefined tax rates over three fiscal years
const rates = [
  {
    year: 2024,
    rates: [
      { start: 0, end: 18200, rate: 0 },
      { start: 18201, end: 45000, rate: 0.19 },
      { start: 45001, end: 120000, rate: 0.325 },
      { start: 120001, end: 180000, rate: 0.37 },
      { start: 180001, end: -1, rate: 0.45 }
    ]
  },
  {
    year: 2023,
    rates: [
      { start: 0, end: 18200, rate: 0 },
      { start: 18201, end: 45000, rate: 0.2 },
      { start: 45001, end: 120000, rate: 0.325 },
      { start: 120001, end: 180000, rate: 0.37 },
      { start: 180001, end: -1, rate: 0.45 }
    ]
  },
  {
    year: 2022,
    rates: [
      { start: 0, end: 18200, rate: 0 },
      { start: 18201, end: 45000, rate: 0.21 },
      { start: 45001, end: 120000, rate: 0.375 },
      { start: 120001, end: 180000, rate: 0.37 },
      { start: 180001, end: -1, rate: 0.5 }
    ]
  }
]

export default defineEventHandler(() => ({ rates }));
