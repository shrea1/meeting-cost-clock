import { useWeather } from '../hooks/useWeather'
import WeatherIcon from './WeatherIcon'

export default function WeatherBar() {
  const { weather, loading, error } = useWeather()

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 text-xs text-text-muted">
        <div className="w-3 h-3 rounded-full border border-text-muted border-t-transparent animate-spin" />
        Fetching weather...
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-2 text-xs text-text-muted">{error}</div>
    )
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-bg-secondary border border-line transition-all duration-300 hover:shadow-lg hover:border-brand/40 hover:scale-[1.01]">
      <div className="p-2 rounded-lg bg-bg-page/50 flex items-center justify-center border border-line/50">
        <WeatherIcon name={weather.icon} size={22} color="var(--primary)" />
      </div>

      <div>
        <p className="text-sm font-medium text-text-base flex items-center gap-2">
          <span className="font-semibold text-lg">{weather.temp}°C</span>
          <span className="text-text-muted text-xs font-normal border-l border-line pl-2">
            {weather.condition}
          </span>
        </p>
        <p className="text-xs text-text-muted">{weather.city}</p>
      </div>

      <p className="text-xs text-text-muted ml-auto font-medium">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
      </p>
    </div>
  )
}