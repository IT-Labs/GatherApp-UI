// components
import { RoleFilterValueType } from "constants/selectOptions";
import AdminPanelCardTableRow from "./AdminPanelCardTableRow";

// styles
import {
  STable,
  STableHeaderRow,
  STableHeaderData,
  STableContainer,
} from "./styles";

type Props = {
  searchInputValue: string;
  role: RoleFilterValueType;
  currentUserRole: string;
};

const AdminPanelCardBody = ({
  searchInputValue,
  role,
  currentUserRole,
}: Props) => {
  const headers = ["", "Name", "Email", "Country", "Role"];

  return (
    <STableContainer>
      <STable>
        <thead>
          <STableHeaderRow>
            {headers.map((header) => (
              <STableHeaderData key={header}>{header}</STableHeaderData>
            ))}
          </STableHeaderRow>
        </thead>
        <tbody>
          <AdminPanelCardTableRow
            searchInputValue={searchInputValue}
            role={role}
            currentUserRole={currentUserRole}
            headers={headers}
          />
        </tbody>
      </STable>
    </STableContainer>
  );
};

export default AdminPanelCardBody;
