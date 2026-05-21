export interface DepartmentsColumns {
    department_id: number;
    department_name: string;
    department_description: string;
    status: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface DepartmentFieldErrors {
    department_name?: string[];
}