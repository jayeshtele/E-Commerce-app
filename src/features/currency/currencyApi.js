const USD_TO_INR_RATE_URL = 'https://api.frankfurter.dev/v2/rate/USD/INR'

export async function fetchUsdToInrRateApi() {
  const response = await fetch(USD_TO_INR_RATE_URL)

  if (!response.ok) {
    throw new Error(`Exchange-rate API failed with status ${response.status}`)
  }

  const data = await response.json()

  return {
    date: data.date,
    rate: data.rate,
  }
}
