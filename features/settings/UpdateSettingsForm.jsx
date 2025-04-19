import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings = {}, isPending: isSettingsLoading } = useSettings();
  const { updateSetting } = useUpdateSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  console.log(settings);

  const handleUpdateSetting = (evnt, field) => {
    const { value } = evnt.target;

    if (!value || settings[field] === +value) return;

    updateSetting({ [field]: value });
  };

  if (isSettingsLoading) return <Spinner />;

  return (
    <Form type="regular">
      <FormRow label="Minimum nights per booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(evnt) => handleUpdateSetting(evnt, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights per booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(evnt) => handleUpdateSetting(evnt, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests per booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(evnt) => handleUpdateSetting(evnt, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(evnt) => handleUpdateSetting(evnt, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
