import SecondaryButton from '../../../Buttons/SecondaryButton'
import TertiaryButton from '../../../Buttons/TertiaryButton'

type ProfileFooterProps = {
  setIsProfileOpen: (value: boolean) => void
}

export default function ProfileFooter({
  setIsProfileOpen,
}: ProfileFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <TertiaryButton
        size="default"
        form="profileForm"
        type="button"
        onClick={() => setIsProfileOpen(false)}
      >
        Cancel
      </TertiaryButton>
      <SecondaryButton size="default" form="profileForm" type="submit">
        Save profile
      </SecondaryButton>
    </div>
  )
}
