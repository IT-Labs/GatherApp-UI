// hooks/methods
import { useCustomSelect } from "hooks/useCustomSelect";
import { useUpdateRoleMutation } from "services/api/gatherapp";
import { useAppSelector } from "store/store";

// components
import CustomSelect from "components/Reusable/Select/CustomSelect";
import Button from "components/Reusable/Button/Button";

// types and constants
import UserRoleNames from "ts/enums/UserRoleNames";
import { roleData } from "constants/selectOptions";
import { UserDetails } from "ts/types/User";
import { ButtonType } from "ts/enums/ButtonType";

// styles
import {
  SRoleBody,
  SConfirmRoleChange,
} from "components/ChangeRoleSelect/styles";

type Props = {
  user: UserDetails;
  currentUserRole: string;
};

const ChangeRoleSelect = ({ user, currentUserRole }: Props) => {
  const [updateRole] = useUpdateRoleMutation();
  const currentUserId = useAppSelector((state) => state.login.user.id);

  const newRoleState = useCustomSelect({
    defaultValue: roleData.find((item) => item.value === user.roleName),
    options: roleData,
    id: `user-role-select-${user.id}`,
  });

  const handleConfirmChangeRole = async () => {
    const newData = {
      role: newRoleState.getSelectValue(),
      userId: user.id,
    };
    // send a request to change user role
    await updateRole(newData);
  };

  return (
    <div>
      {currentUserRole === UserRoleNames.Admin && currentUserId !== user.id ? (
        <SRoleBody>
          <div>
            <CustomSelect {...newRoleState} hasMessage={false} />
          </div>

          <SConfirmRoleChange hasRoleChanged={!newRoleState.hasChanged}>
            <Button
              type="button"
              buttonType={ButtonType.SOLID}
              onClick={handleConfirmChangeRole}
            >
              Confirm
            </Button>
          </SConfirmRoleChange>
        </SRoleBody>
      ) : (
        <p>{user.roleName}</p>
      )}
    </div>
  );
};

export default ChangeRoleSelect;
