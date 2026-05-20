import type { DepartmentsColumns } from "./DepartmentColumns";
import type { RoleColumns } from "./RoleColumns";

export interface UserColumns {
    user_id: number;
    first_name: string;
    middle_name?: string;
    last_name: string;
    suffix_name?: string;
    role: RoleColumns
    department: DepartmentsColumns
    status: string;
    email: string;
    username: string;
    password: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}