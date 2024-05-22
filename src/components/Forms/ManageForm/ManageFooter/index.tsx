import SecondaryButton from '../../../Buttons/SecondaryButton'
import TertiaryButton from '../../../Buttons/TertiaryButton'

type ManageFooterProps = {
  setIsModalOpen: (value: boolean) => void
}

export default function ManageFooter({ setIsModalOpen }: ManageFooterProps) {
  return (
    <div className="flex justify-end gap-2">
      <TertiaryButton
        size="default"
        form="manageForm"
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        Cancel
      </TertiaryButton>
      <SecondaryButton size="default" form="manageForm" type="submit">
        Update venue
      </SecondaryButton>
    </div>
  )
}
