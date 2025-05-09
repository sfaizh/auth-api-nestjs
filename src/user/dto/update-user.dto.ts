import { Role } from "@src/auth/decorators/role.enum"

export class UpdateUserDto {
    name?: string
    username?: string
    password?: string
    email?: string
    roles?: Role[]
    refreshToken?: string | null
}