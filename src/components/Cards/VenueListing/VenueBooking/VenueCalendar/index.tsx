import {
  DateRange,
  DayPicker,
  Matcher,
  SelectRangeEventHandler,
} from 'react-day-picker'

type VenueCalendarProps = {
  selected?: DateRange
  onSelect?: SelectRangeEventHandler
  fromMonth?: Date
  toDate?: Date
  disabled?: Matcher | Matcher[]
}

export default function VenueCalendar({
  selected,
  onSelect,
  fromMonth,
  toDate,
  disabled,
}: VenueCalendarProps) {
  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={onSelect}
      fromMonth={fromMonth}
      toDate={toDate}
      disabled={disabled}
      numberOfMonths={2}
      ISOWeek
      classNames={{
        root: 'daypicker',
        months: 'daypicker-months',
        /* multiple_months: 'daypicker-multiple-months', */
        month: 'daypicker-month',
        caption: 'daypicker-caption',
        caption_label: 'daypicker-caption-label',
        /* nav: 'daypicker-nav', */
        nav_button: 'daypicker-nav-button',
        nav_button_previous: 'daypicker-nav-button-prev',
        nav_button_next: 'daypicker-nav-button-next',
        table: 'daypicker-table',
        tbody: 'daypicker-table-body',
        /* tfoot: 'daypicker-table-foot', */
        /* head: 'daypicker-head', */
        head_row: 'daypicker-head-row',
        head_cell: 'daypicker-head-cell',
        row: 'daypicker-row',
        cell: 'daypicker-cell',
        day: 'daypicker-day',
        day_disabled: 'daypicker-day-disabled',
        /* day_hidden: 'daypicker-day-hidden', */
        /* day_outside: 'daypicker-day-outside', */
        /* day_today: 'daypicker-day-today', */
        day_range_start: 'daypicker-day-range-start',
        day_range_end: 'daypicker-day-range-end',
        day_selected: 'daypicker-day-selected',
      }}
      components={{
        IconLeft: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        ),
        IconRight: () => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        ),
      }}
    />
  )
}
