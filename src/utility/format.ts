export function formatName(name: string) {
  if (name) {
    if (name.trim().length > 1) {
    }
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  return 'Venue without a name'
}

export function formatCity(city: string | null) {
  if (city) {
    if (city.trim().length > 1) {
      if (city.toLowerCase() === 'string') {
        return 'Unknown'
      }
    }
    return city.charAt(0).toUpperCase() + city.slice(1)
  }
  return 'Unknown'
}

export function formatCountry(country: string | null) {
  if (country) {
    if (country.trim().length > 1) {
      if (country.toLowerCase() === 'norge' || 'noreg') {
        return 'Norway'
      }
      if (country.toLowerCase() === 'united arab emirates' || 'uae') {
        return 'UAE'
      }
      if (country.toLowerCase() === 'united kingdom' || 'uk') {
        return 'UK'
      }
      if (country.toLowerCase() === 'united states' || 'usa') {
        return 'USA'
      }
      if (country.toLowerCase() === 'string') {
        return 'Unknown'
      }
    }
    return country.charAt(0).toUpperCase() + country.slice(1)
  }
  return 'Unknown'
}
