type FinzyData = {
  MF_ID: number;
  alpha: string;
  aum_cr: string;
  avg_market_cap_cr: string;
  avg_maturity_yrs: string;
  benchmark_index: string;
  beta: string;
  category: string;
  classification: string;
  documentId: string;
  exit_load_remarks: string;
  expense_ratio_pct: string;
  fund_manager: string;
  fund_name: string;
  fund_type: string;
  highest_sector: string;
  inception_date: string;
  large_cap_pct: string;
  mid_cap_pct: string;
  mod_duration_yrs: string;
  nav: string;
  nav_52w_high: string;
  nav_52w_low: string;
  norm_name: string;
  num_stocks: string;
  return_10yr_pct: string;
  return_1mo_pct: string;
  return_1yr_pct: string;
  return_2yr_pct: string;
  return_3mo_pct: string;
  return_3yr_pct: string;
  return_5yr_pct: string;
  return_6mo_pct: string;
  rupeevest_rating: string;
  scheme_id: number;
  sharpe: string;
  small_cap_pct: string;
  sortino: string;
  std_deviation: string;
  turnover_ratio_pct: string;
  yield_to_maturity_pct: string;
};

type Fund = {
  id: number;
  avg_cost: string;
  balance: string;
  scheme_id: number;
  folio: string;
  isin: string;
  name: string;
  nav: string;
  pnl: string;
  return: string;
  total_cost: string;
  ucc: string;
  value: string;
};

type Holdings = {
  balance: number;
  folios: number;
  mutual_funds: Array<Fund>;
};

type FinzyMfData = {
    "MF_ID": number,
    "scheme_id": number,
    "alpha": string,
    "aum_cr": string,
    "avg_market_cap_cr": string,
    "avg_maturity_yrs": string,
    "benchmark_index": string,
    "beta": string,
    "category": string,
    "classification": string,
    "documentId": string,
    "exit_load_remarks": string,
    "expense_ratio_pct": string,
    "fund_manager": string,
    "fund_name": string,
    "fund_type": string,
    "highest_sector": string,
    "inception_date": string,
    "large_cap_pct": string,
    "mid_cap_pct": string,
    "mod_duration_yrs": string,
    "nav": string,
    "nav_52w_high": string,
    "nav_52w_low": string,
    "norm_name": string,
    "num_stocks": string,
    "return_10yr_pct": string,
    "return_1mo_pct": string,
    "return_1yr_pct": string,
    "return_2yr_pct": string,
    "return_3mo_pct": string,
    "return_3yr_pct": string,
    "return_5yr_pct": string,
    "return_6mo_pct": string,
    "rupeevest_rating": string,
    "sharpe": string,
    "small_cap_pct": string,
    "sortino": string,
    "std_deviation": string,
    "turnover_ratio_pct": string,
    "yield_to_maturity_pct": string
}

export type { FinzyData, Fund, Holdings, FinzyMfData };