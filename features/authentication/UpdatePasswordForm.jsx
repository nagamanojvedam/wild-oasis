import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const {
    reset,
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = ({ password }) => {
    updateUser(
      { password },
      {
        onSuccess: reset,
      }
    );
  };

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should have at least 8 characters",
            },
          })}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow
        label="Confirm New password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords does not match",
          })}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={reset}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isUpdating}>
          Update Password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
