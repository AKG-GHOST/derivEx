
// ============================================================
//  DERIVATIVES TRADING PLATFORM \u2014 CORE ENGINE
//  script.js  |  ES Module
// ============================================================

'use strict';

// \u2500\u2500 Chart.js loaded via CDN (see HTML heads) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

// ============================================================
//  1. ASSET DEFINITIONS
// ============================================================
const STOCK_EXCHANGE_DERIVATIVES = [
  // \u2500\u2500 Stock Futures \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'SF_AAPL', symbol: 'AAPL-FUT', name: 'Apple Stock Future',
    type: 'Stock Future', expiry: 'Jun 2025',
    price: 189.50, prevClose: 187.20,
    lotSize: 100, margin: 15, risk: 2,
    description: 'Futures contract to buy/sell AAPL at a set price on a future date.',
    color: '#3b82f6', icon: 'SF'
  },
  {
    id: 'SF_TSLA', symbol: 'TSLA-FUT', name: 'Tesla Stock Future',
    type: 'Stock Future', expiry: 'Jun 2025',
    price: 172.30, prevClose: 169.80,
    lotSize: 100, margin: 20, risk: 3,
    description: 'Futures contract on Tesla stock.',
    color: '#ef4444', icon: 'SF'
  },
  {
    id: 'SF_MSFT', symbol: 'MSFT-FUT', name: 'Microsoft Stock Future',
    type: 'Stock Future', expiry: 'Sep 2025',
    price: 415.60, prevClose: 412.10,
    lotSize: 50, margin: 12, risk: 2,
    description: 'Futures contract on Microsoft stock.',
    color: '#06b6d4', icon: 'SF'
  },
  // \u2500\u2500 Stock Options \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'SO_AAPL_C', symbol: 'AAPL-200C', name: 'AAPL Call Option $200',
    type: 'Stock Option (Call)', expiry: 'Jun 2025',
    price: 8.40, prevClose: 7.90, strike: 200,
    lotSize: 100, margin: 100, risk: 4,
    description: 'Right to BUY 100 AAPL shares at $200 before expiry.',
    color: '#10b981', icon: 'CO'
  },
  {
    id: 'SO_AAPL_P', symbol: 'AAPL-185P', name: 'AAPL Put Option $185',
    type: 'Stock Option (Put)', expiry: 'Jun 2025',
    price: 5.20, prevClose: 5.80, strike: 185,
    lotSize: 100, margin: 100, risk: 4,
    description: 'Right to SELL 100 AAPL shares at $185 before expiry.',
    color: '#f59e0b', icon: 'PO'
  },
  {
    id: 'SO_SPY_C', symbol: 'SPY-500C', name: 'SPY Call Option $500',
    type: 'Stock Option (Call)', expiry: 'Jul 2025',
    price: 12.50, prevClose: 11.90, strike: 500,
    lotSize: 100, margin: 100, risk: 3,
    description: 'Right to BUY SPY ETF at $500.',
    color: '#10b981', icon: 'CO'
  },
  // \u2500\u2500 Index Futures \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'IF_SP500', symbol: 'ES-FUT', name: 'S&P 500 Index Future',
    type: 'Index Future', expiry: 'Jun 2025',
    price: 5242.75, prevClose: 5198.20,
    lotSize: 1, margin: 5, risk: 2,
    description: 'Futures contract on the S&P 500 index.',
    color: '#8b5cf6', icon: 'IF'
  },
  {
    id: 'IF_NIFTY', symbol: 'NIFTY-FUT', name: 'Nifty 50 Index Future',
    type: 'Index Future', expiry: 'Jun 2025',
    price: 24320.50, prevClose: 24105.80,
    lotSize: 50, margin: 5, risk: 2,
    description: 'Futures contract on Indias Nifty 50 index.',
    color: '#f97316', icon: 'IF'
  },
  {
    id: 'IF_NQ', symbol: 'NQ-FUT', name: 'Nasdaq-100 Index Future',
    type: 'Index Future', expiry: 'Jun 2025',
    price: 18420.25, prevClose: 18210.40,
    lotSize: 1, margin: 5, risk: 3,
    description: 'Futures contract on the Nasdaq-100 index.',
    color: '#06b6d4', icon: 'IF'
  },
  // \u2500\u2500 Index Options \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'IO_SP500', symbol: 'SPX-5300C', name: 'S&P 500 Index Call 5300',
    type: 'Index Option (Call)', expiry: 'Jun 2025',
    price: 42.80, prevClose: 38.50, strike: 5300,
    lotSize: 1, margin: 100, risk: 4,
    description: 'Option on S&P 500 index level at 5300.',
    color: '#10b981', icon: 'IO'
  },
  {
    id: 'IO_NIFTY', symbol: 'NIFTY-24000P', name: 'Nifty 50 Put 24000',
    type: 'Index Option (Put)', expiry: 'Jun 2025',
    price: 185.60, prevClose: 195.20, strike: 24000,
    lotSize: 50, margin: 100, risk: 4,
    description: 'Put option on Nifty 50 at strike 24000.',
    color: '#f59e0b', icon: 'IO'
  },
  // \u2500\u2500 Currency Derivatives \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'CUR_EURUSD', symbol: 'EUR/USD-FUT', name: 'EUR/USD Currency Future',
    type: 'Currency Future', expiry: 'Jun 2025',
    price: 1.0842, prevClose: 1.0798,
    lotSize: 100000, margin: 2, risk: 2,
    description: 'Futures contract on EUR/USD exchange rate.',
    color: '#06b6d4', icon: 'CF'
  },
  {
    id: 'CUR_GBPUSD', symbol: 'GBP/USD-OPT', name: 'GBP/USD Currency Option',
    type: 'Currency Option', expiry: 'Jun 2025',
    price: 1.2640, prevClose: 1.2598, strike: 1.2600,
    lotSize: 100000, margin: 2, risk: 3,
    description: 'Options contract on GBP/USD exchange rate.',
    color: '#8b5cf6', icon: 'CO'
  },
  // \u2500\u2500 Warrants \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'WR_AAPL', symbol: 'AAPL-WRT', name: 'Apple Company Warrant',
    type: 'Warrant', expiry: 'Dec 2026',
    price: 22.50, prevClose: 21.80, strike: 180,
    lotSize: 1, margin: 100, risk: 3,
    description: 'Long-term option issued by Apple to buy its stock at $180.',
    color: '#f97316', icon: 'WR'
  },
  {
    id: 'WR_NVDA', symbol: 'NVDA-WRT', name: 'Nvidia Company Warrant',
    type: 'Warrant', expiry: 'Dec 2026',
    price: 48.90, prevClose: 46.20, strike: 800,
    lotSize: 1, margin: 100, risk: 4,
    description: 'Long-term option issued by Nvidia to buy its stock at $800.',
    color: '#10b981', icon: 'WR'
  },
  // \u2500\u2500 CFDs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'CFD_AAPL', symbol: 'AAPL-CFD', name: 'Apple CFD',
    type: 'CFD', expiry: 'Perpetual',
    price: 189.50, prevClose: 187.20,
    lotSize: 1, margin: 5, risk: 3,
    description: 'Exchange the difference between entry & exit price of AAPL stock.',
    color: '#ef4444', icon: 'CD'
  },
  {
    id: 'CFD_GOLD', symbol: 'GOLD-CFD', name: 'Gold CFD',
    type: 'CFD', expiry: 'Perpetual',
    price: 2342.80, prevClose: 2318.50,
    lotSize: 1, margin: 5, risk: 2,
    description: 'CFD on Gold spot price.',
    color: '#f59e0b', icon: 'CD'
  },
  {
    id: 'CFD_OIL', symbol: 'WTI-CFD', name: 'Crude Oil CFD',
    type: 'CFD', expiry: 'Perpetual',
    price: 82.45, prevClose: 81.20,
    lotSize: 100, margin: 5, risk: 3,
    description: 'CFD on WTI Crude Oil price.',
    color: '#64748b', icon: 'CD'
  },
];

const OTC_DERIVATIVES = [
  // \u2500\u2500 Forward Contracts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'FWD_MSFT', symbol: 'MSFT-FWD', name: 'Microsoft Forward Contract',
    type: 'Forward Contract', expiry: 'Dec 2025',
    price: 420.00, prevClose: 412.10,
    lotSize: 500, margin: 10, premium: 1.5, risk: 2,
    description: 'Customized private agreement to buy/sell MSFT at $420 in Dec 2025.',
    color: '#3b82f6', icon: 'FW',
    minNotional: 100000
  },
  {
    id: 'FWD_GOLD', symbol: 'GOLD-FWD', name: 'Gold Forward Contract',
    type: 'Forward Contract', expiry: 'Sep 2025',
    price: 2380.00, prevClose: 2318.50,
    lotSize: 100, margin: 8, premium: 1.2, risk: 2,
    description: 'OTC forward contract on Gold \u2014 private bilateral agreement.',
    color: '#f59e0b', icon: 'FW',
    minNotional: 250000
  },
  {
    id: 'FWD_EURUSD', symbol: 'EUR/USD-FWD', name: 'EUR/USD FX Forward',
    type: 'Forward Contract', expiry: 'Sep 2025',
    price: 1.0920, prevClose: 1.0798,
    lotSize: 1000000, margin: 2, premium: 0.8, risk: 1,
    description: 'OTC FX forward agreement to exchange EUR for USD at locked rate.',
    color: '#06b6d4', icon: 'FW',
    minNotional: 1000000
  },
  // \u2500\u2500 Interest Rate Swaps \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'IRS_USD_5Y', symbol: 'USD-IRS-5Y', name: 'USD Interest Rate Swap 5Y',
    type: 'Interest Rate Swap', expiry: '5 Years',
    price: 4.25, prevClose: 4.18,
    lotSize: 1, margin: 1, premium: 2.0, risk: 2,
    description: 'Swap fixed 4.25% for floating SOFR rate \u2014 USD notional.',
    color: '#8b5cf6', icon: 'IR',
    notional: 10000000, fixedRate: 4.25, floatingIndex: 'SOFR',
    minNotional: 5000000
  },
  {
    id: 'IRS_EUR_3Y', symbol: 'EUR-IRS-3Y', name: 'EUR Interest Rate Swap 3Y',
    type: 'Interest Rate Swap', expiry: '3 Years',
    price: 3.85, prevClose: 3.78,
    lotSize: 1, margin: 1, premium: 1.8, risk: 2,
    description: 'Swap fixed 3.85% for floating EURIBOR rate \u2014 EUR notional.',
    color: '#10b981', icon: 'IR',
    notional: 10000000, fixedRate: 3.85, floatingIndex: 'EURIBOR',
    minNotional: 5000000
  },
  {
    id: 'IRS_GBP_10Y', symbol: 'GBP-IRS-10Y', name: 'GBP Interest Rate Swap 10Y',
    type: 'Interest Rate Swap', expiry: '10 Years',
    price: 4.05, prevClose: 3.99,
    lotSize: 1, margin: 1, premium: 2.5, risk: 3,
    description: 'Long-dated GBP swap fixed vs SONIA \u2014 10-year tenor.',
    color: '#f97316', icon: 'IR',
    notional: 10000000, fixedRate: 4.05, floatingIndex: 'SONIA',
    minNotional: 5000000
  },
  // \u2500\u2500 Index Return Swaps \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  {
    id: 'IXS_SP500', symbol: 'SP500-IRS', name: 'S&P 500 Index Return Swap',
    type: 'Index Return Swap', expiry: '1 Year',
    price: 5242.75, prevClose: 5198.20,
    lotSize: 1, margin: 5, premium: 3.0, risk: 3,
    description: 'Swap cash flows based on the total return of the S&P 500 index.',
    color: '#3b82f6', icon: 'IX',
    notional: 10000000,
    minNotional: 1000000
  },
  {
    id: 'IXS_MSCI', symbol: 'MSCI-IRS', name: 'MSCI World Index Return Swap',
    type: 'Index Return Swap', expiry: '2 Years',
    price: 3524.80, prevClose: 3498.40,
    lotSize: 1, margin: 5, premium: 3.5, risk: 3,
    description: 'OTC swap on the total return of the MSCI World index.',
    color: '#06b6d4', icon: 'IX',
    notional: 10000000,
    minNotional: 1000000
  },
  {
    id: 'IXS_NIFTY', symbol: 'NIFTY-IRS', name: 'Nifty 50 Index Return Swap',
    type: 'Index Return Swap', expiry: '1 Year',
    price: 24320.50, prevClose: 24105.80,
    lotSize: 1, margin: 5, premium: 4.0, risk: 4,
    description: "OTC swap on total return of India's Nifty 50 index.",
    color: '#f97316', icon: 'IX',
    notional: 10000000,
    minNotional: 1000000
  },
];

// ============================================================
//  2. PLATFORM STATE
// ============================================================
let state = {
  balance: 500000,
  equity: 500000,
  usedMargin: 0,
  positions: [],
  tradeHistory: [],
  alerts: [],
  selectedAsset: null,
  chartType: 'line',
  timeframe: '1D',
  currentPage: 'dashboard',
  priceHistory: {},       // { assetId: [{ time, open, high, low, close, volume }] }
  liveIntervalId: null,
  chartIntervalId: null,
  orderType: 'market',
  tradeSide: 'buy',
  watchlist: ['SF_AAPL','IF_SP500','CUR_EURUSD','IRS_USD_5Y','IXS_SP500'],
  searchQuery: '',
};

// ============================================================
//  3. PRICE ENGINE
// ============================================================
function getVolatility(asset) {
  const vols = {
    'Stock Future': 0.0008,
    'Stock Option (Call)': 0.004,
    'Stock Option (Put)': 0.004,
    'Index Future': 0.0005,
    'Index Option (Call)': 0.003,
    'Index Option (Put)': 0.003,
    'Currency Future': 0.0003,
    'Currency Option': 0.003,
    'Warrant': 0.006,
    'CFD': 0.001,
    'Forward Contract': 0.0004,
    'Interest Rate Swap': 0.0020,
    'Index Return Swap': 0.0005,
  };
  return vols[asset.type] || 0.001;
}

function tickPrice(asset) {
  const vol = getVolatility(asset);
  const r = (Math.random() - 0.499) * 2;
  const drift = r * vol * asset.price;
  asset.price = Math.max(0.001, asset.price + drift);
  return asset.price;
}

function allAssets() {
  return [...STOCK_EXCHANGE_DERIVATIVES, ...OTC_DERIVATIVES];
}

function findAsset(id) {
  return allAssets().find(a => a.id === id);
}

// Seed price history with generated OHLCV candles
function seedPriceHistory(asset, bars = 100) {
  const history = [];
  let price = asset.prevClose;
  const vol = getVolatility(asset);
  const now = Date.now();
  const intervalMs = {
    '1D': 5 * 60 * 1000,        // 5-min candles
    '1W': 30 * 60 * 1000,       // 30-min
    '1M': 4 * 60 * 60 * 1000,   // 4-hour
    '3M': 24 * 60 * 60 * 1000,  // daily
  }[state.timeframe] || 5 * 60 * 1000;

  for (let i = bars; i >= 0; i--) {
    const time = now - i * intervalMs;
    const o = price;
    const change1 = (Math.random() - 0.499) * 2 * vol * price;
    const change2 = (Math.random() - 0.499) * 2 * vol * price;
    const change3 = (Math.random() - 0.499) * 2 * vol * price;
    const c = Math.max(0.001, price + change3);
    const h = Math.max(o, c) + Math.abs(change1) * 0.5;
    const l = Math.min(o, c) - Math.abs(change2) * 0.5;
    const volume = Math.floor(Math.random() * 5000 + 1000);
    history.push({ time, open: o, high: h, low: l, close: c, volume });
    price = c;
  }
  return history;
}

// Push a new tick to price history
function appendTick(assetId) {
  const asset = findAsset(assetId);
  if (!asset || !state.priceHistory[assetId]) return;
  const history = state.priceHistory[assetId];
  const last = history[history.length - 1];
  const newPrice = tickPrice(asset);
  const newCandle = {
    time: Date.now(),
    open: last.close,
    high: Math.max(last.close, newPrice) * (1 + Math.random() * 0.0005),
    low: Math.min(last.close, newPrice) * (1 - Math.random() * 0.0005),
    close: newPrice,
    volume: Math.floor(Math.random() * 3000 + 500),
  };
  history.push(newCandle);
  if (history.length > 200) history.shift();
}

// ============================================================
//  4. CHART ENGINE
// ============================================================
let mainChartInstance = null;
let volumeChartInstance = null;

function buildChartData(assetId) {
  const history = state.priceHistory[assetId] || [];
  const labels = history.map(c => {
    const d = new Date(c.time);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  });
  const closes = history.map(c => c.close);
  const volumes = history.map(c => c.volume);
  const opens = history.map(c => c.open);
  const highs = history.map(c => c.high);
  const lows = history.map(c => c.low);
  return { labels, closes, volumes, opens, highs, lows, history };
}

function getChartColor(assetId) {
  const asset = findAsset(assetId);
  if (!asset) return '#3b82f6';
  const history = state.priceHistory[assetId] || [];
  if (history.length < 2) return '#3b82f6';
  const first = history[0].close;
  const last = history[history.length - 1].close;
  return last >= first ? '#10b981' : '#ef4444';
}

function renderMainChart(assetId) {
  const canvas = document.getElementById('mainChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { labels, closes, opens, highs, lows } = buildChartData(assetId);
  const color = getChartColor(assetId);

  if (mainChartInstance) { mainChartInstance.destroy(); mainChartInstance = null; }

  const isDark = !document.body.classList.contains('light-mode');
  const gridColor = isDark ? 'rgba(42,50,69,0.6)' : 'rgba(200,210,220,0.6)';
  const labelColor = isDark ? '#5a6478' : '#94a3b8';

  if (state.chartType === 'line') {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color + '30');
    gradient.addColorStop(1, color + '00');

    mainChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: closes,
          borderColor: color,
          borderWidth: 2,
          fill: true,
          backgroundColor: gradient,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1e2436' : '#fff',
            borderColor: isDark ? '#2a3245' : '#e2e8f0',
            borderWidth: 1,
            titleColor: isDark ? '#e2e8f0' : '#1e293b',
            bodyColor: isDark ? '#8892a4' : '#475569',
            padding: 10,
            callbacks: {
              label: ctx => ` ${formatPrice(ctx.parsed.y, assetId)}`
            }
          },
        },
        scales: {
          x: {
            grid: { color: gridColor, drawTicks: false },
            ticks: { color: labelColor, maxTicksLimit: 8, font: { size: 10 } },
            border: { display: false }
          },
          y: {
            grid: { color: gridColor, drawTicks: false },
            ticks: { color: labelColor, font: { size: 10, family: 'JetBrains Mono, monospace' }, callback: v => formatPrice(v, assetId) },
            position: 'right',
            border: { display: false }
          }
        }
      }
    });
  } else if (state.chartType === 'candle' || state.chartType === 'ohlc') {
    // Build bar data for candlestick using floating-bar trick
    const barData = closes.map((c, i) => ({
      x: labels[i],
      o: opens[i],
      h: highs[i],
      l: lows[i],
      c
    }));

    const candleColors = barData.map(d => d.c >= d.o ? '#10b981' : '#ef4444');
    const candleBorders = barData.map(d => d.c >= d.o ? '#10b981' : '#ef4444');

    mainChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'OHLC',
          data: barData.map(d => [Math.min(d.o, d.c), Math.max(d.o, d.c)]),
          backgroundColor: candleColors,
          borderColor: candleBorders,
          borderWidth: 1,
          borderSkipped: false,
          barPercentage: 0.5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#1e2436' : '#fff',
            borderColor: isDark ? '#2a3245' : '#e2e8f0',
            borderWidth: 1,
            titleColor: isDark ? '#e2e8f0' : '#1e293b',
            bodyColor: isDark ? '#8892a4' : '#475569',
            padding: 10,
            callbacks: {
              label: (ctx) => {
                const d = barData[ctx.dataIndex];
                return [`O: ${formatPrice(d.o, assetId)}`, `H: ${formatPrice(d.h, assetId)}`, `L: ${formatPrice(d.l, assetId)}`, `C: ${formatPrice(d.c, assetId)}`];
              }
            }
          }
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: labelColor, maxTicksLimit: 8, font: { size: 10 } }, border: { display: false } },
          y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10, family: 'JetBrains Mono, monospace' }, callback: v => formatPrice(v, assetId) }, position: 'right', border: { display: false } }
        }
      }
    });
  } else if (state.chartType === 'area') {
    // Mountain/area chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color + '60');
    gradient.addColorStop(1, color + '05');
    mainChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: closes,
          borderColor: color,
          borderWidth: 2,
          fill: true,
          backgroundColor: gradient,
          tension: 0.2,
          pointRadius: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: labelColor, maxTicksLimit: 8, font: { size: 10 } }, border: { display: false } },
          y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10, family: 'JetBrains Mono, monospace' }, callback: v => formatPrice(v, assetId) }, position: 'right', border: { display: false } }
        }
      }
    });
  }
}

function renderVolumeChart(assetId) {
  const canvas = document.getElementById('volumeChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { labels, volumes, history } = buildChartData(assetId);

  if (volumeChartInstance) { volumeChartInstance.destroy(); volumeChartInstance = null; }

  const isDark = !document.body.classList.contains('light-mode');
  const gridColor = isDark ? 'rgba(42,50,69,0.4)' : 'rgba(200,210,220,0.4)';
  const labelColor = isDark ? '#5a6478' : '#94a3b8';

  const volColors = history.map(c => c.close >= c.open ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)');

  volumeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: volumes,
        backgroundColor: volColors,
        borderWidth: 0,
        barPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 9 }, maxTicksLimit: 3 }, position: 'right', border: { display: false } }
      }
    }
  });
}

function updateChartLive(assetId) {
  if (!mainChartInstance || !volumeChartInstance) return;
  const { closes, volumes, labels, history } = buildChartData(assetId);
  const color = getChartColor(assetId);

  if (state.chartType === 'line' || state.chartType === 'area') {
    mainChartInstance.data.labels = labels;
    mainChartInstance.data.datasets[0].data = closes;
    mainChartInstance.data.datasets[0].borderColor = color;
    mainChartInstance.update('none');
  } else {
    renderMainChart(assetId);
  }

  const volColors = history.map(c => c.close >= c.open ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)');
  volumeChartInstance.data.labels = labels;
  volumeChartInstance.data.datasets[0].data = volumes;
  volumeChartInstance.data.datasets[0].backgroundColor = volColors;
  volumeChartInstance.update('none');
}

// ============================================================
//  5. FORMATTING HELPERS
// ============================================================
function formatPrice(price, assetId) {
  const asset = assetId ? findAsset(assetId) : null;
  if (!asset) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (asset.type === 'Currency Future' || asset.type === 'Currency Option' || asset.type.includes('Forward') && price < 100) {
    return price.toFixed(4);
  }
  if (price >= 10000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 100) return price.toFixed(2);
  if (price >= 1) return price.toFixed(3);
  return price.toFixed(5);
}

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
}

function formatChange(current, prev) {
  const diff = current - prev;
  const pct = ((diff / prev) * 100);
  const sign = diff >= 0 ? '+' : '';
  return { diff, pct, sign, isUp: diff >= 0 };
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function riskLabel(r) {
  if (r <= 2) return 'Low';
  if (r <= 3) return 'Medium';
  return 'High';
}

function riskClass(r) {
  if (r <= 2) return 'badge-green';
  if (r <= 3) return 'badge-yellow';
  return 'badge-red';
}

// ============================================================
//  6. TICKER TAPE
// ============================================================
function renderTickerTape() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const items = allAssets().slice(0, 16);
  let html = '';
  for (let i = 0; i < 2; i++) { // duplicate for seamless loop
    items.forEach(a => {
      const { diff, pct, sign, isUp } = formatChange(a.price, a.prevClose);
      html += `
        <div class="ticker-item">
          <span class="symbol">${a.symbol}</span>
          <span class="price">${formatPrice(a.price, a.id)}</span>
          <span class="change ${isUp ? 'up' : 'down'}">${sign}${pct.toFixed(2)}%</span>
        </div>`;
    });
  }
  track.innerHTML = html;
}

function updateTickerTape() {
  const items = document.querySelectorAll('.ticker-item');
  const assets = allAssets().slice(0, 16);
  let idx = 0;
  items.forEach((item, i) => {
    const a = assets[i % assets.length];
    if (!a) return;
    const { pct, sign, isUp } = formatChange(a.price, a.prevClose);
    item.querySelector('.price').textContent = formatPrice(a.price, a.id);
    const ch = item.querySelector('.change');
    ch.textContent = `${sign}${pct.toFixed(2)}%`;
    ch.className = `change ${isUp ? 'up' : 'down'}`;
  });
}

// ============================================================
//  7. MARKET TABLE
// ============================================================
function renderMarketTable(containerId, assets) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const rows = assets.map(a => {
    const { diff, pct, sign, isUp } = formatChange(a.price, a.prevClose);
    const history = state.priceHistory[a.id] || [];
    const sparkData = history.slice(-20).map(c => c.close);
    const sparkColor = isUp ? '#10b981' : '#ef4444';
    const vol = (Math.random() * 10000 + 1000).toFixed(0);
    return `
      <tr data-asset-id="${a.id}">
        <td>
          <div class="asset-cell">
            <div class="asset-icon" style="background:${a.color}22;color:${a.color}">${a.icon}</div>
            <div>
              <div class="asset-cell-name">${a.symbol}</div>
              <div class="asset-cell-sub">${a.type}</div>
            </div>
          </div>
        </td>
        <td class="price-col" id="price-${a.id}">${formatPrice(a.price, a.id)}</td>
        <td class="change-col ${isUp ? 'up' : 'down'}" id="chg-${a.id}">${sign}${pct.toFixed(2)}%</td>
        <td class="mini-chart-cell">
          <canvas id="spark-${a.id}" width="80" height="30"></canvas>
        </td>
        <td class="volume-col">${Number(vol).toLocaleString()}</td>
        <td>Exp: ${a.expiry}</td>
        <td><span class="card-badge ${riskClass(a.risk)}">${riskLabel(a.risk)}</span></td>
        <td>
          <button class="action-btn-sm" onclick="selectAssetAndTrade('${a.id}')">Trade</button>
        </td>
      </tr>`;
  }).join('');

  el.innerHTML = `
    <div class="market-table-wrapper">
      <table class="market-table">
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Price</th>
            <th>Change</th>
            <th>Chart</th>
            <th>Volume</th>
            <th>Expiry</th>
            <th>Risk</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="${containerId}-tbody">
          ${rows}
        </tbody>
      </table>
    </div>`;

  // Draw mini sparklines
  setTimeout(() => {
    assets.forEach(a => {
      const canvas = document.getElementById(`spark-${a.id}`);
      if (!canvas) return;
      const sparkCtx = canvas.getContext('2d');
      const history = state.priceHistory[a.id] || [];
      const sparkData = history.slice(-20).map(c => c.close);
      const { isUp } = formatChange(a.price, a.prevClose);
      const sparkColor = isUp ? '#10b981' : '#ef4444';
      if (window.sparkCharts) window.sparkCharts[a.id]?.destroy();
      const sc = new Chart(sparkCtx, {
        type: 'line',
        data: {
          labels: sparkData.map((_, i) => i),
          datasets: [{ data: sparkData, borderColor: sparkColor, borderWidth: 1.5, fill: false, tension: 0.3, pointRadius: 0 }]
        },
        options: {
          responsive: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } },
          animation: false,
        }
      });
      if (!window.sparkCharts) window.sparkCharts = {};
      window.sparkCharts[a.id] = sc;
    });
  }, 50);
}

function updateMarketTablePrices(assets) {
  assets.forEach(a => {
    const priceEl = document.getElementById(`price-${a.id}`);
    const chgEl = document.getElementById(`chg-${a.id}`);
    if (priceEl) priceEl.textContent = formatPrice(a.price, a.id);
    if (chgEl) {
      const { pct, sign, isUp } = formatChange(a.price, a.prevClose);
      chgEl.textContent = `${sign}${pct.toFixed(2)}%`;
      chgEl.className = `change-col ${isUp ? 'up' : 'down'}`;
    }
  });
}

// ============================================================
//  8. ORDER BOOK
// ============================================================
function generateOrderBook(asset) {
  const price = asset.price;
  const spread = price * 0.0005;
  const asks = [], bids = [];
  let cumAsk = 0, cumBid = 0;
  for (let i = 0; i < 8; i++) {
    const askPrice = price + spread + i * price * 0.0002;
    const askQty = Math.floor(Math.random() * 500 + 50);
    cumAsk += askQty;
    asks.push({ price: askPrice, qty: askQty, cum: cumAsk });
  }
  for (let i = 0; i < 8; i++) {
    const bidPrice = price - spread - i * price * 0.0002;
    const bidQty = Math.floor(Math.random() * 500 + 50);
    cumBid += bidQty;
    bids.push({ price: bidPrice, qty: bidQty, cum: cumBid });
  }
  return { asks: asks.reverse(), bids, spread: (spread * 2).toFixed(asset.price > 100 ? 2 : 5) };
}

function renderOrderBook(assetId) {
  const el = document.getElementById('orderBookContent');
  if (!el) return;
  const asset = findAsset(assetId);
  if (!asset) return;
  const { asks, bids, spread } = generateOrderBook(asset);
  const maxCum = Math.max(asks[asks.length - 1]?.cum || 1, bids[bids.length - 1]?.cum || 1);

  const askRows = asks.map(a => `
    <div class="ob-row ask">
      <div>${formatPrice(a.price, assetId)}</div>
      <div>${a.qty.toLocaleString()}</div>
      <div>${a.cum.toLocaleString()}</div>
      <div class="ob-depth-bar" style="width:${(a.cum / maxCum * 100).toFixed(1)}%"></div>
    </div>`).join('');

  const bidRows = bids.map(b => `
    <div class="ob-row bid">
      <div>${formatPrice(b.price, assetId)}</div>
      <div>${b.qty.toLocaleString()}</div>
      <div>${b.cum.toLocaleString()}</div>
      <div class="ob-depth-bar" style="width:${(b.cum / maxCum * 100).toFixed(1)}%"></div>
    </div>`).join('');

  el.innerHTML = `
    <div class="ob-header"><span>Price</span><span>Size</span><span>Total</span></div>
    ${askRows}
    <div class="ob-spread">Spread: ${spread}</div>
    ${bidRows}`;
}

// ============================================================
//  9. PORTFOLIO & P&L
// ============================================================
function calcPortfolioStats() {
  let totalPnL = 0, totalValue = 0;
  state.positions.forEach(pos => {
    const asset = findAsset(pos.assetId);
    if (!asset) return;
    const currentPrice = asset.price;
    const pnl = pos.side === 'buy'
      ? (currentPrice - pos.avgPrice) * pos.qty
      : (pos.avgPrice - currentPrice) * pos.qty;
    pos.currentPrice = currentPrice;
    pos.pnl = pnl;
    pos.pnlPct = (pnl / (pos.avgPrice * pos.qty)) * 100;
    totalPnL += pnl;
    totalValue += currentPrice * pos.qty;
  });
  state.equity = state.balance + totalPnL;
  return { totalPnL, totalValue };
}

function renderPortfolio() {
  const el = document.getElementById('portfolioTableBody');
  if (!el) return;
  const { totalPnL } = calcPortfolioStats();

  if (state.positions.length === 0) {
    el.innerHTML = `<tr><td colspan="8" class="empty-state"><div class="empty-icon">\ud83d\udcc2</div>No open positions</td></tr>`;
  } else {
    el.innerHTML = state.positions.map(pos => {
      const pnlClass = pos.pnl >= 0 ? 'pnl-positive' : 'pnl-negative';
      const sign = pos.pnl >= 0 ? '+' : '';
      return `
        <tr>
          <td><span class="fw-600">${pos.symbol}</span></td>
          <td><span class="trade-side ${pos.side}">${pos.side.toUpperCase()}</span></td>
          <td class="text-mono">${pos.qty}</td>
          <td class="text-mono">${formatPrice(pos.avgPrice, pos.assetId)}</td>
          <td class="text-mono" id="pos-current-${pos.id}">${formatPrice(pos.currentPrice, pos.assetId)}</td>
          <td class="${pnlClass}" id="pos-pnl-${pos.id}">${sign}${formatCurrency(pos.pnl)}</td>
          <td class="${pnlClass}" id="pos-pnlpct-${pos.id}">${sign}${pos.pnlPct.toFixed(2)}%</td>
          <td>
            <button class="action-btn-sm" style="border-color:var(--red);color:var(--red)" onclick="closePosition('${pos.id}')">Close</button>
          </td>
        </tr>`;
    }).join('');
  }

  // Update stats
  const totalPnLEl = document.getElementById('totalPnL');
  const equityEl = document.getElementById('equityValue');
  const balanceEl = document.getElementById('balanceValue');
  if (totalPnLEl) {
    totalPnLEl.textContent = (totalPnL >= 0 ? '+' : '') + formatCurrency(totalPnL);
    totalPnLEl.className = `stat-value ${totalPnL >= 0 ? 'green' : 'red'}`;
  }
  if (equityEl) equityEl.textContent = formatCurrency(state.equity);
  if (balanceEl) balanceEl.textContent = formatCurrency(state.balance);

  const headerBal = document.getElementById('headerBalance');
  if (headerBal) headerBal.textContent = formatCurrency(state.equity);
}

function updatePositionPrices() {
  calcPortfolioStats();
  state.positions.forEach(pos => {
    const curEl = document.getElementById(`pos-current-${pos.id}`);
    const pnlEl = document.getElementById(`pos-pnl-${pos.id}`);
    const pctEl = document.getElementById(`pos-pnlpct-${pos.id}`);
    if (curEl) curEl.textContent = formatPrice(pos.currentPrice, pos.assetId);
    if (pnlEl) {
      pnlEl.textContent = (pos.pnl >= 0 ? '+' : '') + formatCurrency(pos.pnl);
      pnlEl.className = pos.pnl >= 0 ? 'pnl-positive' : 'pnl-negative';
    }
    if (pctEl) {
      pctEl.textContent = (pos.pnlPct >= 0 ? '+' : '') + pos.pnlPct.toFixed(2) + '%';
      pctEl.className = pos.pnlPct >= 0 ? 'pnl-positive' : 'pnl-negative';
    }
  });
  const headerBal = document.getElementById('headerBalance');
  if (headerBal) headerBal.textContent = formatCurrency(state.equity);
}

function closePosition(posId) {
  const idx = state.positions.findIndex(p => p.id === posId);
  if (idx === -1) return;
  const pos = state.positions[idx];
  const asset = findAsset(pos.assetId);
  const pnl = pos.pnl || 0;
  state.balance += (pos.avgPrice * pos.qty) + pnl;
  state.usedMargin -= pos.margin || 0;
  state.positions.splice(idx, 1);
  state.tradeHistory.unshift({
    id: Date.now(),
    symbol: pos.symbol,
    assetId: pos.assetId,
    type: pos.side === 'buy' ? 'sell' : 'buy',
    qty: pos.qty,
    price: asset ? asset.price : pos.currentPrice,
    total: asset ? asset.price * pos.qty : pos.currentPrice * pos.qty,
    pnl,
    time: Date.now(),
    status: 'Filled',
    note: 'Position Closed'
  });
  showNotification('success', 'Position Closed', `${pos.symbol} \u2014 P&L: ${pnl >= 0 ? '+' : ''}${formatCurrency(pnl)}`);
  renderPortfolio();
  renderTradeHistory();
}

// ============================================================
//  10. TRADE EXECUTION
// ============================================================
function executeTrade(assetId, side, qty, price, orderType) {
  const asset = findAsset(assetId);
  if (!asset) return;

  const total = price * qty;
  const marginReq = (total * asset.margin) / 100;

  if (side === 'buy' && marginReq > state.balance) {
    showNotification('error', 'Insufficient Balance', `Required margin: ${formatCurrency(marginReq)}`);
    return false;
  }

  // Check if existing position
  const existing = state.positions.find(p => p.assetId === assetId && p.side === side);
  if (existing) {
    const totalQty = existing.qty + qty;
    existing.avgPrice = (existing.avgPrice * existing.qty + price * qty) / totalQty;
    existing.qty = totalQty;
  } else {
    const posId = `pos_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;
    state.positions.push({
      id: posId,
      assetId,
      symbol: asset.symbol,
      name: asset.name,
      side,
      qty,
      avgPrice: price,
      currentPrice: price,
      pnl: 0,
      pnlPct: 0,
      margin: marginReq,
      time: Date.now(),
    });
  }

  if (side === 'buy') state.balance -= marginReq;
  state.usedMargin += marginReq;

  state.tradeHistory.unshift({
    id: Date.now(),
    symbol: asset.symbol,
    assetId,
    type: side,
    qty,
    price,
    total,
    pnl: null,
    time: Date.now(),
    status: 'Filled',
    note: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} Order`
  });

  showNotification('success', `${side.toUpperCase()} Order Filled`, `${asset.symbol} \u2014 ${qty} \u00d7 ${formatPrice(price, assetId)} = ${formatCurrency(total)}`);
  renderPortfolio();
  renderTradeHistory();
  return true;
}

// ============================================================
//  11. TRADE HISTORY
// ============================================================
function renderTradeHistory() {
  const el = document.getElementById('tradeHistoryBody');
  if (!el) return;
  if (state.tradeHistory.length === 0) {
    el.innerHTML = `<tr><td colspan="8" class="empty-state"><div class="empty-icon">\ud83d\udccb</div>No trades yet</td></tr>`;
    return;
  }
  el.innerHTML = state.tradeHistory.slice(0, 50).map(t => `
    <tr>
      <td class="text-mono fs-11">${formatTime(t.time)}</td>
      <td class="fw-600">${t.symbol}</td>
      <td><span class="trade-side ${t.type}">${t.type.toUpperCase()}</span></td>
      <td class="text-mono">${t.qty}</td>
      <td class="text-mono">${formatPrice(t.price, t.assetId)}</td>
      <td class="text-mono">${formatCurrency(t.total)}</td>
      <td class="${t.pnl !== null ? (t.pnl >= 0 ? 'pnl-positive' : 'pnl-negative') : 'text-muted'}">
        ${t.pnl !== null ? (t.pnl >= 0 ? '+' : '') + formatCurrency(t.pnl) : '\u2014'}
      </td>
      <td><span class="card-badge badge-green">${t.status}</span></td>
    </tr>`).join('');
}

// ============================================================
//  12. NOTIFICATIONS
// ============================================================
function showNotification(type, title, message) {
  const container = document.getElementById('notificationContainer');
  if (!container) return;

  const icons = { success: '\u2705', error: '\u274c', info: '\u2139\ufe0f', warning: '\u26a0\ufe0f' };
  const id = 'notif_' + Date.now();
  const el = document.createElement('div');
  el.className = `notification ${type}`;
  el.id = id;
  el.innerHTML = `
    <div class="notification-icon">${icons[type] || '\u2139\ufe0f'}</div>
    <div class="notification-body">
      <div class="notification-title">${title}</div>
      <div class="notification-msg">${message}</div>
    </div>`;
  container.appendChild(el);

  setTimeout(() => {
    el.classList.add('removing');
    setTimeout(() => el.remove(), 300);
  }, 4000);
}

// ============================================================
//  13. LIVE CLOCK
// ============================================================
function startClock() {
  const el = document.getElementById('headerTime');
  if (!el) return;
  const update = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST';
  };
  update();
  setInterval(update, 1000);
}

// ============================================================
//  14. SIDEBAR WATCHLIST
// ============================================================
function renderSidebarWatchlist() {
  const el = document.getElementById('sidebarWatchlist');
  if (!el) return;
  const items = state.watchlist.map(id => {
    const a = findAsset(id);
    if (!a) return '';
    const { pct, sign, isUp } = formatChange(a.price, a.prevClose);
    return `
      <div class="watchlist-item" onclick="selectAssetAndTrade('${a.id}')">
        <div>
          <div class="wl-symbol">${a.symbol}</div>
          <div class="wl-name">${a.type}</div>
        </div>
        <div class="wl-right">
          <div class="wl-price">${formatPrice(a.price, a.id)}</div>
          <div class="wl-change ${isUp ? 'up' : 'down'}">${sign}${pct.toFixed(2)}%</div>
        </div>
      </div>`;
  }).join('');
  el.innerHTML = items;
}

function updateSidebarWatchlist() {
  state.watchlist.forEach(id => {
    const a = findAsset(id);
    if (!a) return;
    const el = document.querySelector(`[data-wl="${id}"]`);
    if (!el) return;
    const { pct, sign, isUp } = formatChange(a.price, a.prevClose);
    const priceEl = el.querySelector('.wl-price');
    const chgEl = el.querySelector('.wl-change');
    if (priceEl) priceEl.textContent = formatPrice(a.price, a.id);
    if (chgEl) { chgEl.textContent = `${sign}${pct.toFixed(2)}%`; chgEl.className = `wl-change ${isUp ? 'up' : 'down'}`; }
  });
}

// ============================================================
//  15. TRADING FORM
// ============================================================
function initTradingForm(assetId) {
  const asset = findAsset(assetId);
  if (!asset) return;
  state.selectedAsset = assetId;

  // Update asset display
  const nameEl = document.getElementById('tradeAssetName');
  const priceEl = document.getElementById('tradeAssetPrice');
  const chgEl = document.getElementById('tradeAssetChange');
  if (nameEl) nameEl.textContent = asset.symbol;
  if (priceEl) priceEl.textContent = formatPrice(asset.price, assetId);
  if (chgEl) {
    const { pct, sign, isUp } = formatChange(asset.price, asset.prevClose);
    chgEl.textContent = `${sign}${pct.toFixed(2)}%`;
    chgEl.className = `asset-change-display ${isUp ? 'up' : 'down'}`;
  }

  // Update price input with current market price
  const priceInput = document.getElementById('tradePrice');
  if (priceInput) priceInput.value = formatPrice(asset.price, assetId);

  // Update order summary
  updateOrderSummary();

  // Render order book
  renderOrderBook(assetId);
}

function updateOrderSummary() {
  const assetId = state.selectedAsset;
  if (!assetId) return;
  const asset = findAsset(assetId);
  if (!asset) return;

  const qty = parseFloat(document.getElementById('tradeQty')?.value || 1);
  const price = parseFloat(document.getElementById('tradePrice')?.value || asset.price);
  const total = qty * price;
  const margin = (total * asset.margin) / 100;
  const fee = total * 0.0005;

  const totalEl = document.getElementById('orderTotal');
  const marginEl = document.getElementById('orderMargin');
  const feeEl = document.getElementById('orderFee');
  const avblEl = document.getElementById('availableBalance');

  if (totalEl) totalEl.textContent = formatCurrency(total);
  if (marginEl) marginEl.textContent = formatCurrency(margin);
  if (feeEl) feeEl.textContent = formatCurrency(fee);
  if (avblEl) avblEl.textContent = formatCurrency(state.balance);
}

function setTradeSide(side) {
  state.tradeSide = side;
  const buyBtn = document.getElementById('buyTabBtn');
  const sellBtn = document.getElementById('sellTabBtn');
  const execBtn = document.getElementById('executeBtn');
  if (buyBtn) buyBtn.className = `trade-tab${side === 'buy' ? ' active-buy' : ''}`;
  if (sellBtn) sellBtn.className = `trade-tab${side === 'sell' ? ' active-sell' : ''}`;
  if (execBtn) {
    execBtn.className = `execute-btn ${side}`;
    execBtn.textContent = `${side.toUpperCase()} ${state.selectedAsset ? findAsset(state.selectedAsset)?.symbol : ''}`;
  }
}

function setOrderType(type) {
  state.orderType = type;
  document.querySelectorAll('.order-type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });
  const priceInput = document.getElementById('tradePrice');
  if (priceInput) {
    priceInput.disabled = type === 'market';
    if (type === 'market' && state.selectedAsset) {
      const asset = findAsset(state.selectedAsset);
      if (asset) priceInput.value = formatPrice(asset.price, state.selectedAsset);
    }
  }
}

// ============================================================
//  16. SELECT ASSET & NAVIGATE TO TRADE
// ============================================================
window.selectAssetAndTrade = function(assetId) {
  const asset = findAsset(assetId);
  if (!asset) return;

  // Seed price history if needed
  if (!state.priceHistory[assetId]) {
    state.priceHistory[assetId] = seedPriceHistory(asset);
  }

  state.selectedAsset = assetId;
  initTradingForm(assetId);

  // Render charts
  renderMainChart(assetId);
  renderVolumeChart(assetId);

  // Update asset header
  const assetNameEl = document.getElementById('chartAssetName');
  const assetPriceEl = document.getElementById('chartAssetPrice');
  const assetChangeEl = document.getElementById('chartAssetChange');
  if (assetNameEl) assetNameEl.textContent = asset.symbol;
  if (assetPriceEl) assetPriceEl.textContent = formatPrice(asset.price, assetId);
  if (assetChangeEl) {
    const { pct, sign, isUp } = formatChange(asset.price, asset.prevClose);
    assetChangeEl.textContent = `${sign}${pct.toFixed(2)}%`;
    assetChangeEl.className = `asset-change-display ${isUp ? 'up' : 'down'}`;
  }

  setTradeSide(state.tradeSide);
};

window.closePosition = closePosition;

// ============================================================
//  17. LIVE PRICE UPDATE LOOP
// ============================================================
function startLivePriceEngine() {
  if (state.liveIntervalId) clearInterval(state.liveIntervalId);

  state.liveIntervalId = setInterval(() => {
    // Tick all assets
    allAssets().forEach(a => tickPrice(a));

    // Append tick to selected asset history
    if (state.selectedAsset) {
      appendTick(state.selectedAsset);
      updateChartLive(state.selectedAsset);

      // Update chart asset header
      const asset = findAsset(state.selectedAsset);
      if (asset) {
        const assetPriceEl = document.getElementById('chartAssetPrice');
        const assetChangeEl = document.getElementById('chartAssetChange');
        if (assetPriceEl) assetPriceEl.textContent = formatPrice(asset.price, state.selectedAsset);
        if (assetChangeEl) {
          const { pct, sign, isUp } = formatChange(asset.price, asset.prevClose);
          assetChangeEl.textContent = `${sign}${pct.toFixed(2)}%`;
          assetChangeEl.className = `asset-change-display ${isUp ? 'up' : 'down'}`;
        }

        // Update trade form price if market order
        if (state.orderType === 'market') {
          const priceInput = document.getElementById('tradePrice');
          if (priceInput) priceInput.value = formatPrice(asset.price, state.selectedAsset);
        }
      }
    }

    // Update all market price data
    updateMarketTablePrices(STOCK_EXCHANGE_DERIVATIVES);
    updateMarketTablePrices(OTC_DERIVATIVES);
    updateTickerTape();
    renderSidebarWatchlist();
    updatePositionPrices();
    updateOrderSummary();
    updateOrderBook();
    updateHeaderStats();

  }, 1500); // update every 1.5s
}

function updateOrderBook() {
  if (state.selectedAsset) renderOrderBook(state.selectedAsset);
}

function updateHeaderStats() {
  const freeMarginEl = document.getElementById('freeMarginValue');
  const usedMarginEl = document.getElementById('usedMarginValue');
  if (freeMarginEl) freeMarginEl.textContent = formatCurrency(state.balance - state.usedMargin);
  if (usedMarginEl) usedMarginEl.textContent = formatCurrency(state.usedMargin);
}

// ============================================================
//  18. TABS
// ============================================================
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('[data-tab-group]')?.dataset.tabGroup;
      if (!tabGroup) return;
      document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-btn`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`[data-tab-panel="${tabGroup}"]`).forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ============================================================
//  19. THEME TOGGLE
// ============================================================
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    btn.textContent = '\u2600\ufe0f';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    btn.textContent = isLight ? '\u2600\ufe0f' : '\ud83c\udf19';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    // Re-render charts
    if (state.selectedAsset) {
      renderMainChart(state.selectedAsset);
      renderVolumeChart(state.selectedAsset);
    }
  });
}

// ============================================================
//  20. INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Seed price history for all assets
  allAssets().forEach(a => {
    state.priceHistory[a.id] = seedPriceHistory(a);
  });

  // Detect page
  const page = document.body.dataset.page;

  // Common inits
  renderTickerTape();
  startClock();
  initThemeToggle();
  initTabs();
  renderPortfolio();
  renderTradeHistory();
  renderSidebarWatchlist();
  updateHeaderStats();

  // Page-specific init
  if (page === 'dashboard') {
    initDashboardPage();
  } else if (page === 'stock') {
    initStockPage();
  } else if (page === 'otc') {
    initOTCPage();
  }

  // Start engine
  startLivePriceEngine();
});

// ============================================================
//  21. DASHBOARD PAGE
// ============================================================
function initDashboardPage() {
  // Render combined market table (top from each)
  const combined = [...STOCK_EXCHANGE_DERIVATIVES.slice(0, 5), ...OTC_DERIVATIVES.slice(0, 3)];
  renderMarketTable('dashboardMarketTable', combined);

  // Select default asset for chart
  const defaultAsset = STOCK_EXCHANGE_DERIVATIVES[0];
  selectAssetAndTrade(defaultAsset.id);

  // Dashboard stats
  updateDashboardStats();
}

function updateDashboardStats() {
  const gainers = allAssets().filter(a => a.price > a.prevClose).length;
  const losers = allAssets().filter(a => a.price <= a.prevClose).length;
  const elG = document.getElementById('gainersCount');
  const elL = document.getElementById('losersCount');
  if (elG) elG.textContent = gainers;
  if (elL) elL.textContent = losers;
}

// ============================================================
//  22. STOCK EXCHANGE PAGE
// ============================================================
function initStockPage() {
  renderMarketTable('stockMarketTable', STOCK_EXCHANGE_DERIVATIVES);
  const defaultAsset = STOCK_EXCHANGE_DERIVATIVES[0];
  selectAssetAndTrade(defaultAsset.id);
  initStockTradeForm();
  updateAssetDropdown('assetSelect', STOCK_EXCHANGE_DERIVATIVES);
}

function updateAssetDropdown(selectId, assets) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = assets.map(a => `<option value="${a.id}">${a.symbol} \u2014 ${a.name}</option>`).join('');
  sel.addEventListener('change', () => selectAssetAndTrade(sel.value));
}

function initStockTradeForm() {
  const form = document.getElementById('tradeForm');
  if (!form) return;

  document.getElementById('buyTabBtn')?.addEventListener('click', () => setTradeSide('buy'));
  document.getElementById('sellTabBtn')?.addEventListener('click', () => setTradeSide('sell'));

  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => setOrderType(btn.dataset.type));
  });

  document.querySelectorAll('.qty-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qtyInput = document.getElementById('tradeQty');
      if (qtyInput) { qtyInput.value = btn.dataset.qty; updateOrderSummary(); }
    });
  });

  document.getElementById('tradeQty')?.addEventListener('input', updateOrderSummary);
  document.getElementById('tradePrice')?.addEventListener('input', updateOrderSummary);

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!state.selectedAsset) { showNotification('warning', 'No Asset Selected', 'Please select a derivative to trade.'); return; }
    const asset = findAsset(state.selectedAsset);
    const qty = parseFloat(document.getElementById('tradeQty').value);
    const price = state.orderType === 'market' ? asset.price : parseFloat(document.getElementById('tradePrice').value);
    if (!qty || qty <= 0) { showNotification('error', 'Invalid Quantity', 'Please enter a valid quantity.'); return; }
    if (!price || price <= 0) { showNotification('error', 'Invalid Price', 'Please enter a valid price.'); return; }
    executeTrade(state.selectedAsset, state.tradeSide, qty, price, state.orderType);
  });

  setTradeSide('buy');
  setOrderType('market');
}

// ============================================================
//  23. OTC PAGE
// ============================================================
function initOTCPage() {
  renderMarketTable('otcMarketTable', OTC_DERIVATIVES);
  const defaultAsset = OTC_DERIVATIVES[0];
  selectAssetAndTrade(defaultAsset.id);
  initOTCTradeForm();
  updateAssetDropdown('otcAssetSelect', OTC_DERIVATIVES);
}

function initOTCTradeForm() {
  const form = document.getElementById('otcTradeForm');
  if (!form) return;

  document.getElementById('buyTabBtn')?.addEventListener('click', () => setTradeSide('buy'));
  document.getElementById('sellTabBtn')?.addEventListener('click', () => setTradeSide('sell'));

  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.addEventListener('click', () => setOrderType(btn.dataset.type));
  });

  document.getElementById('tradeQty')?.addEventListener('input', updateOrderSummary);
  document.getElementById('tradePrice')?.addEventListener('input', updateOrderSummary);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const assetId = document.getElementById('otcAssetSelect')?.value || state.selectedAsset;
    if (!assetId) { showNotification('warning', 'No Derivative Selected', 'Please select an OTC derivative.'); return; }
    const asset = findAsset(assetId);
    const qty = parseFloat(document.getElementById('tradeQty').value);
    const price = state.orderType === 'market' ? asset.price * (1 + (asset.premium || 2) / 100) : parseFloat(document.getElementById('tradePrice').value);
    if (!qty || qty <= 0) { showNotification('error', 'Invalid Quantity', 'Please enter a valid quantity.'); return; }
    selectAssetAndTrade(assetId);
    executeTrade(assetId, state.tradeSide, qty, price, state.orderType);
  });

  setTradeSide('buy');
  setOrderType('market');
}

// ============================================================
//  24. CHART CONTROLS
// ============================================================
window.setChartType = function(type) {
  state.chartType = type;
  document.querySelectorAll('.ct-btn').forEach(b => b.classList.toggle('active', b.dataset.type === type));
  if (state.selectedAsset) {
    renderMainChart(state.selectedAsset);
  }
};

window.setTimeframe = function(tf) {
  state.timeframe = tf;
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.toggle('active', b.dataset.tf === tf));
  if (state.selectedAsset) {
    const asset = findAsset(state.selectedAsset);
    state.priceHistory[state.selectedAsset] = seedPriceHistory(asset);
    renderMainChart(state.selectedAsset);
    renderVolumeChart(state.selectedAsset);
  }
};
