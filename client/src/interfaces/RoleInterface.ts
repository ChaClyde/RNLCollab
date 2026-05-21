export interface RoleColumns {
    role_id: number;
    role_name: string;
    role_description: string;
    status: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface RoleFieldErrors {
    role_name?: string[];
}