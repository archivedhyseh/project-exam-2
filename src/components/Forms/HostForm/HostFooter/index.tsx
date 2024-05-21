import SecondaryButton from '../../../Buttons/SecondaryButton'
import TertiaryButton from '../../../Buttons/TertiaryButton'

type HostFooterProps = {
  setIsHostOpen: (value: boolean) => void
}

export default function HostFooter({ setIsHostOpen }: HostFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <TertiaryButton
        size="default"
        form="filtersForm"
        type="button"
        onClick={() => setIsHostOpen(false)}
      >
        Cancel
      </TertiaryButton>
      <SecondaryButton
        size="default"
        form="hostForm"
        type="submit"
        onClick={() => setIsHostOpen(false)}
      >
        Host venue
      </SecondaryButton>
    </div>
  )
}
