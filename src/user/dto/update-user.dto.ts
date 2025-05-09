import { Role } from "@src/auth/decorators/role.enum"

export class UpdateUserDto {
    name?: string
    username?: string
    role?: Role[]
}