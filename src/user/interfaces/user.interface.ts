import { Role } from "@src/auth/decorators/role.enum"

export interface User {
    userId: number
    username: string
    password: string
    name: string
    email: string
    roles: Role[]
}